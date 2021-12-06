import { readFileSync } from 'fs';
import { join } from 'path';

//get the number of lanterfish in 80 days
//timer of 7 days to generate a new lanterfish (timer on 6 really)
//lanterfish spawns with timer of 9 (timer on 8 really)

export default function main() {
  const lanterFishesGroup: lanterFishSchool = new lanterFishSchool('../inputs/day6Input');
  lanterFishesGroup.passDays(80);
  console.log(`Day6 BRUTE - I  = ${lanterFishesGroup.getCurrent()}`);
}

export class lanterFishSchool {
  private activeLF: Array<LanterFish> = new Array<LanterFish>();

  constructor(path: string) {
    this.loadInput(path);
  }

  private loadInput(path: string) {
    const buffer: Buffer = readFileSync(join(__dirname, path));
    const timersString = buffer.toString().split(',');
    timersString.map((val) => {
      this.activeLF.push(new LanterFish(parseInt(val)));
    });
  }

  public getCurrent() {
    return this.activeLF.length;
  }

  public passDays(days: number) {
    for (let day = 0; day < days; day++) {
      this.activeLF = this.activeLF.concat(this.getNewBorns());
    }
  }

  private getNewBorns(): Array<LanterFish> {
    const newBorn: Array<LanterFish> = new Array<LanterFish>();
    this.activeLF.map((lf) => {
      const child: LanterFish | undefined = lf.passDay();
      if (child) {
        newBorn.push(child);
      }
    });
    return newBorn;
  }
}

export class LanterFish {
  private internalTimer: number;

  constructor(actualTimer?: number) {
    this.internalTimer = actualTimer != undefined ? actualTimer : 8;
  }

  public passDay(): LanterFish | undefined {
    if (this.internalTimer == 0) {
      this.internalTimer = 6;
      return new LanterFish();
    }
    this.internalTimer--;
    return;
  }
  public getTimer() {
    return this.internalTimer;
  }
}
