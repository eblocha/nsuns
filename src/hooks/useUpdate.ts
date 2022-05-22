import { useCallback } from 'react';
import { Maxes, Reps } from '../api';
import { Store, useStore } from '../stores';
import { calculateUpdate } from '../utils/maxes';
import useMaxes, { useAddMaxes } from './useMaxes';
import useProfile from './useProfile';
import useReps, { useAddReps } from './useReps';
import useUnits from './useUnits';

const selectAddMessage = (state: Store) => state.addMessage;

export const useUpdate = () => {
  const [profile] = useProfile();
  const { data: maxes } = useMaxes(profile);
  const { data: reps } = useReps(profile);
  const { mutate: addReps } = useAddReps(profile);
  const { mutate: addMaxes } = useAddMaxes(profile);
  const [units] = useUnits();

  const addMessage = useStore(selectAddMessage);

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

      addMaxes(nextMaxes, {
        onError: (error) => {
          addMessage({
            level: 'error',
            message: 'Failed to update maxes',
            timeout: 5000,
          });
          console.error(error);
        },
      });
      addReps(nextReps, {
        onError: (error) => {
          addMessage({
            level: 'error',
            message: 'Failed to update reps',
            timeout: 5000,
          });
          console.error(error);
        },
      });
    }
  }, [addMaxes, addMessage, addReps, maxes, reps, units]);

  return update;
};
