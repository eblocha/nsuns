import { Program, Keys, LiftTypes } from './types';
import { createApi, lock } from './client';

export const getProgram = async (profile: string) => {
  const api = createApi(profile);
  return await lock.withShareable<Program>(
    Keys.PROGRAM,
    async () =>
      (await api.getItem<Program>(Keys.PROGRAM)) || createDefaultProgram()
  );
};

export const setProgram = async (profile: string, program: Program) => {
  const api = createApi(profile);
  await lock.withExclusive(Keys.PROGRAM, async () => {
    await api.setItem(Keys.PROGRAM, program);
  });
  return program;
};

export const createDefaultProgram = (): Program => ({
  monday: [
    {
      id: '0',
      type: LiftTypes.MAIN,
      name: 'Bench',
      base: 'bench',
      sets: [
        { reps: 8, percentage: 0.65, id: '0' },
        { reps: 6, percentage: 0.75, id: '1' },
        { reps: 4, percentage: 0.85, id: '2' },
        { reps: 4, percentage: 0.85, id: '3' },
        { reps: 4, percentage: 0.85, id: '4' },
        { reps: 5, percentage: 0.8, id: '5' },
        { reps: 6, percentage: 0.75, id: '6' },
        { reps: 7, percentage: 0.7, id: '7' },
        { reps: 8, percentage: 0.65, id: '8' },
      ],
    },
    {
      id: '1',
      type: LiftTypes.MAIN,
      name: 'Overhead Press',
      base: 'press',
      sets: [
        { reps: 6, percentage: 0.5, id: '0' },
        { reps: 5, percentage: 0.6, id: '1' },
        { reps: 3, percentage: 0.7, id: '2' },
        { reps: 5, percentage: 0.7, id: '3' },
        { reps: 7, percentage: 0.7, id: '4' },
        { reps: 4, percentage: 0.7, id: '5' },
        { reps: 6, percentage: 0.7, id: '6' },
        { reps: 8, percentage: 0.7, id: '7' },
      ],
    },
    {
      id: '2',
      type: LiftTypes.CUSTOM,
      name: 'Accessories',
      description: 'Chest, Arms, Back',
    },
  ],
  tuesday: [
    {
      id: '0',
      type: LiftTypes.MAIN,
      name: 'Squat',
      base: 'squat',
      sets: [
        { reps: 5, percentage: 0.75, id: '0' },
        { reps: 3, percentage: 0.85, id: '1' },
        { reps: 1, percentage: 0.95, id: '2' },
        { reps: 3, percentage: 0.9, id: '3' },
        { reps: 3, percentage: 0.85, id: '4' },
        { reps: 3, percentage: 0.8, id: '5' },
        { reps: 5, percentage: 0.75, id: '6' },
        { reps: 5, percentage: 0.7, id: '7' },
        { reps: 5, percentage: 0.65, id: '8' },
      ],
    },
    {
      id: '1',
      type: LiftTypes.MAIN,
      name: 'Sumo Deadlift',
      base: 'deadlift',
      sets: [
        { reps: 5, percentage: 0.5, id: '0' },
        { reps: 5, percentage: 0.6, id: '1' },
        { reps: 3, percentage: 0.7, id: '2' },
        { reps: 5, percentage: 0.7, id: '3' },
        { reps: 7, percentage: 0.7, id: '4' },
        { reps: 4, percentage: 0.7, id: '5' },
        { reps: 6, percentage: 0.7, id: '6' },
        { reps: 8, percentage: 0.7, id: '7' },
      ],
    },
    {
      id: '2',
      type: LiftTypes.CUSTOM,
      name: 'Accessories',
      description: 'Legs, Abs',
    },
  ],
  wednesday: [
    {
      id: '0',
      type: LiftTypes.MAIN,
      name: 'Overhead Press',
      base: 'press',
      sets: [
        { reps: 5, percentage: 0.75, id: '0' },
        { reps: 3, percentage: 0.85, id: '1' },
        { reps: 1, percentage: 0.95, id: '2' },
        { reps: 3, percentage: 0.9, id: '3' },
        { reps: 3, percentage: 0.85, id: '4' },
        { reps: 3, percentage: 0.8, id: '5' },
        { reps: 5, percentage: 0.75, id: '6' },
        { reps: 5, percentage: 0.7, id: '7' },
        { reps: 5, percentage: 0.65, id: '8' },
      ],
    },
    {
      id: '1',
      type: LiftTypes.MAIN,
      name: 'Bench',
      base: 'bench',
      sets: [
        { reps: 6, percentage: 0.5, id: '0' },
        { reps: 5, percentage: 0.6, id: '1' },
        { reps: 3, percentage: 0.7, id: '2' },
        { reps: 5, percentage: 0.7, id: '3' },
        { reps: 7, percentage: 0.7, id: '4' },
        { reps: 4, percentage: 0.7, id: '5' },
        { reps: 6, percentage: 0.7, id: '6' },
        { reps: 8, percentage: 0.7, id: '7' },
      ],
    },
    {
      id: '2',
      type: LiftTypes.CUSTOM,
      name: 'Accessories',
      description: 'Shoulders, Chest',
    },
  ],
  thursday: [
    {
      id: '0',
      type: LiftTypes.MAIN,
      name: 'Deadlift',
      base: 'deadlift',
      sets: [
        { reps: 5, percentage: 0.75, id: '0' },
        { reps: 3, percentage: 0.85, id: '1' },
        { reps: 1, percentage: 0.95, id: '2' },
        { reps: 3, percentage: 0.9, id: '3' },
        { reps: 3, percentage: 0.85, id: '4' },
        { reps: 3, percentage: 0.8, id: '5' },
        { reps: 3, percentage: 0.75, id: '6' },
        { reps: 3, percentage: 0.7, id: '7' },
        { reps: 3, percentage: 0.65, id: '8' },
      ],
    },
    {
      id: '1',
      type: LiftTypes.MAIN,
      name: 'Squat',
      base: 'squat',
      sets: [
        { reps: 5, percentage: 0.5, id: '0' },
        { reps: 5, percentage: 0.6, id: '1' },
        { reps: 3, percentage: 0.7, id: '2' },
        { reps: 5, percentage: 0.7, id: '3' },
        { reps: 7, percentage: 0.7, id: '4' },
        { reps: 4, percentage: 0.7, id: '5' },
        { reps: 6, percentage: 0.7, id: '6' },
        { reps: 8, percentage: 0.7, id: '7' },
      ],
    },
    {
      id: '2',
      type: LiftTypes.CUSTOM,
      name: 'Accessories',
      description: 'Back, Abs',
    },
  ],
  friday: [
    {
      id: '0',
      type: LiftTypes.MAIN,
      name: 'Bench',
      base: 'bench',
      sets: [
        { reps: 5, percentage: 0.75, id: '0' },
        { reps: 3, percentage: 0.85, id: '1' },
        { reps: 1, percentage: 0.95, id: '2' },
        { reps: 3, percentage: 0.9, id: '3' },
        { reps: 5, percentage: 0.85, id: '4' },
        { reps: 3, percentage: 0.8, id: '5' },
        { reps: 5, percentage: 0.75, id: '6' },
        { reps: 3, percentage: 0.7, id: '7' },
        { reps: 5, percentage: 0.65, id: '8' },
      ],
    },
    {
      id: '1',
      type: LiftTypes.MAIN,
      name: 'Close-Grip Bench',
      base: 'bench',
      sets: [
        { reps: 6, percentage: 0.4, id: '0' },
        { reps: 5, percentage: 0.5, id: '1' },
        { reps: 3, percentage: 0.6, id: '2' },
        { reps: 5, percentage: 0.6, id: '3' },
        { reps: 7, percentage: 0.6, id: '4' },
        { reps: 4, percentage: 0.6, id: '5' },
        { reps: 6, percentage: 0.6, id: '6' },
        { reps: 8, percentage: 0.6, id: '7' },
      ],
    },
    {
      id: '2',
      type: LiftTypes.CUSTOM,
      name: 'Accessories',
      description: 'Arms, Other',
    },
  ],
});
