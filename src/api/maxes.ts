import { createApi, lock } from './client';
import { Maxes, Keys } from './types';

export const createDefaultMaxes = (): Maxes => ({
  bench: 0,
  press: 0,
  squat: 0,
  deadlift: 0,
});

/** Get the list of all max history for `profile` */
export const getMaxes = async (profile: string) => {
  const api = createApi(profile);
  return await lock.withShareable<Maxes[]>(Keys.MAXES, async () => {
    return (await api.getItem(Keys.MAXES)) || [];
  });
};

/** Set the maxes to a specific value */
export const setMaxes = async (profile: string, maxes: Maxes[]) => {
  const api = createApi(profile);
  await lock.withShareable(Keys.MAXES, async () => {
    await api.setItem(Keys.MAXES, maxes);
  });
  return maxes;
};

/** Add a new max entry to `profile` */
export const addMaxes = async (profile: string, maxes: Maxes) => {
  const api = createApi(profile);
  return await lock.withExclusive(Keys.MAXES, async () => {
    const current = (await api.getItem<Maxes[]>(Keys.MAXES)) || [];
    current.push(maxes);
    await api.setItem(Keys.MAXES, current);
    return current;
  });
};

/** Update the latest max entry for `profile` */
export const updateMaxes = async (profile: string, maxes: Maxes) => {
  const api = createApi(profile);
  return await lock.withExclusive(Keys.MAXES, async () => {
    let current = (await api.getItem<Maxes[]>(Keys.MAXES)) || [];
    if (!current.length) {
      current = [maxes];
    }

    const latest = current[current.length - 1];

    current[current.length - 1] = { ...latest, ...maxes };
    await api.setItem(Keys.MAXES, current);
    return current;
  });
};

/** Delete the last max entry for `profile` */
export const deleteMaxes = async (profile: string) => {
  const api = createApi(profile);
  return await lock.withExclusive(Keys.MAXES, async () => {
    const current = (await api.getItem<Maxes[]>(Keys.MAXES)) || [];
    if (!current.length) return current;

    current.pop();
    await api.setItem(Keys.MAXES, current);
    return current;
  });
};
