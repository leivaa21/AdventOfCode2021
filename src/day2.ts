import fs from 'fs';
import { join } from 'path';

export class Day2 {
  public depth: number;
  public horizontalPos: number;
  public cmds: Array<{ order: string; value: number }>;

  constructor() {
    this.depth = 0;
    this.horizontalPos = 0;
    this.cmds = [];
  }

  formatCmd(cmd: string): { order: string; value: number } {
    const order: string = cmd.slice(0, cmd.length - 2);
    const value: number = parseInt(cmd.slice(cmd.length - 1));
    return { order, value };
  }

  readOrders(path: string) {
    const buffer = fs.readFileSync(join(__dirname, path));
    const arrayString = buffer.toString().replace(/\r\n/g, '\n').split('\n');
    arrayString.forEach((cmd) => {
      this.cmds.push(this.formatCmd(cmd));
    });
  }

  handleCommand(cmd: { order: string; value: number }) {
    if (cmd.order == 'down') this.depth += cmd.value;
    else if (cmd.order == 'up') this.depth -= cmd.value;
    else if (cmd.order == 'forward') this.horizontalPos += cmd.value;
  }

  compute(path: string) {
    this.readOrders(path);
    this.cmds.forEach((cmd) => {
      this.handleCommand(cmd);
    });
  }
}

export function main() {
  const main: Day2 = new Day2();
  main.compute('../inputs/day2Input');
  console.log(
    `Depth = ${main.depth}\nHorizontal = ${
      main.horizontalPos
    }\n 1st response = ${main.depth * main.horizontalPos}`
  );
}
