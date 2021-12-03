import fs from 'fs';
import { join } from 'path';
export function isGreater(a: number, b: number): boolean {
  return a > b;
}

export function readAllInput(path: string): Array<number> {
  const response: Array<number> = new Array<number>();

  const buffer = fs.readFileSync(join(__dirname, path));
  const arrayString = buffer.toString().split('\n');
  for (const i of arrayString) response.push(parseInt(i));
  return response;
}

export function howMuchAreGreater(array: Array<number>): number {
  let response = 0;
  for (let it = 1; it < array.length; it++) {
    if (array[it] > array[it - 1]) response++;
  }
  return response;
}

export function getMeasures(array: Array<number>): Array<number> {
  const response: Array<number> = new Array<number>();
  for (let it = 2; it < array.length; it++) {
    const measure: number = array[it - 2] + array[it - 1] + array[it];
    response.push(measure);
  }
  return response;
}
export default function day1() {
  const input: Array<number> = readAllInput('../inputs/day1Input');
  const meassures: Array<number> = getMeasures(input);

  console.log(`Day1 - I = ${howMuchAreGreater(input)}\nDay1 - II = ${howMuchAreGreater(meassures)}`);
}
