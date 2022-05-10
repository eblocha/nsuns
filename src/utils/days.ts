import { Day } from '../api';

export const DAYS: Day[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const today = () => {
  return new Date().getDay();
};

export const getBestDay = (options: Day[]) => {
  const ideal = today();
  if (options.includes(getDayString(ideal))) {
    return ideal;
  }

  const priority = [...DAYS.slice(ideal), ...DAYS.slice(0, ideal)];

  for (let i = 0; i < priority.length; i++) {
    if (options.includes(priority[i])) {
      return DAYS.indexOf(priority[i]);
    }
  }

  return 0;
};

export const getDayString = (day: number): Day => {
  return DAYS[day] || 'monday';
};
