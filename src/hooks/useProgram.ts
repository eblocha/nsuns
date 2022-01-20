import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Program, setProgram, getProgram, Keys } from '../api'

const useProgram = (profile: string) => {
  return useQuery([Keys.PROGRAM, profile], async () => await getProgram(profile), {
    staleTime: Infinity,
  })
}

export const useSetProgram = (profile: string) => {
  const queryClient = useQueryClient()
  return useMutation(async (program: Program) => await setProgram(profile, program), {
    onSuccess: data => {
      queryClient.setQueryData([Keys.PROGRAM, profile], data)
    },
  })
}

export default useProgram
