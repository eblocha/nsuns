import { useCallback } from 'react';
import { Maxes, Reps } from '../api';
import { calculateUpdate } from '../utils/maxes';
import useMaxes, { useAddMaxes } from './useMaxes';
import useProfile from './useProfile';
import useReps, { useAddReps } from './useReps';
import useUnits from './useUnits';

export const useUpdate = () => {
  const [profile] = useProfile();
  const { data: maxes } = useMaxes(profile);
  const { data: reps } = useReps(profile);
  const { mutate: addReps } = useAddReps(profile);
  const { mutate: addMaxes } = useAddMaxes(profile);
  const [units] = useUnits();

  const update = useCallback(() => {
    if (reps && maxes) {
      const nextMaxes: Maxes = {};
      const nextReps: Reps = {};

      const currMaxes = maxes[maxes.length - 1] || {};
      const currReps = reps[reps.length - 1] || {};

      for (const lift in currMaxes) {
        nextMaxes[lift] =
          currMaxes[lift] + calculateUpdate(currReps[lift] || null, units);
      }

      for (const lift in currReps) {
        nextReps[lift] = null;
      }

      addMaxes(nextMaxes);
      addReps(nextReps);
    }
  }, [addMaxes, addReps, maxes, reps, units]);

  return update;
};
