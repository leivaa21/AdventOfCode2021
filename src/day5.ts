import { readFileSync } from 'fs';
import { join } from 'path';

export default function main() {
  const first: Panel = new Panel(1000);
  first.readLinesFromInput('../inputs/day5Input');
  console.log(`Day 5 - PartI = ${first.getDangerousAreasND()}`);

  const second: Panel = new Panel(1000);
  second.readLinesFromInput('../inputs/day5Input');
  console.log(`Day 5 - PartII = ${second.getDangerousAreas()}`);
}

export class Panel {
  private readonly size: number;
  public panel: Array<Position> = new Array<Position>();
  public ventsLines: Array<Line> = new Array<Line>();
  constructor(size: number) {
    this.size = size;
    this.initializePanel();
  }

  private initializePanel() {
    for (let x = 0; x < this.size; x++) {
      this.initializeYCol(x);
    }
  }
  private initializeYCol(x: number) {
    for (let y = 0; y < this.size; y++) {
      this.panel.push(new Position(x, y));
    }
  }

  public readLinesFromInput(path: string) {
    const buffer: Buffer = readFileSync(join(__dirname, path));

    const FileLines: string[] = buffer.toString().split('\n');

    FileLines.forEach((line) => {
      const formattedLine: Line = new Line(line);
      this.ventsLines.push(formattedLine);
    });
  }

  public getDangerousAreasND(): number {
    this.printLinesInPanelND();

    return this.howMuchGreaterThan2();
  }
  private printLinesInPanelND() {
    this.ventsLines.forEach((line) => {
      if (line.isDiagonal()) return;
      const positions: Array<Position> = line.allPositions();
      this.MarkPositions(positions);
    });
  }

  public getDangerousAreas(): number {
    this.printLinesInPanel();

    return this.howMuchGreaterThan2();
  }
  private printLinesInPanel() {
    this.ventsLines.forEach((line) => {
      const positions: Array<Position> = line.allPositions();
      this.MarkPositions(positions);
    });
  }
  private MarkPositions(positions: Array<Position>) {
    positions.forEach((pos) => {
      const index: number = this.findPos(pos.x, pos.y);
      if (index == -1) return;
      this.panel[index].crossedBy++;
    });
  }
  private findPos(x: number, y: number): number {
    return x * this.size + y;
  }
  private howMuchGreaterThan2(): number {
    let response = 0;
    for (let it = 0; it < this.panel.length; it++) {
      if (this.panel[it].crossedBy > 1) response++;
    }
    return response;
  }
}

export class Position {
  public readonly x: number;
  public readonly y: number;
  public crossedBy = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Line {
  public x1 = 0;
  public x2 = 0;
  public y1 = 0;
  public y2 = 0;

  constructor(input: string) {
    this.formatInput(input);
  }
  private formatInput(input: string) {
    const points: string[] = input.split(' -> ');
    const firstPos: string[] = points[0].split(',');
    const secondPos: string[] = points[1].split(',');

    this.x1 = parseInt(firstPos[0]);
    this.x2 = parseInt(secondPos[0]);
    this.y1 = parseInt(firstPos[1]);
    this.y2 = parseInt(secondPos[1]);
  }

  public allPositions(): Array<Position> {
    if (this.isDiagonal()) {
      return this.allPositionsDiagonal();
    }
    if (this.isHorizontal()) {
      return this.allPositionsHorizontal();
    }
    return this.allPositionsVertical();
  }

  private allPositionsDiagonal(): Array<Position> {
    // (y2-y1)/(x2-x1) = m
    const slope = (this.y2 - this.y1) / (this.x2 - this.x1);
    // y = mx+b -> b = y-mx
    const yOffset = this.y1 - slope * this.x1;

    let xStart: number, xEnd: number;

    const response: Array<Position> = new Array<Position>();

    this.x1 < this.x2 ? ((xStart = this.x1), (xEnd = this.x2)) : ((xStart = this.x2), (xEnd = this.x1));

    for (let x: number = xStart; x <= xEnd; x++) {
      const y = this.getYPos(x, slope, yOffset);
      response.push(new Position(x, y));
    }

    return response;
  }

  private isHorizontal() {
    return this.y1 == this.y2;
  }
  private allPositionsHorizontal(): Array<Position> {
    let xStart: number, xEnd: number;

    const response: Array<Position> = new Array<Position>();

    this.x1 < this.x2 ? ((xStart = this.x1), (xEnd = this.x2)) : ((xStart = this.x2), (xEnd = this.x1));

    for (let x: number = xStart; x <= xEnd; x++) {
      response.push(new Position(x, this.y1));
    }

    return response;
  }

  private allPositionsVertical(): Array<Position> {
    let yStart: number, yEnd: number;

    const response: Array<Position> = new Array<Position>();

    this.y1 < this.y2 ? ((yStart = this.y1), (yEnd = this.y2)) : ((yStart = this.y2), (yEnd = this.y1));

    for (let y: number = yStart; y <= yEnd; y++) {
      response.push(new Position(this.x1, y));
    }

    return response;
  }

  private getYPos(x: number, slope: number, yOffset: number): number {
    return Math.trunc(slope * x + yOffset);
  }

  public isDiagonal(): boolean {
    if (this.x1 == this.x2 || this.y1 == this.y2) return false;
    return true;
  }
}
