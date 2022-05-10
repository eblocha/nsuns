import { getBestDay } from './days';

it('gets today as the best day with options in order', () => {
  // Monday
  jest.useFakeTimers().setSystemTime(new Date('2022-05-10'));
  const best = getBestDay(['sunday', 'monday', 'tuesday']);
  expect(best).toBe(1);
});

it('gets today as the best day with options out of order', () => {
  // Monday
  jest.useFakeTimers().setSystemTime(new Date('2022-05-10'));
  const best = getBestDay(['monday', 'sunday', 'tuesday']);
  expect(best).toBe(1);
});
