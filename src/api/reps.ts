import { createApi, lock } from './client';
import { Reps, Keys } from './types';

/** Get the list of all reps history for `profile` */
export const getReps = async (profile: string) => {
  const api = createApi(profile);
  return await lock.withShareable<Reps[]>(Keys.REPS, async () => {
    return (await api.getItem(Keys.REPS)) || [];
  });
};

export const setReps = async (profile: string, reps: Reps[]) => {
  const api = createApi(profile);
  await lock.withExclusive(Keys.REPS, async () => {
    await api.setItem(Keys.REPS, reps);
  });
};

/** Add a new reps entry to `profile` */
export const addReps = async (profile: string, reps: Reps) => {
  const api = createApi(profile);
  return await lock.withExclusive(Keys.REPS, async () => {
    const current = (await api.getItem<Reps[]>(Keys.REPS)) || [];
    current.push(reps);
    await api.setItem(Keys.REPS, current);
    return current;
  });
};

/** Update the latest reps entry for `profile` */
export const updateReps = async (profile: string, reps: Reps) => {
  const api = createApi(profile);
  return await lock.withExclusive(Keys.REPS, async () => {
    const current = (await api.getItem<Reps[]>(Keys.REPS)) || [];
    if (!current.length) return current;

    current[current.length - 1] = reps;
    await api.setItem(Keys.REPS, current);
    return current;
  });
};

/** Delete the last reps entry for `profile` */
export const deleteReps = async (profile: string) => {
  const api = createApi(profile);
  return await lock.withExclusive(Keys.REPS, async () => {
    const current = (await api.getItem<Reps[]>(Keys.REPS)) || [];
    if (!current.length) return current;

    current.pop();
    await api.setItem(Keys.REPS, current);
    return current;
  });
};
