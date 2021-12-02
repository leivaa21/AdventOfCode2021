import fs from 'fs';
import { join } from 'path';

export class PartI {
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
    const arrayString = buffer.toString().split('\n');
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

export class PartII extends PartI {
  public aim: number;

  constructor() {
    super();
    this.aim = 0;
  }

  handleCommand(cmd: { order: string; value: number }) {
    if (cmd.order == 'down') {
      this.aim += cmd.value;
    } else if (cmd.order == 'up') {
      this.aim -= cmd.value;
    } else if (cmd.order == 'forward') {
      this.horizontalPos += cmd.value;
      this.depth += this.aim * cmd.value;
    }
  }
}

export default function main() {
  const main: PartI = new PartI();
  main.compute('../inputs/day2Input');
  console.log(`Day2 - I = ${main.depth * main.horizontalPos}`);
  const main2: PartII = new PartII();
  main2.compute('../inputs/day2Input');
  console.log(`Day2 - II = ${main2.depth * main2.horizontalPos}`);
}
