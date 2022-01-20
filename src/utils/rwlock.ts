import { Mutex, MutexInterface } from 'async-mutex';

type Func<T> = () => T | Promise<T>;

/** Forces a function to pause and move itself to the back of the event loop */
const asyncNOP = async () => new Promise<void>((resolve) => resolve());

/**
 * Single threaded write-preferring read write lock
 * See: https://gist.github.com/CMCDragonkai/4de5c1526fc58dac259e321db8cf5331
 */
export class RWLock {
  protected readersLock: Mutex = new Mutex();
  protected writersLock: Mutex = new Mutex();
  protected readersRelease: MutexInterface.Releaser = () => {};
  protected readerCountBlocked: number = 0;
  protected _readerCount: number = 0;
  protected _writerCount: number = 0;

  public get readerCount(): number {
    return this._readerCount + this.readerCountBlocked;
  }

  public get writerCount(): number {
    return this._writerCount;
  }

  public async withRead<T>(f: Func<T>): Promise<T> {
    const release = await this.acquireRead();
    try {
      return await f();
    } finally {
      release();
    }
  }

  public async withWrite<T>(f: Func<T>): Promise<T> {
    const release = await this.acquireWrite();
    try {
      return await f();
    } finally {
      release();
    }
  }

  public async acquireRead(): Promise<() => void> {
    if (this._writerCount > 0) {
      ++this.readerCountBlocked;
      const writerCount = this._writerCount;
      // Wait for every writer that came before us to unlock, not just the first
      for (let i = 0; i < writerCount; i++) {
        await this.writersLock.waitForUnlock();
      }
      --this.readerCountBlocked;
    }
    const readerCount = ++this._readerCount;
    // The first reader locks
    if (readerCount === 1) {
      this.readersRelease = await this.readersLock.acquire();
    } else {
      // To ensure we use the same number of event loop ticks
      // whether we need to acquire the lock or not
      await asyncNOP();
    }
    return () => {
      const readerCount = --this._readerCount;
      // The last reader unlocks
      if (readerCount === 0) {
        this.readersRelease();
      }
    };
  }

  public async acquireWrite(): Promise<() => void> {
    ++this._writerCount;
    const writersRelease = await this.writersLock.acquire();

    if (this._readerCount) {
      await this.readersLock.waitForUnlock();
    }

    return () => {
      writersRelease();
      --this._writerCount;
    };
  }

  public isLocked(): boolean {
    return this.readersLock.isLocked() || this.writersLock.isLocked();
  }

  public async waitForUnlock(): Promise<void> {
    const waitForWriters = async () => {
      const writerCount = this._writerCount;
      for (let i = 0; i < writerCount; i++) {
        await this.writersLock.waitForUnlock();
      }
    };

    await Promise.all([this.readersLock.waitForUnlock(), waitForWriters()]);
    return;
  }
}

/**
 * A keyed read-write lock intended to lock files and directories
 */
export class FileLock {
  protected locks: Record<string, RWLock> = {};
  resolver: (key: string) => string;

  constructor(resolver?: (key: string) => string) {
    this.resolver = resolver || ((key) => key);
  }

  private cleanup(key: string) {
    if (key in this.locks) {
      const readers = this.locks[key].readerCount;
      const writers = this.locks[key].writerCount;
      if (readers === 0 && writers === 0) {
        delete this.locks[key];
      }
    }
  }

  private getOrCreateLock(key: string) {
    let lock;
    if (key in this.locks) {
      lock = this.locks[key];
    } else {
      const newLock = new RWLock();
      this.locks[key] = newLock;
      lock = newLock;
    }
    return lock;
  }

  public async withShareable<T>(key: string, f: Func<T>): Promise<T> {
    const release = await this.shareable(this.resolver(key));
    try {
      return await f();
    } finally {
      release();
    }
  }

  public async withExclusive<T>(key: string, f: Func<T>): Promise<T> {
    const release = await this.exclusive(this.resolver(key));
    try {
      return await f();
    } finally {
      release();
    }
  }

  public async shareable(key: string): Promise<() => void> {
    const resolved = this.resolver(key);
    const lock = this.getOrCreateLock(resolved);
    const release = await lock.acquireRead();
    return () => {
      release();
      this.cleanup(resolved);
    };
  }

  public async exclusive(key: string): Promise<() => void> {
    const resolved = this.resolver(key);
    const lock = this.getOrCreateLock(resolved);
    const release = await lock.acquireWrite();
    return () => {
      release();
      this.cleanup(resolved);
    };
  }

  public isLocked(key: string): boolean {
    return this.locks[this.resolver(key)]?.isLocked() || false;
  }

  public async waitForUnlock(key: string): Promise<void> {
    const resolved = this.resolver(key);
    if (resolved in this.locks) {
      return await this.locks[resolved].waitForUnlock();
    }
  }
}

/**
 * Execute an async function with permissions
 * @param permssions An array of promises that will resolve to release functions to release permissions
 * @param f The function to execute with permissions
 * @returns The return value of f
 */
export const withPermissions = async <T>(
  permssions: Promise<MutexInterface.Releaser>[],
  f: Func<T>
): Promise<T> => {
  const releasers = await Promise.all(permssions);
  try {
    return await f();
  } finally {
    releasers.forEach((release) => release());
  }
};
