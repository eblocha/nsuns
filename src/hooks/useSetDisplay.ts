import {
  CustomLift,
  CustomLiftSet,
  LiftTypes,
  MainLift,
  Maxes,
  Program,
} from '../api';
import { currentLift, displaySet } from '../utils/program';
import { roundWeight } from '../utils/weight';
import useUnits from './useUnits';

type Args = {
  program: Program;
  maxes: Maxes;
  day: number;
  lift: number;
  set: number;
  includeName?: boolean;
};

const fullName = (
  lift: MainLift | CustomLift,
  set: CustomLiftSet,
  includeName = true
) => {
  return (includeName ? `${lift.name} ` : '') + displaySet(set);
};

const useSetDisplay = ({
  program,
  maxes,
  day,
  lift,
  set,
  includeName = true,
}: Args) => {
  const currLift = currentLift(program, day, lift);
  const [units] = useUnits();

  if (!currLift) return null;

  switch (currLift.type) {
    case LiftTypes.CUSTOM: {
      const sets = currLift.sets || [];
      const currSet = sets[set];
      if (!currSet) return null;
      return fullName(currLift, currSet, includeName);
    }
    case LiftTypes.MAIN: {
      const sets = currLift.sets || [];
      const currSet = sets[set];
      if (!currSet) return null;
      const setForDisplay: CustomLiftSet = {
        id: currSet.id,
        reps: currSet.reps,
        weight: roundWeight(
          currSet.percentage * (maxes[currLift.base] || 0),
          units
        ),
      };
      return fullName(currLift, setForDisplay, includeName);
    }
  }
};

export default useSetDisplay;
