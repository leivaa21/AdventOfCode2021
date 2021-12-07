import { crabArmy } from '../day7';

test('loading good from input', () => {
  const example: crabArmy = new crabArmy('../inputs/mockedDay7');
  expect(example.crabPositions.length).toBe(10);
});

test('algorithm working good', () => {
  const example: crabArmy = new crabArmy('../inputs/mockedDay7');
  const response = example.getBestWayWithLinearFuel();
  expect(response.fuel).toBe(37);
});

test('fuel Consumition', () => {
  const example: crabArmy = new crabArmy('../inputs/mockedDay7');
  expect(example.calcFuelConsumition(5, 5)).toBe(0);
  expect(example.calcFuelConsumition(16, 5)).toBe(66);
  expect(example.calcFuelConsumition(5, 16)).toBe(66);
});

test('algorithm working good', () => {
  const example: crabArmy = new crabArmy('../inputs/mockedDay7');
  const response = example.getBestWay();
  expect(response.fuel).toBe(168);
});
