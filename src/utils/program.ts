import {
  CustomLift,
  CustomLiftSet,
  LiftTypes,
  MainLift,
  MainLiftSet,
  Maxes,
  Program,
  Units,
  DataWithHistory,
} from '../api';
import { getDayString } from './days';
import { roundWeight } from './weight';
import { capitalize } from './string';

export const currentDay = (program: Program, day: number) => {
  const dayString = getDayString(day);
  if (dayString in program) {
    return program[dayString] || null;
  } else return null;
};

export const currentLift = (program: Program, day: number, lift: number) => {
  const lifts = currentDay(program, day);
  if (!lifts) return null;
  return lifts[lift] || null;
};

export const currentSet = (
  program: Program,
  day: number,
  lift: number,
  set: number
) => {
  const current = currentLift(program, day, lift);
  if (!current || !current.sets) return null;

  return current.sets[set] || null;
};

/** check if a set index can roll over to the next lift, and return the new [lift, set] indices */
export const rolloverSet = (
  program: Program,
  day: number,
  lift: number,
  set: number
): [number, number] => {
  const lifts = currentDay(program, day);
  if (!lifts) return [lift, set];

  for (let i = lift; i < lifts.length; i++) {
    const len = lifts[i].sets?.length ?? 0;
    if (set >= len) {
      set -= len;
      lift++;
    } else {
      return [lift, set];
    }
  }

  return [lift, set];
};

/**
 * Creates a string to represent the rep count in a set component
 * @param reps The reps property to display
 * @returns A string to display the rep count to the user
 */
const representReps = (reps?: string | number) => {
  if (reps === undefined) return '';
  return `${reps} rep${reps === 1 ? '' : 's'}`;
};

export const displaySet = (set: CustomLiftSet) => {
  return (
    (set.weight !== undefined
      ? `${set.weight}${set.reps !== undefined ? ' for ' : ''}`
      : '') + representReps(set.reps)
  );
};

export const convertSet = (
  set: MainLiftSet,
  units: Units,
  max?: number
): CustomLiftSet => {
  return {
    id: set.id,
    reps: set.reps,
    weight:
      max !== undefined
        ? roundWeight(set.percentage * max, units)
        : `${set.percentage * 100}% of max`,
  };
};

export const convertSets = (
  lift: MainLift,
  maxes: Maxes,
  units: Units
): CustomLift => {
  const max = maxes[lift.base];

  return {
    id: lift.id,
    name: lift.name,
    type: LiftTypes.CUSTOM,
    sets: lift.sets.map((set) => {
      return convertSet(set, units, max);
    }),
  };
};

const fullName = (
  lift: MainLift | CustomLift,
  set: CustomLiftSet,
  includeName = true
) => {
  return (includeName ? `${lift.name} ` : '') + displaySet(set);
};

/**
 * displayArbitrarySet will convert a set index to a string for display
 * It will roll over the lift/set index if needed
 */
export const displayArbitrarySet = ({
  program,
  maxes,
  day,
  lift,
  set,
  units,
  includeName = true,
}: {
  /** The user's program */
  program: Program;
  /** The latest maxes */
  maxes: Maxes;
  /** index of the current day */
  day: number;
  /** current lift index */
  lift: number;
  /** current set index */
  set: number;
  /** which units the user has selected */
  units: Units;
  /** include the name of the lift in the string */
  includeName?: boolean;
}) => {
  [lift, set] = rolloverSet(program, day, lift, set);
  const currLift = currentLift(program, day, lift);

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

      const max = maxes[currLift.base];

      const setForDisplay: CustomLiftSet = convertSet(currSet, units, max);
      return fullName(currLift, setForDisplay, includeName);
    }
  }
};

export const flattenHistory = (
  program: Program,
  history: Record<string, number | null>[]
): DataWithHistory[] => {
  const data: Record<string, DataWithHistory> = {};

  for (const day of Object.values(program)) {
    for (const lift of day) {
      if (lift.type === LiftTypes.MAIN && !(lift.base in data)) {
        data[lift.base] = {
          title: capitalize(lift.base),
          value: '',
          id: lift.base,
          history: [],
        };
      }
    }
  }

  for (const checkpoint of history) {
    for (const [key, value] of Object.entries(data)) {
      const val = checkpoint[key];
      if (val !== undefined) {
        value.history?.push(val ?? 0);
      }
    }
  }

  if (history.length) {
    const lastValue = history[history.length - 1];
    for (const [key, value] of Object.entries(lastValue)) {
      if (key in data) {
        data[key].value = value ?? '';
      }
    }
  }

  return Object.values(data);
};
