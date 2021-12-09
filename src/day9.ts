import { readFileSync } from 'fs';
import { join } from 'path';

export default function main() {
  const example: SmokeBasin = new SmokeBasin('../inputs/day9Input');
  console.log(`Day 9 - I = ${example.getRiskPoints()}`);
  console.log(`Day 9 - II = ${example.get2Puzzle()}`);
}

export interface Position {
  y: number;
  x: number;
}

export class SmokeBasin {
  //heightmap[y][x]
  public heightMap: Array<Array<number>>;
  public lowerPoints: Array<Position> = new Array<Position>();
  public basins: Array<Array<Position>> = new Array<Array<Position>>();
  public y_length = 0;
  public x_length = 0;
  constructor(path: string) {
    this.heightMap = this.load(path);
  }

  private load(path: string): Array<Array<number>> {
    const heightMap: Array<Array<number>> = new Array<Array<number>>();

    const buffer = readFileSync(join(__dirname, path)).toString();

    const bufferLine = buffer.split('\n');

    bufferLine.forEach((line) => {
      const xArray: Array<number> = line.split('').map((valString) => parseInt(valString));
      heightMap.push(xArray);
    });

    this.y_length = heightMap.length;
    this.x_length = heightMap[0].length;

    return heightMap;
  }

  public getRiskPoints(): number {
    let risk = 0;
    this.heightMap.map((x_axys, y) => {
      x_axys.map((val, x) => {
        if (this.isLowPoint(y, x)) {
          this.lowerPoints.push({ y: y, x: x });
          risk += val + 1;
        }
      });
    });
    return risk;
  }
  public isLowPoint(y: number, x: number): boolean {
    if (this.leftIsLower(y, x) || this.rightIsLower(y, x) || this.upIsLower(y, x) || this.downIsLower(y, x))
      return false;

    return true;
  }

  private leftIsLower(y: number, x: number): boolean {
    if (x == 0) return false;

    if (this.heightMap[y][x] < this.heightMap[y][x - 1]) return false;
    return true;
  }
  private rightIsLower(y: number, x: number): boolean {
    if (x == this.x_length - 1) return false;
    if (this.heightMap[y][x] < this.heightMap[y][x + 1]) return false;
    return true;
  }

  private upIsLower(y: number, x: number): boolean {
    if (y == 0) return false;
    if (this.heightMap[y][x] < this.heightMap[y - 1][x]) return false;
    return true;
  }
  private downIsLower(y: number, x: number): boolean {
    if (y == this.y_length - 1) return false;
    if (this.heightMap[y][x] < this.heightMap[y + 1][x]) return false;
    return true;
  }

  // PART II

  private getBasins() {
    this.lowerPoints.forEach((lowPoint) => {
      this.basins.push(this.getFullBasin(lowPoint));
    });
  }

  public get2Puzzle(): number {
    this.getBasins();
    const basinsToMultiply: Array<number> = this.getThreeLargests();
    const res = basinsToMultiply.reduce((previous, current) => {
      return previous * current;
    });
    return res;
  }

  private getThreeLargests(): Array<number> {
    const arr: number[] = [0, 0, 0];

    const auxiliar = this.basins.map((basin) => {
      return basin.length;
    });

    console.log(auxiliar);
    auxiliar.sort(function (a, b) {
      return b - a;
    });
    console.log(auxiliar);
    arr[0] = auxiliar[0];
    arr[1] = auxiliar[1];
    arr[2] = auxiliar[2];
    console.log(arr);
    return arr;
  }

  private isAlreadyInABasin(y: number, x: number): boolean {
    const find = this.basins.find((basin) => basin.find((pos) => pos.y == y && pos.x == x) != undefined);
    if (find == undefined) return false;
    return true;
  }
  public getFullBasin(center: Position): Array<Position> {
    let basin = new Array<Position>();
    basin.push(center);
    basin = basin.concat(this.getLeftTreeOfBasin(basin, center));
    basin = basin.concat(this.getRightTreeOfBasin(basin, center));
    basin = basin.concat(this.getUpTreeOfBasin(basin, center));
    basin = basin.concat(this.getDownTreeOfBasin(basin, center));
    basin = this.onlyUniques(basin);
    return basin;
  }

  private getLeftTreeOfBasin(basin: Array<Position>, prevPos: Position): Array<Position> {
    basin = this.onlyUniques(basin);
    const nextLeftPos = { y: prevPos.y, x: prevPos.x - 1 };
    if (nextLeftPos.x >= 0 && !this.checkIfAlreadyExist(basin, nextLeftPos)) {
      if (this.couldBeLeftTreeBasin(nextLeftPos.y, nextLeftPos.x)) {
        basin.push(nextLeftPos);
        basin = basin.concat(this.getLeftTreeOfBasin(basin, nextLeftPos));
      }
    }
    const nextUpPos = { y: prevPos.y - 1, x: prevPos.x };
    if (nextUpPos.y >= 0 && !this.checkIfAlreadyExist(basin, nextUpPos)) {
      if (this.couldBeUpTreeBasin(nextUpPos.y, nextUpPos.x)) {
        basin.push(nextUpPos);
        basin = basin.concat(this.getUpTreeOfBasin(basin, nextUpPos));
      }
    }
    const nextDownPos = { y: prevPos.y + 1, x: prevPos.x };
    if (nextDownPos.y < this.y_length && !this.checkIfAlreadyExist(basin, nextDownPos)) {
      if (this.couldBeDownTreeBasin(nextDownPos.y, nextDownPos.x)) {
        basin.push(nextDownPos);
        basin = basin.concat(this.getDownTreeOfBasin(basin, nextDownPos));
      }
    }
    return basin;
  }

  private getRightTreeOfBasin(basin: Array<Position>, prevPos: Position): Array<Position> {
    basin = this.onlyUniques(basin);
    const nextRightPos = { y: prevPos.y, x: prevPos.x + 1 };
    if (nextRightPos.x < this.x_length && !this.checkIfAlreadyExist(basin, nextRightPos)) {
      if (this.couldBeRightTreeBasin(nextRightPos.y, nextRightPos.x)) {
        basin.push(nextRightPos);
        basin = basin.concat(this.getRightTreeOfBasin(basin, nextRightPos));
      }
    }
    const nextUpPos = { y: prevPos.y - 1, x: prevPos.x };
    if (nextUpPos.y >= 0 && !this.checkIfAlreadyExist(basin, nextUpPos)) {
      if (this.couldBeUpTreeBasin(nextUpPos.y, nextUpPos.x)) {
        basin.push(nextUpPos);
        basin = basin.concat(this.getUpTreeOfBasin(basin, nextUpPos));
      }
    }
    const nextDownPos = { y: prevPos.y + 1, x: prevPos.x };
    if (nextDownPos.y < this.y_length && !this.checkIfAlreadyExist(basin, nextDownPos)) {
      if (this.couldBeDownTreeBasin(nextDownPos.y, nextDownPos.x)) {
        basin.push(nextDownPos);
        basin = basin.concat(this.getDownTreeOfBasin(basin, nextDownPos));
      }
    }
    return basin;
  }

  private getDownTreeOfBasin(basin: Array<Position>, prevPos: Position): Array<Position> {
    basin = this.onlyUniques(basin);

    const nextLeftPos = { y: prevPos.y, x: prevPos.x - 1 };
    if (nextLeftPos.x >= 0 && !this.checkIfAlreadyExist(basin, nextLeftPos)) {
      if (this.couldBeLeftTreeBasin(nextLeftPos.y, nextLeftPos.x)) {
        basin.push(nextLeftPos);
        basin = basin.concat(this.getLeftTreeOfBasin(basin, nextLeftPos));
      }
    }
    const nextRightPos = { y: prevPos.y, x: prevPos.x + 1 };
    if (nextRightPos.x < this.x_length && !this.checkIfAlreadyExist(basin, nextRightPos)) {
      if (this.couldBeRightTreeBasin(nextRightPos.y, nextRightPos.x)) {
        basin.push(nextRightPos);
        basin = basin.concat(this.getRightTreeOfBasin(basin, nextRightPos));
      }
    }
    const nextDownPos = { y: prevPos.y + 1, x: prevPos.x };
    if (nextDownPos.y < this.y_length && !this.checkIfAlreadyExist(basin, nextDownPos)) {
      if (this.couldBeDownTreeBasin(nextDownPos.y, nextDownPos.x)) {
        basin.push(nextDownPos);
        basin = basin.concat(this.getDownTreeOfBasin(basin, nextDownPos));
      }
    }
    return basin;
  }

  private getUpTreeOfBasin(basin: Array<Position>, prevPos: Position): Array<Position> {
    basin = this.onlyUniques(basin);

    const nextLeftPos = { y: prevPos.y, x: prevPos.x - 1 };
    if (nextLeftPos.x >= 0 && !this.checkIfAlreadyExist(basin, nextLeftPos)) {
      if (this.couldBeLeftTreeBasin(nextLeftPos.y, nextLeftPos.x)) {
        basin.push(nextLeftPos);
        basin = basin.concat(this.getLeftTreeOfBasin(basin, nextLeftPos));
      }
    }
    const nextRightPos = { y: prevPos.y, x: prevPos.x + 1 };
    if (nextRightPos.x < this.x_length && !this.checkIfAlreadyExist(basin, nextRightPos)) {
      if (this.couldBeRightTreeBasin(nextRightPos.y, nextRightPos.x)) {
        basin.push(nextRightPos);
        basin = basin.concat(this.getRightTreeOfBasin(basin, nextRightPos));
      }
    }
    const nextUpPos = { y: prevPos.y - 1, x: prevPos.x };
    if (nextUpPos.y >= 0 && !this.checkIfAlreadyExist(basin, nextUpPos)) {
      if (this.couldBeUpTreeBasin(nextUpPos.y, nextUpPos.x)) {
        basin.push(nextUpPos);
        basin = basin.concat(this.getUpTreeOfBasin(basin, nextUpPos));
      }
    }
    return basin;
  }

  private couldBeLeftTreeBasin(y: number, x: number): boolean {
    if (this.leftIsLower(y, x)) return false;
    if (this.heightMap[y][x] == 9) return false;
    return true;
  }
  private couldBeRightTreeBasin(y: number, x: number): boolean {
    if (this.rightIsLower(y, x)) return false;
    if (this.heightMap[y][x] == 9) return false;
    return true;
  }
  private couldBeUpTreeBasin(y: number, x: number): boolean {
    if (this.upIsLower(y, x)) return false;
    if (this.heightMap[y][x] == 9) return false;
    return true;
  }
  private couldBeDownTreeBasin(y: number, x: number): boolean {
    if (this.downIsLower(y, x)) return false;
    if (this.heightMap[y][x] == 9) return false;
    return true;
  }

  private onlyUniques(arr: Array<Position>): Array<Position> {
    const result = new Array<Position>();

    arr.forEach((pos) => {
      const index = result.findIndex((position) => pos.y == position.y && pos.x == position.x);
      if (index == -1) result.push(pos);
    });

    return result;
  }
  private checkIfAlreadyExist(arr: Array<Position>, pos: Position): boolean {
    const index = arr.findIndex((position) => pos.y == position.y && pos.x == position.x);
    if (index != -1) return true;
    return false;
  }
}
