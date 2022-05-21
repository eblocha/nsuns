import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Keys,
  getMaxes,
  addMaxes,
  deleteMaxes,
  updateMaxes,
  setMaxes,
  Maxes,
} from '../api';

/** State */
const useMaxes = (profile: string) => {
  return useQuery([profile, Keys.MAXES], async () => getMaxes(profile), {
    staleTime: Infinity,
  });
};

/** Actions */
export const useAddMaxes = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (maxes: Maxes) => {
      return await addMaxes(profile, maxes);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.MAXES], newMaxes);
      },
    }
  );
};

export const useUpdateMaxes = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ maxes, replace = false }: { maxes: Maxes; replace?: boolean }) => {
      return await updateMaxes(profile, maxes, replace);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.MAXES], newMaxes);
      },
    }
  );
};

export const useDeleteMaxes = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      return await deleteMaxes(profile);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.MAXES], newMaxes);
      },
    }
  );
};

export const useSetMaxes = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (maxes: Maxes[]) => {
      return await setMaxes(profile, maxes);
    },
    {
      onSuccess: (newMaxes) => {
        queryClient.setQueryData([profile, Keys.MAXES], newMaxes);
      },
    }
  );
};

export default useMaxes;
