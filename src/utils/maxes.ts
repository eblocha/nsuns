import { DataWithHistory, LiftTypes, Program, Units } from '../api';
import { capitalize } from './string';

export const calculateUpdate = (reps: number | null, units: Units) => {
  if (!reps || reps === 1) return 0;

  if (reps < 4) return units === Units.LB ? 5 : 2.5;

  if (reps < 6) return units === Units.LB ? 10 : 5;

  return units === Units.LB ? 15 : 7.5;
};

export const flatten = (
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
