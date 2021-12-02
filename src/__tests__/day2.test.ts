import { PartI, PartII } from '../day2';

test('FormatCMD works', () => {
  const ej: PartI = new PartI();
  const response = ej.formatCmd('down 2');
  const expected: { order: string; value: number } = {
    order: 'down',
    value: 2,
  };
  expect(response).toStrictEqual(expected);
});

test('Is Reading all the inputs', () => {
  const ej2: PartI = new PartI();
  ej2.readOrders('../inputs/day2Input');
  expect(ej2.cmds.length).toBe(1000);
});

test('HandleCommand works', () => {
  const ej2: PartI = new PartI();
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

test('Part II HandleCommand works', () => {
  const ej2: PartII = new PartII();
  const cmd1 = { order: 'down', value: 2 };
  const cmd2 = { order: 'up', value: 8 };
  const cmd3 = { order: 'forward', value: 10 };
  ej2.handleCommand(cmd1);
  expect(ej2.depth).toBe(0);
  expect(ej2.aim).toBe(2);
  ej2.handleCommand(cmd2);
  expect(ej2.aim).toBe(2 - 8);
  expect(ej2.depth).toBe(0);
  ej2.handleCommand(cmd3);
  expect(ej2.horizontalPos).toBe(10);
  expect(ej2.depth).toBe(10 * (2 - 8));
  ej2.handleCommand(cmd3);
  expect(ej2.horizontalPos).toBe(10 + 10);
  expect(ej2.depth).toBe(10 * (2 - 8) * 2);
});
