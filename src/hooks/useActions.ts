import { Maxes, Reps } from '../api'
import useStore, { GoToInput } from '../stores'
import { calculateUpdate } from '../utils/maxes'
import useMaxes, { useAddMaxes, useDeleteMaxes, useUpdateMaxes } from './useMaxes'
import useProgram from './useProgram'
import useReps, { useAddReps, useDeleteReps, useUpdateReps } from './useReps'
import useUnits from './useUnits'

// Command Parameters ---------------------------------------------------------
export type LogRepsInput = {
  type: string
  reps: string
}

export type ChangeMaxInput = {
  type: string
  weight: string
  direction: string
}

const useActions = (profile: string) => {
  const nextSet = useStore(state => state.nextSet)
  const goTo = useStore(state => state.goTo)
  const startWorkout = useStore(state => state.startWorkout)
  const toggleStats = useStore(state => state.toggleStats)

  const [units] = useUnits()

  const { data: reps, isSuccess: isRepsSuccess } = useReps(profile)
  const updateReps = useUpdateReps(profile)
  const addReps = useAddReps(profile)
  const deleteReps = useDeleteReps(profile)
  const repsUsable = isRepsSuccess && reps

  const { data: maxes, isSuccess: isMaxesSuccess } = useMaxes(profile)
  const updateMaxes = useUpdateMaxes(profile)
  const addMaxes = useAddMaxes(profile)
  const deleteMaxes = useDeleteMaxes(profile)
  const maxesUsable = isMaxesSuccess && maxes

  const { data: program, isSuccess: isProgramSuccess } = useProgram(profile)
  const programUsable = isProgramSuccess && program

  const intents: Record<string, (slots: any) => void> = {
    nextSet: () => {
      if (programUsable) {
        nextSet(program)
      }
    },
    logReps: (props: LogRepsInput) => {
      // Update the current reps
      if (repsUsable) {
        const newReps: Reps = {
          ...reps[reps.length - 1],
          [props.type]: parseInt(props.reps),
        }
        updateReps.mutate(newReps)
      }
    },
    updateWeights: () => {
      // Add new weights and reps entries
      if (repsUsable && maxesUsable) {
        const nextMaxes: Maxes = {}
        const nextReps: Reps = {}

        const currMaxes = maxes[maxes.length - 1] || {}
        const currReps = reps[reps.length - 1] || {}

        for (const lift in currMaxes) {
          nextMaxes[lift] = currMaxes[lift] + calculateUpdate(currReps[lift] || null, units)
        }

        for (const lift in currReps) {
          nextReps[lift] = null
        }

        addMaxes.mutate(nextMaxes)
        addReps.mutate(nextReps)
      }
    },
    undoUpdate: () => {
      // Delete weights and reps entries
      if (repsUsable && maxesUsable) {
        deleteMaxes.mutate()
        deleteReps.mutate()
      }
    },
    resetReps: () => {
      // Reset rep counters to null
      if (repsUsable) {
        const newReps: Reps = {}
        for (const lift in reps[reps.length - 1] || {}) {
          newReps[lift] = null
        }
        updateReps.mutate(newReps)
      }
    },
    goTo: (props: GoToInput) => {
      // Go to the start of a lift, or a set within the current lift
      if (programUsable) {
        goTo(program, props)
      }
    },
    startWorkout: () => {
      // Go to the first set of the first lift, reset day to today
      if (programUsable) {
        startWorkout(program)
      }
    },
    exitWorkout: () => {
      // Same as start workout
      if (programUsable) {
        startWorkout(program)
      }
    },
    status: toggleStats,
    changeMax: (props: ChangeMaxInput) => {
      // Update a max to a specific value
      if (maxesUsable) {
        const current = maxes[maxes.length - 1] || {}
        const currentWeight = current[props.type]

        if (currentWeight !== undefined) {
          const change = parseInt(props.weight)
          const newMaxes: Maxes = {
            ...current,
            [props.type]: props.direction === 'increase' ? currentWeight + change : currentWeight - change,
          }
          updateMaxes.mutate(newMaxes)
        }
      }
    },
  }

  return intents
}

export default useActions
