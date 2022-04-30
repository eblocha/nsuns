import { useMemo } from 'react';
import { LiftTypes } from '../api';
import { convertSets, currentDay } from '../utils/program';
import useDay from './useDay';
import useMaxes from './useMaxes';
import useProfile from './useProfile';
import useProgram from './useProgram';
import useUnits from './useUnits';

export const useCurrentLifts = () => {
  const [profile] = useProfile();
  const { data: program } = useProgram(profile);
  const { data: maxes } = useMaxes(profile);
  const [day] = useDay();
  const [units] = useUnits();

  return useMemo(() => {
    const currDay = currentDay(program || {}, day) || [];
    return currDay.map((lift) => {
      switch (lift.type) {
        case LiftTypes.MAIN:
          return convertSets(
            lift,
            maxes ? maxes[maxes.length - 1] || {} : {},
            units
          );
        default:
          return lift;
      }
    });
  }, [day, maxes, program, units]);
};
