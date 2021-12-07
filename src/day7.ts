import { readFileSync } from 'fs';
import { join } from 'path';

export default function main() {
  const army: crabArmy = new crabArmy('../inputs/day7Input');
  const response = army.getBestWayWithLinearFuel();
  console.log(`Day 7 - I = ${response.target}, ${response.fuel}`);

  const army2: crabArmy = new crabArmy('../inputs/day7Input');
  const response2 = army2.getBestWay();
  console.log(`Day 7 - II = ${response2.target}, ${response2.fuel}`);
}

// Cache = <TargetPos:number, TargetMap:Map>
// TargetMap = <CrabPos, Distance>
let cache: Map<number, Map<number, number>> = new Map<number, Map<number, number>>();

export class Result {
  constructor(public readonly target: number, public readonly fuel: number) {}
}

export class crabArmy {
  public crabPositions: Array<number> = new Array<number>();
  public results: Array<Result> = new Array<Result>();
  constructor(path: string) {
    this.load(path);
  }

  private load(path: string) {
    const buffer = readFileSync(join(__dirname, path));
    const input = buffer.toString().split(',');
    this.crabPositions = input.map((val) => parseInt(val));
  }

  public getFutherCrab(): number {
    return this.crabPositions.reduce((previous, current) => {
      return previous > current ? previous : current;
    });
  }

  public sortCrabs() {
    this.crabPositions.sort((a, b) => {
      return a - b;
    });
  }

  public getBestWayWithLinearFuel(): Result {
    cache = new Map<number, Map<number, number>>();
    this.sortCrabs();
    this.calcAllPosibilitiesWithLinearFuel();
    this.storeResults();
    return this.getLowerResult();
  }

  private calcAllPosibilitiesWithLinearFuel() {
    this.crabPositions.forEach((target) => {
      this.calcPosibilityWithLinearFuel(target);
    });
  }

  private calcPosibilityWithLinearFuel(target: number) {
    const targetMap = cache.get(target);
    if (targetMap) return;
    const thistargetMap: Map<number, number> = new Map<number, number>();
    cache.set(target, thistargetMap);

    this.crabPositions.forEach((pos) => {
      const thisPosibility = thistargetMap.get(pos);
      if (thisPosibility) return;
      thistargetMap.set(pos, Math.abs(target - pos));
    });
  }
  private storeResults() {
    cache.forEach((targetMap, target) => {
      const result = this.results.find((result) => result.target == target);
      if (result) return;

      let sumFuel = 0;

      this.crabPositions.forEach((pos) => {
        const fuelConsumed = targetMap.get(pos);
        if (fuelConsumed) sumFuel += fuelConsumed;
      });

      this.results.push(new Result(target, sumFuel));
    });
  }

  private getLowerResult(): Result {
    return this.results.reduce(function (previous, current) {
      return previous.fuel < current.fuel ? previous : current;
    });
  }

  // Part two
  public getBestWay(): Result {
    cache = new Map<number, Map<number, number>>();
    this.sortCrabs();
    this.calcAllPosibilities();
    this.storeResults();
    return this.getLowerResult();
  }

  private calcAllPosibilities() {
    this.crabPositions.forEach((target) => {
      this.calcPosibility(target);
    });
  }

  private calcPosibility(target: number) {
    const targetMap = cache.get(target);
    if (targetMap) return;
    const thistargetMap: Map<number, number> = new Map<number, number>();
    cache.set(target, thistargetMap);

    this.crabPositions.forEach((pos) => {
      const thisPosibility = thistargetMap.get(pos);
      if (thisPosibility) return;
      thistargetMap.set(pos, this.calcFuelConsumition(target, pos));
    });
  }
  public calcFuelConsumition(target: number, pos: number): number {
    const travel = target > pos ? target - pos : pos - target;
    let fuel = 0;
    for (let cost = 1; cost < travel + 1; cost++) {
      fuel += cost;
    }

    return fuel;
  }
}
