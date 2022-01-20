import { createApi } from './client'
import { User, Keys } from './types'

export const createDefaultUser = (): User => ({
  name: '',
})

export const getUser = async (profile: string): Promise<User> => {
  const api = createApi(profile)
  return (await api.getItem(Keys.USER)) || createDefaultUser()
}

export const setUser = async (profile: string, user: User) => {
  await createApi(profile).setItem(Keys.USER, user)
}
