import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Cache is an Array of posibles Scenarios
 * An scenario has an Array of Posibilities
 * A Posibility is how much fishes will spawn from an fish with an initial timer X
 * In this approach, only are calculated 5 posibilities in each scenario
 * (1 for every posible initialTimer)
 */
const cache = new Array<Scenario>();

export class Scenario {
  public posibilities: Array<Posibility> = [];

  constructor(public days: number) {}

  public addPosibility(timer: number, spawned: number) {
    this.posibilities.push({ initialTimer: timer, finalGroup: spawned });
  }
}

export interface Posibility {
  initialTimer: number;
  finalGroup: number;
}

/**
 * As far as I know, this would be a lot easier with Mapping, but
 * Im not familiar enought to work with that quickly
 *
 * I might do another approach with mapping when this advent go too hard for me
 */

export class LFGroup {
  public group: Array<LFish> = new Array<LFish>();
  constructor(path: string) {
    this.load(path);
  }
  private load(path: string) {
    const buffer = readFileSync(join(__dirname, path));
    const input = buffer.toString().split(',');
    this.group = input.map((val) => new LFish(parseInt(val, 10)));
  }
  public getFishCountPastDays(days: number): number {
    const fishesSpawnedForEachOG: Array<number> = this.group.map((fish) => fish.FishesSpawnedInTime(days));
    let sum = 0;
    for (let it = 0; it < fishesSpawnedForEachOG.length; it++) {
      sum += fishesSpawnedForEachOG[it];
    }
    return sum;
  }
}

class LFish {
  public initialTimer: number;
  constructor(timer: number) {
    this.initialTimer = timer;
  }

  public FishesSpawnedInTime(days: number): number {
    //First search if there's a scenario with this number of days
    let daysMap = cache.find((sc) => sc.days == days);
    if (!daysMap) {
      //If not, creates that scenario
      daysMap = new Scenario(days);
      cache.push(daysMap);
    }

    //Then searchs if this posibility is already calculated
    const thisPosibility = daysMap.posibilities.find((ps) => ps.initialTimer == this.initialTimer);
    if (thisPosibility) {
      //If it has been calculated, returns the calc
      return thisPosibility.finalGroup;
    }

    //Calc the final group
    let finalGroup = 1;
    for (let time: number = this.initialTimer; time < days; time += 7) {
      //Add the child's spawned fishes to parent group recursively
      finalGroup += new LFish(time + 9).FishesSpawnedInTime(days);
    }

    //Add posibility so it isnt re-calculated
    daysMap.addPosibility(this.initialTimer, finalGroup);

    return finalGroup;
  }
}

export default function main() {
  const lfGroup = new LFGroup('../inputs/day6Input');
  const firstResponse: number = lfGroup.getFishCountPastDays(80);
  console.log(`Day6 - I Clean : ${firstResponse}`);
  const secondResponse: number = lfGroup.getFishCountPastDays(256);
  console.log(`Day6 - II Clean: ${secondResponse}`);
}
