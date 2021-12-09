import { SmokeBasin } from '../day9';

test('loading', () => {
  const example: SmokeBasin = new SmokeBasin('../inputs/mockedDay9');
  expect(example.x_length).toBe(10);
  expect(example.y_length).toBe(5);
});

test('isLowPoint', () => {
  const example: SmokeBasin = new SmokeBasin('../inputs/mockedDay9');
  expect(example.isLowPoint(0, 9)).toBe(true);
  expect(example.isLowPoint(2, 2)).toBe(true);
  expect(example.isLowPoint(1, 6)).toBe(false);
});
test('RiskValue', () => {
  const example: SmokeBasin = new SmokeBasin('../inputs/mockedDay9');
  expect(example.getRiskPoints()).toBe(15);
});

test('getNumberOfLowerPoints', () => {
  const example: SmokeBasin = new SmokeBasin('../inputs/mockedDay9');
  example.getRiskPoints();
  expect(example.lowerPoints.length).toBe(4);
});

test('getFullBasin', () => {
  const example: SmokeBasin = new SmokeBasin('../inputs/mockedDay9');
  example.getRiskPoints();
  expect(example.getFullBasin({ y: 0, x: 1 }).length).toBe(3);
  expect(example.getFullBasin({ y: 0, x: 9 }).length).toBe(9);
  expect(example.getFullBasin({ y: 4, x: 6 }).length).toBe(9);
  expect(example.getFullBasin({ y: 2, x: 2 }).length).toBe(14);
});

test(' Second puzzle ', () => {
  const example: SmokeBasin = new SmokeBasin('../inputs/mockedDay9');
  example.getRiskPoints();
  expect(example.get2Puzzle()).toBe(1134);
});
