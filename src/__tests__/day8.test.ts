import { Display, Entry } from '../day8';

test('Entry Constructor', () => {
  const input = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
  const expectedSignal = ['acedgfb', 'cdfbe', 'gcdfa', 'fbcad', 'dab', 'cefabd', 'cdfgeb', 'eafb', 'cagedb', 'ab'];
  const expectedOutput = ['cdfeb', 'fcadb', 'cdfeb', 'cdbaf'];
  const entry: Entry = new Entry(input);
  expect(entry.signal_patterns).toStrictEqual(expectedSignal);
  expect(entry.digit_output).toStrictEqual(expectedOutput);
});

test('Display Loader', () => {
  const display: Display = new Display('../inputs/mockedDay8');
  expect(display.entry_array.length).toBe(10);
});

test('SpecifiedNumberOfSegments', () => {
  const display: Display = new Display('../inputs/mockedDay8');
  expect(display.searchForSpecifiedNumberOfSegments(2)).toBe(8);
});

test('EntryDecoder', () => {
  const input = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
  const entry: Entry = new Entry(input);
  const expectedDecode = ['cagedb', 'ab', 'gcdfa', 'fbcad', 'eafb', 'cdfbe', 'cdfgeb', 'dab', 'acedgfb', 'cefabd'];
  expect(entry.decoded_signals).toStrictEqual(expectedDecode);
});

test('Entry number output getter', () => {
  const input = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
  const entry: Entry = new Entry(input);
  const expectedOutputNumber = 5353;
  expect(entry.getOututToNumber()).toBe(expectedOutputNumber);

  const input2 = 'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc';
  const entry2: Entry = new Entry(input2);
  const expectedOutputNumber2 = 9781;
  expect(entry2.getOututToNumber()).toBe(expectedOutputNumber2);
});

test('get Sum of outputs works', () => {
  const display: Display = new Display('../inputs/mockedDay8');
  expect(display.getSumOutputs()).toBe(61229);
});
