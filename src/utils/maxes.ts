import { DataWithHistory, Units } from '../api';
import { capitalize } from './string';

export const calculateUpdate = (reps: number | null, units: Units) => {
  if (!reps || reps === 1) return 0;

  if (reps < 4) return units === Units.LB ? 5 : 2.5;

  if (reps < 6) return units === Units.LB ? 10 : 5;

  return units === Units.LB ? 15 : 7.5;
};

export const flatten = (
  history: Record<string, number | null>[]
): DataWithHistory[] => {
  const data: Record<string, DataWithHistory> = {};
  const uniques: Set<string> = new Set();

  for (const checkpoint of history) {
    for (const key in checkpoint) {
      uniques.add(key);
      data[key] = {
        title: capitalize(key),
        value: 0,
        history: [],
      };
    }
  }

  for (const checkpoint of history) {
    for (const [key, value] of Object.entries(data)) {
      const val = checkpoint[key];
      value.history?.push(val ?? 0);
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
