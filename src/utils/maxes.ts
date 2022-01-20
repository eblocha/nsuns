import { Units } from '../api'

export const calculateUpdate = (reps: number | null, units: Units) => {
  if (!reps || reps === 1) return 0

  if (reps < 4) return units === Units.LB ? 5 : 2.5

  if (reps < 6) return units === Units.LB ? 10 : 5

  return units === Units.LB ? 15 : 7.5
}
