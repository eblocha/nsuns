import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Keys, getMaxes, addMaxes, deleteMaxes, updateMaxes, setMaxes, Maxes } from '../api'

/** State */
const useMaxes = (profile: string) => {
  return useQuery([Keys.MAXES, profile], async () => getMaxes(profile), {
    staleTime: Infinity,
  })
}

/** Actions */
export const useAddMaxes = (profile: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async (maxes: Maxes) => {
      return await addMaxes(profile, maxes)
    },
    {
      onSuccess: newMaxes => {
        queryClient.setQueryData([Keys.MAXES, profile], newMaxes)
      },
    }
  )
}

export const useUpdateMaxes = (profile: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async (maxes: Maxes) => {
      return await updateMaxes(profile, maxes)
    },
    {
      onSuccess: newMaxes => {
        queryClient.setQueryData([Keys.MAXES, profile], newMaxes)
      },
    }
  )
}

export const useDeleteMaxes = (profile: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async () => {
      return await deleteMaxes(profile)
    },
    {
      onSuccess: newMaxes => {
        queryClient.setQueryData([Keys.MAXES, profile], newMaxes)
      },
    }
  )
}

export const useSetMaxes = (profile: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async (maxes: Maxes[]) => {
      return await setMaxes(profile, maxes)
    },
    {
      onSuccess: newMaxes => {
        queryClient.setQueryData([Keys.MAXES, profile], newMaxes)
      },
    }
  )
}

export default useMaxes
