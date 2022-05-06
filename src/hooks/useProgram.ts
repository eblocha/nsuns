import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Program, setProgram, getProgram, Keys } from '../api';

const useProgram = (profile: string) => {
  return useQuery(
    [profile, Keys.PROGRAM],
    async () => await getProgram(profile),
    {
      staleTime: Infinity,
    }
  );
};

export const useSetProgram = (profile: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (program: Program) => await setProgram(profile, program),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([profile, Keys.PROGRAM], data);
      },
    }
  );
};

export default useProgram;
