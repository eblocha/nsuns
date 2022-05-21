import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Keys,
  getReps,
  addReps,
  setReps,
  updateReps,
  Reps,
  deleteReps,
} from '../api';

/** State */
const useReps = (profile: string) => {
  return useQuery([profile, Keys.REPS], async () => getReps(profile), {
    staleTime: Infinity,
  });
};

/** Actions */
export const useAddReps = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (reps: Reps) => {
      return await addReps(profile, reps);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.REPS], newMaxes);
      },
    }
  );
};

export const useUpdateReps = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ reps, replace = false }: { reps: Reps; replace?: boolean }) => {
      return await updateReps(profile, reps, replace);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.REPS], newMaxes);
      },
    }
  );
};

export const useDeleteReps = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      return await deleteReps(profile);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.REPS], newMaxes);
      },
    }
  );
};

export const useSetReps = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (reps: Reps[]) => {
      return await setReps(profile, reps);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.REPS], newMaxes);
      },
    }
  );
};

export default useReps;
