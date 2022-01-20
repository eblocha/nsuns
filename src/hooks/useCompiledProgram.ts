import { useMemo } from 'react'
import { CompiledProgram, CustomLift, CustomLiftSet, LiftTypes } from '../api'
import { DAYS } from '../utils/days'
import { roundWeight } from '../utils/weight'
import useMaxes from './useMaxes'
import useProgram from './useProgram'
import useUnits from './useUnits'

/**
 * Compiles the program and maxes into "custom lift" form to display it. Asyncronous.
 * @param profile The profile to use
 * @returns The program compiled into displayable form
 */
const useCompiledProgram = (profile: string) => {
  const programQuery = useProgram(profile)
  const maxesQuery = useMaxes(profile)
  const [units] = useUnits()

  const maxes = maxesQuery.data
  const program = programQuery.data

  // If either dependency is loading or errored, we can't continue
  const isError = maxesQuery.isError || programQuery.isError
  const isLoading = maxesQuery.isLoading || programQuery.isLoading

  // Both need to be successful
  const isSuccess = maxesQuery.isSuccess && programQuery.isSuccess

  const compiledProgram = useMemo(() => {
    const compiled: CompiledProgram = {}
    if (maxes && program && isSuccess) {
      for (const day of DAYS) {
        const lifts = program[day]
        if (lifts) {
          const compiledLifts: CustomLift[] = lifts.map(lift => {
            return {
              id: lift.id,
              name: lift.name,
              type: LiftTypes.CUSTOM,
              sets:
                lift.type === LiftTypes.MAIN
                  ? lift.sets.map<CustomLiftSet>(set => {
                      const lastMax = maxes[maxes.length - 1]
                      const max = lastMax ? lastMax[lift.base] : undefined
                      return {
                        id: set.id,
                        reps: set.reps,
                        weight:
                          max !== undefined
                            ? roundWeight(max * set.percentage, units)
                            : (set.percentage * 100).toString() + '% of max',
                      }
                    })
                  : lift.sets,
            }
          })
          compiled[day] = compiledLifts
        }
      }
    }

    return compiled
  }, [isSuccess, maxes, program, units])

  return { compiledProgram, isError, isLoading, isSuccess }
}

export default useCompiledProgram
