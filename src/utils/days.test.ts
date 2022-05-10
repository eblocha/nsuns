import { getBestDay } from './days';

describe('getting the best day', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('gets today as the best day with options in order', () => {
    // Monday
    jest.setSystemTime(new Date('2022-05-10'));
    const best = getBestDay(['sunday', 'monday', 'tuesday']);
    expect(best).toBe(1);
  });

  it('gets today as the best day with options out of order', () => {
    // Monday
    jest.setSystemTime(new Date('2022-05-10'));
    const best = getBestDay(['monday', 'sunday', 'tuesday']);
    expect(best).toBe(1);
  });

  it('gets the next day when best is unavailable', () => {
    // Monday
    jest.setSystemTime(new Date('2022-05-10'));
    const best = getBestDay(['sunday', 'tuesday', 'wednesday']);
    expect(best).toBe(2);
  });
});
