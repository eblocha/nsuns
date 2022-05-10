import { getBestDay } from './days';

describe('getting the best day', () => {
  const monday = new Date('2022-05-10');

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(monday);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('gets today as the best day with options in order', () => {
    expect(getBestDay(['sunday', 'monday', 'tuesday'])).toBe(1);
  });

  it('gets today as the best day with options out of order', () => {
    expect(getBestDay(['monday', 'sunday', 'tuesday'])).toBe(1);
  });

  it('gets the next day when best is unavailable', () => {
    expect(getBestDay(['sunday', 'tuesday', 'wednesday'])).toBe(2);
  });
});
