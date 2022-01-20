import { Unified } from './types'
import { getMaxes, setMaxes } from './maxes'
import { getProgram, setProgram } from './program'
import { getReps, setReps } from './reps'
import { getUser, setUser } from './user'

/** Export all the data for `profile` to JSON */
export const exportData = async (profile: string): Promise<Unified> => {
  const [program, maxes, reps, user] = await Promise.all([
    getProgram(profile),
    getMaxes(profile),
    getReps(profile),
    getUser(profile),
  ])
  return {
    program,
    maxes,
    reps,
    user,
  }
}

/** Set all data for `profile` to `data` */
export const importData = async (profile: string, data: Unified) => {
  await Promise.all([
    setProgram(profile, data.program),
    setMaxes(profile, data.maxes),
    setReps(profile, data.reps),
    setUser(profile, data.user),
  ])
}
