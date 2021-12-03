import { applyFilter, arraySplitter, getCOFilter, getOxFilter, readAllInput } from '../day3';

test('gettingOxFilter', () => {
  expect(getOxFilter([1, 0, 1, 1], 1)).toStrictEqual({
    bitCriteria: 1,
    bitPos: 1,
  });
  expect(getOxFilter([1, 0, 0, 1], 1)).toStrictEqual({
    bitCriteria: 1,
    bitPos: 1,
  });
  expect(getOxFilter([0, 0, 0, 1], 1)).toStrictEqual({
    bitCriteria: 0,
    bitPos: 1,
  });
});

test('gettingCOFilter', () => {
  expect(getCOFilter([1, 0, 1, 1], 1)).toStrictEqual({
    bitCriteria: 0,
    bitPos: 1,
  });
  expect(getCOFilter([1, 0, 0, 1], 1)).toStrictEqual({
    bitCriteria: 0,
    bitPos: 1,
  });
  expect(getCOFilter([1, 0, 0, 0], 1)).toStrictEqual({
    bitCriteria: 1,
    bitPos: 1,
  });
});

test('ApplyFilter HellFunction', () => {
  const input: Array<string> = readAllInput('../inputs/day3Input');

  let SplittedArray: Array<Array<number>> = arraySplitter(input);

  for (let it = 0; it < SplittedArray.length && SplittedArray[0].length > 1; it++) {
    const filter: { bitCriteria: number; bitPos: number } = getOxFilter(SplittedArray[it], it);
    SplittedArray = applyFilter(SplittedArray, filter);
  }

  const randIt: number = Math.floor(Math.random() * SplittedArray.length);

  expect(SplittedArray[randIt].length).toBe(1);
});
