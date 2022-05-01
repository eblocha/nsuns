import { useCallback } from 'react';
import { useDeleteMaxes } from './useMaxes';
import useProfile from './useProfile';
import { useDeleteReps } from './useReps';

export const useUndoUpdate = () => {
  const [profile] = useProfile();

  const { mutate: deleteReps } = useDeleteReps(profile);
  const { mutate: deleteMaxes } = useDeleteMaxes(profile);

  return useCallback(() => {
    deleteMaxes();
    deleteReps();
  }, [deleteMaxes, deleteReps]);
};
