import { capitalize } from './string';

type Case = {
  input: string;
  expected: string;
};

const cases: Case[] = [
  {
    input: 'abc',
    expected: 'Abc',
  },
  {
    input: '123',
    expected: '123',
  },
  {
    input: 'ABC',
    expected: 'ABC',
  },
];

it.each(cases)(
  'capitalizes correctly: $input -> $expected',
  ({ input, expected }) => {
    expect(capitalize(input)).toBe(expected);
  }
);
