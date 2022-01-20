import { FileLock } from '../utils/rwlock';
import localforage from 'localforage';
import { QueryClient } from 'react-query';

export const createApi = (profile: string) =>
  localforage.createInstance({
    name: 'data',
    storeName: profile,
  });

export const lock = new FileLock();
export const queryClient = new QueryClient();
