import { Mutex, RWMutex, KeyedMutex } from 'composable-locks';
import localforage from 'localforage';
import { QueryClient } from 'react-query';

export const createApi = (profile: string) =>
  localforage.createInstance({
    name: 'data',
    storeName: profile,
  });

export const lock = new RWMutex(() => new KeyedMutex(() => new Mutex()));
export const queryClient = new QueryClient();
