import { RWLock, FileLock, withPermissions } from './rwlock';

describe('Base RW Lock', () => {
  enum LockTypes {
    READ = 'read',
    WRITE = 'write',
  }

  type TestCase = {
    locks: LockTypes[];
  };

  const tests: TestCase[] = [
    { locks: [LockTypes.READ, LockTypes.WRITE, LockTypes.READ] },
    { locks: [LockTypes.WRITE, LockTypes.READ] },
    { locks: [LockTypes.READ, LockTypes.WRITE] },
    {
      locks: [
        LockTypes.READ,
        LockTypes.READ,
        LockTypes.WRITE,
        LockTypes.READ,
        LockTypes.READ,
        LockTypes.WRITE,
        LockTypes.READ,
      ],
    },
    {
      locks: [
        LockTypes.READ,
        LockTypes.READ,
        LockTypes.WRITE,
        LockTypes.READ,
        LockTypes.READ,
        LockTypes.READ,
        LockTypes.READ,
        LockTypes.WRITE,
        LockTypes.READ,
        LockTypes.WRITE,
        LockTypes.WRITE,
        LockTypes.READ,
      ],
    },
  ];

  it.each(tests)('Maintains order: $locks', async ({ locks }) => {
    const lock = new RWLock();
    const data: string[] = [];

    const expected = locks.map((type, index) => type + index.toString());

    const fn = async (index: number) => data.push(expected[index]);
    await Promise.all(
      locks.map((type, index) =>
        type === LockTypes.READ
          ? lock.withRead(() => fn(index))
          : lock.withWrite(() => fn(index))
      )
    );
    expect(data).toStrictEqual(expected);
  });

  const asyncNOP = async () => new Promise<void>((resolve) => resolve());

  it('Maintains order with uneven event loop ticks', async () => {
    const lock = new RWLock();

    const data: string[] = [];

    const locks = [
      LockTypes.READ,
      LockTypes.READ,
      LockTypes.WRITE,
      LockTypes.READ,
      LockTypes.READ,
      LockTypes.WRITE,
      LockTypes.READ,
    ];

    const expected = locks.map((type, index) => type + index.toString());

    const ticks = [5, 2, 7, 10, 2, 0, 1];

    const fn = async (index: number) => {
      data.push(expected[index]);
      for (let i = 0; i < ticks[index]; i++) {
        await asyncNOP();
      }
    };

    await Promise.all(
      locks.map((type, index) =>
        type === LockTypes.READ
          ? lock.withRead(() => fn(index))
          : lock.withWrite(() => fn(index))
      )
    );
    expect(data).toStrictEqual(expected);
  });

  it('Allows concurrent readers', async () => {
    const lock = new RWLock();

    const data: string[] = [];
    await Promise.all([
      lock.withRead(async () => {
        await asyncNOP();
        data.push('data2');
      }),
      lock.withRead(() => {
        data.push('data1');
      }),
    ]);

    expect(data).toStrictEqual(['data1', 'data2']);
  });

  it('Forces syncronous writers', async () => {
    const lock = new RWLock();

    const data: string[] = [];
    await Promise.all([
      lock.withWrite(async () => {
        await asyncNOP();
        data.push('data1');
      }),
      lock.withWrite(() => {
        data.push('data2');
      }),
    ]);

    expect(data).toStrictEqual(['data1', 'data2']);
  });
});

describe('File lock', () => {
  it('Maintains order of operations', async () => {
    /**
     *           1 2 3
     * file A -> R R R
     * file B -> W   R
     */

    const locks = new FileLock();

    const permissions1 = [locks.shareable('fileA'), locks.exclusive('fileB')];
    const permissions2 = [locks.shareable('fileA')];
    const permissions3 = [locks.shareable('fileA'), locks.shareable('fileB')];

    const data: string[] = [];

    await Promise.all([
      withPermissions(permissions1, () => data.push('op1')),
      withPermissions(permissions2, () => data.push('op2')),
      withPermissions(permissions3, () => data.push('op3')),
    ]);

    expect(data).toStrictEqual(['op1', 'op2', 'op3']);
  });
});
