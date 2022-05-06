import { useMutation, useQuery, useQueryClient } from 'react-query';
import { exportData, importData, Keys, Unified } from '../api';

export const useExportData = (profile: string) => {
  return useQuery(
    [profile, Keys.EXTERNAL],
    async () => {
      return await exportData(profile);
    },
    {
      cacheTime: 0,
      staleTime: 0,
    }
  );
};

export const useImportData = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: Unified) => {
      return await importData(profile, data);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries([profile]);
      },
    }
  );
};
