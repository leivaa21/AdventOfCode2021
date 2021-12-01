import {
  getMeasures,
  howMuchAreGreater,
  isGreater,
  readAllInput,
} from '../day1';

test('Unit Test Greater Function', () => {
  expect(isGreater(1, 2)).toBe(false);
  expect(isGreater(2, 1)).toBe(true);
});
test('Is Reading all the inputs', () => {
  expect(readAllInput('../inputs/day1Input').length).toBe(2000);
});
test('howMuchAreGreater works', () => {
  const array: Array<number> = [1, 3, 4, 1, 5];
  expect(howMuchAreGreater(array)).toBe(3);
});
test('getMeasures working good', () => {
  const array: Array<number> = [1, 3, 4, 1, 5];
  const expected: Array<number> = [8, 8, 10];
  expect(getMeasures(array)).toStrictEqual(expected);
});
