import React, { useMemo } from 'react';
import { LiftTypes } from '../../api';
import useDay from '../../hooks/useDay';
import useMaxes from '../../hooks/useMaxes';
import useProfile from '../../hooks/useProfile';
import useProgram from '../../hooks/useProgram';
import useUnits from '../../hooks/useUnits';
import { getDayString } from '../../utils/days';
import { convertSets, currentDay } from '../../utils/program';
import { capitalize } from '../../utils/string';
import Day from '../Day/Day';

const CurrentDay = () => {
  const [profile] = useProfile();
  const { data: program } = useProgram(profile);
  const { data: maxes } = useMaxes(profile);
  const [day] = useDay();

  const [units] = useUnits();

  const dayString = capitalize(getDayString(day) as string);

  const lifts = useMemo(() => {
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

  return <Day lifts={lifts} title={dayString} active={true} />;
};

export default CurrentDay;
