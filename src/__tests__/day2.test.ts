import { Day2 } from '../day2';

test('FormatCMD works', () => {
  const ej: Day2 = new Day2();
  const response = ej.formatCmd('down 2');
  const order = 'down';
  const value = 2;
  const expected: { order: string; value: number } = { order, value };
  expect(response).toStrictEqual(expected);
});

test('Is Reading all the inputs', () => {
  const ej2: Day2 = new Day2();
  ej2.readOrders('../inputs/day2Input');
  expect(ej2.cmds.length).toBe(1000);
});

test('HandleCommand works', () => {
  const ej2: Day2 = new Day2();
  const cmd1 = { order: 'down', value: 2 };
  const cmd2 = { order: 'up', value: 8 };
  const cmd3 = { order: 'forward', value: 10 };
  ej2.handleCommand(cmd1);
  expect(ej2.depth).toBe(2);
  ej2.handleCommand(cmd2);
  expect(ej2.depth).toBe(-6);
  ej2.handleCommand(cmd3);
  expect(ej2.horizontalPos).toBe(10);
});
