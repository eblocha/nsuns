import { CustomLiftSet, Program } from '../api'
import { getDayString } from './days'

export const currentDay = (program: Program, day: number) => {
  const dayString = getDayString(day)
  if (dayString in program) {
    return program[dayString] || null
  } else return null
}

export const currentLift = (program: Program, day: number, lift: number) => {
  const lifts = currentDay(program, day)
  if (!lifts) return null
  return lifts[lift] || null
}

export const currentSet = (program: Program, day: number, lift: number, set: number) => {
  const current = currentLift(program, day, lift)
  if (!current || !current.sets) return null

  return current.sets[set] || null
}

/**
 * Creates a string to represent the rep count in a set component
 * @param reps The reps property to display
 * @returns A string to display the rep count to the user
 */
const representReps = (reps?: string | number) => {
  if (reps === undefined) return ''
  return `${reps} rep${reps === 1 ? '' : 's'}`
}

export const displaySet = (set: CustomLiftSet) => {
  return (
    (set.weight !== undefined ? `${set.weight}${set.reps !== undefined ? ' for ' : ''}` : '') + representReps(set.reps)
  )
}
