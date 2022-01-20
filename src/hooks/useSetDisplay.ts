import { displayArbitrarySet } from '../utils/program';
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

  return {
    data: displayArbitrarySet({
      program,
      maxes,
      day,
      lift,
      set,
      units,
      includeName,
    }),
    ...wrapReturn(metaData),
  };
};

export default useSetDisplay;
