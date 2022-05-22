import { useCallback } from 'react';
import useStore, { Store } from '../stores';
import { useDeleteMaxes } from './useMaxes';
import useProfile from './useProfile';
import { useDeleteReps } from './useReps';

const selectAddMessage = (state: Store) => state.addMessage;

export const useUndoUpdate = () => {
  const [profile] = useProfile();
  const addMessage = useStore(selectAddMessage);

  const { mutate: deleteReps } = useDeleteReps(profile);
  const { mutate: deleteMaxes } = useDeleteMaxes(profile);

  return useCallback(() => {
    deleteMaxes(undefined, {
      onError: (error) => {
        addMessage({
          level: 'error',
          message: 'Failed to undo max update',
          timeout: 5000,
        });
        console.error(error);
      },
    });
    deleteReps(undefined, {
      onError: (error) => {
        addMessage({
          level: 'error',
          message: 'Failed to undo rep update',
          timeout: 5000,
        });
        console.error(error);
      },
    });
  }, [addMessage, deleteMaxes, deleteReps]);
};
