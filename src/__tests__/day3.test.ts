import {
  readAllInput,
  parseFromBinaryToDecimal,
  mostCommon,
  arraySplitter,
  sortInArrays,
  getGRateBinary,
  uniteNumber,
  reverseBinary,
} from '../day3';

test('Is Reading all the inputs', () => {
  expect(readAllInput('../inputs/day3Input').length).toBe(1000);
});

test('Parsing from binary to decimal works', () => {
  expect(parseFromBinaryToDecimal('10111')).toBe(23);
});

test('Most Commont working well ', () => {
  expect(mostCommon([1, 0, 1, 1, 1, 0])).toBe(1);
  expect(mostCommon([1, 0, 1, 0, 0, 0])).toBe(0);
});

test('Sort works', () => {
  expect(sortInArrays([76, 4, 4], [[1], [2], [3]])).toStrictEqual([
    [1, 76],
    [2, 4],
    [3, 4],
  ]);
});

test('Splitter working fine', () => {
  expect(arraySplitter(['123', '143'])).toStrictEqual([
    [1, 1],
    [2, 4],
    [3, 3],
  ]);
});

test('uniteNumber works ', () => {
  expect(uniteNumber([1, 0, 0])).toBe(100);
});

test('Gamma Rate', () => {
  const input: Array<string> = new Array<string>();
  input.push('110');
  input.push('101');
  input.push('100');
  input.push('101');
  input.push('100');
  input.push('101');
  const expected = 101;
  expect(getGRateBinary(input)).toBe(expected);
});

test('reverseBinary', () => {
  expect(reverseBinary('11001')).toBe(parseInt('000110'));
});
