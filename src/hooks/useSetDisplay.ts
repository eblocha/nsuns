import { CustomLift, CustomLiftSet, LiftTypes, MainLift } from '../api';
import { currentLift, displaySet } from '../utils/program';
import { roundWeight } from '../utils/weight';
import useMaxes from './useMaxes';
import useProgram from './useProgram';
import useUnits from './useUnits';

type Args = {
  profile: string;
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

type WrapArgs = {
  progIsError: boolean;
  progIsLoading: boolean;
  progError: unknown;
  maxesIsError: boolean;
  maxesIsLoading: boolean;
  maxesError: unknown;
};

const wrapReturn = ({
  maxesError,
  maxesIsError,
  maxesIsLoading,
  progError,
  progIsError,
  progIsLoading,
}: WrapArgs) => {
  const error = maxesError || progError;
  const isError = maxesIsError || progIsError;
  const isLoading = maxesIsLoading || progIsLoading;

  return {
    error,
    isError,
    isLoading,
  };
};

const useSetDisplay = ({
  profile,
  day,
  lift,
  set,
  includeName = true,
}: Args): {
  data: string | null;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
} => {
  const {
    data: program,
    isError: progIsError,
    isLoading: progIsLoading,
    error: progError,
  } = useProgram(profile);

  const {
    data: maxesList,
    isError: maxesIsError,
    isLoading: maxesIsLoading,
    error: maxesError,
  } = useMaxes(profile);

  const [units] = useUnits();

  const metaData = {
    maxesError,
    maxesIsError,
    maxesIsLoading,
    progError,
    progIsError,
    progIsLoading,
  };

  if (!program || !maxesList)
    return {
      data: null,
      ...wrapReturn(metaData),
    };

  const maxes = maxesList[maxesList.length - 1] || {};

  const currLift = currentLift(program, day, lift);

  if (!currLift)
    return {
      data: null,
      ...wrapReturn(metaData),
    };

  switch (currLift.type) {
    case LiftTypes.CUSTOM: {
      const sets = currLift.sets || [];
      const currSet = sets[set];
      if (!currSet)
        return {
          data: null,
          ...wrapReturn(metaData),
        };
      return {
        data: fullName(currLift, currSet, includeName),
        ...wrapReturn(metaData),
      };
    }
    case LiftTypes.MAIN: {
      const sets = currLift.sets || [];
      const currSet = sets[set];
      if (!currSet)
        return {
          data: null,
          ...wrapReturn(metaData),
        };

      const max = maxes[currLift.base];

      const setForDisplay: CustomLiftSet = {
        id: currSet.id,
        reps: currSet.reps,
        weight:
          max !== undefined
            ? roundWeight(currSet.percentage * max, units)
            : `${currSet.percentage * 100}% of max`,
      };
      return {
        data: fullName(currLift, setForDisplay, includeName),
        ...wrapReturn(metaData),
      };
    }
  }
};

export default useSetDisplay;
