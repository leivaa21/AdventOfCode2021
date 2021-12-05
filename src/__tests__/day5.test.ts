import { Line, Panel, Position } from '../day5';

test('Initializing Panel working good', () => {
  const exampleSize = 5;
  const example: Panel = new Panel(exampleSize);
  expect(example.panel.length).toBe(exampleSize * exampleSize);
  expect(example.panel[0].x).toBe(0);
  expect(example.panel[0].y).toBe(0);
  expect(example.panel[example.panel.length - 1].x).toBe(4);
  expect(example.panel[example.panel.length - 1].y).toBe(4);
  expect(example.panel[5].x).toBe(1);
  expect(example.panel[5].y).toBe(0);
});

test('Reading Lines from Input', () => {
  const example: Panel = new Panel(5);
  example.readLinesFromInput('../inputs/mockedDay5');
  expect(example.ventsLines.length).toBe(5);
  expect(example.ventsLines[example.ventsLines.length - 1].y1).toBe(0);
  expect(example.ventsLines[example.ventsLines.length - 1].x2).toBe(4);
});

test('get all positions of the line', () => {
  const LineInputDiagonal = '0,0 -> 3,3';
  const exampleDiagonal: Line = new Line(LineInputDiagonal);
  const expectedsDiagonal: Array<Position> = [
    new Position(0, 0),
    new Position(1, 1),
    new Position(2, 2),
    new Position(3, 3),
  ];
  expect(exampleDiagonal.allPositions()).toStrictEqual(expectedsDiagonal);

  const LineInput2 = '0,0 -> 3,6';
  const example2: Line = new Line(LineInput2);
  const expecteds2: Array<Position> = [new Position(0, 0), new Position(1, 2), new Position(2, 4), new Position(3, 6)];
  expect(example2.allPositions()).toStrictEqual(expecteds2);

  const LineInput3 = '0,0 -> 2,5';
  const example3: Line = new Line(LineInput3);
  const expecteds3: Array<Position> = [new Position(0, 0), new Position(1, 2), new Position(2, 5)];
  expect(example3.allPositions()).toStrictEqual(expecteds3);
});
