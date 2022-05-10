import { Units } from '../api';
import { calculateUpdate } from './maxes';

describe('calculating updates', () => {
  it.each([
    { units: Units.LB, reps: null, inc: 0 },
    { units: Units.LB, reps: 0, inc: 0 },
    { units: Units.LB, reps: 1, inc: 0 },
    { units: Units.LB, reps: 2, inc: 5 },
    { units: Units.LB, reps: 3, inc: 5 },
    { units: Units.LB, reps: 4, inc: 10 },
    { units: Units.LB, reps: 5, inc: 10 },
    { units: Units.LB, reps: 6, inc: 15 },
    { units: Units.LB, reps: 7, inc: 15 },
    { units: Units.KG, reps: null, inc: 0 },
    { units: Units.KG, reps: 0, inc: 0 },
    { units: Units.KG, reps: 1, inc: 0 },
    { units: Units.KG, reps: 2, inc: 2.5 },
    { units: Units.KG, reps: 3, inc: 2.5 },
    { units: Units.KG, reps: 4, inc: 5 },
    { units: Units.KG, reps: 5, inc: 5 },
    { units: Units.KG, reps: 6, inc: 7.5 },
    { units: Units.KG, reps: 7, inc: 7.5 },
  ])('units: $units reps: $reps, expect $inc', ({ inc, reps, units }) => {
    expect(calculateUpdate(reps, units)).toBe(inc);
  });
});
