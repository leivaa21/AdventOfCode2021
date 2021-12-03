// Gamma Rate in Binary is the most common bit in the corresponding position in each number
// Epsilon Rate is the oposite of Gamma Rate in binary ( IF GR = 10110 ER = 01001)

import { readFileSync } from 'fs';
import { join } from 'path';

export function readAllInput(path: string): Array<string> {
  const response: Array<string> = new Array<string>();

  const buffer = readFileSync(join(__dirname, path));
  const arrayString = buffer.toString().split('\n');
  for (const string of arrayString) response.push(string);
  return response;
}

export function arraySplitter(array: Array<string>): Array<Array<number>> {
  let response = new Array<Array<number>>();

  splitNumber(array[0]).forEach(() => {
    response.push(new Array<number>());
  });

  for (let it = 0; it < array.length; it++) {
    const splitted: Array<number> = splitNumber(array[it]);
    response = sortInArrays(splitted, response);
  }

  return response;
}
export function splitNumber(number: string): Array<number> {
  const digitsString: Array<string> = Array.from(number);
  const digits: Array<number> = new Array<number>();
  digitsString.forEach((string) => {
    digits.push(parseInt(string));
  });
  return digits;
}

export function sortInArrays(
  splitedNumber: Array<number>,
  array: Array<Array<number>>
): Array<Array<number>> {
  for (let it = 0; it < splitedNumber.length; it++) {
    array[it].push(splitedNumber[it]);
  }
  return array;
}

export function getGRateBinary(input: Array<string>): number {
  const mostCommons: Array<number> = new Array<number>();

  const SplittedArray: Array<Array<number>> = arraySplitter(input);

  for (let it = 0; it < SplittedArray.length; it++) {
    const thisArray: Array<number> = SplittedArray[it];

    const mostCommonDigit: number = mostCommon(thisArray);
    mostCommons.push(mostCommonDigit);
  }

  return uniteNumber(mostCommons);
}

export function mostCommon(array: Array<number>): number {
  let zeroCount = 0;
  let oneCount = 0;

  array.forEach((digit) => {
    digit == 0 ? zeroCount++ : oneCount++;
  });
  return zeroCount > oneCount ? 0 : 1;
}

export function uniteNumber(array: Array<number>): number {
  let response = 0;

  for (let it = 0; it < array.length; it++) {
    response += array[array.length - (it + 1)] * Math.pow(10, it);
  }

  return response;
}

export function reverseBinary(binary: string) {
  const splitedNumber: Array<number> = splitNumber(binary);
  const responseSplited: Array<number> = new Array<number>();
  for (let it = 0; it < splitedNumber.length; it++) {
    splitedNumber[it] == 0 ? responseSplited.push(1) : responseSplited.push(0);
  }
  return uniteNumber(responseSplited);
}

export function parseFromBinaryToDecimal(binary: string): number {
  const digits: Array<number> = splitNumber(binary);
  let decimal = 0;
  for (let it = 0; it < digits.length; it++) {
    decimal += digits[it] * Math.pow(2, digits.length - it - 1);
  }

  return decimal;
}

export default function day3() {
  const input: Array<string> = readAllInput('../inputs/day3Input');
  const gRateBinary: number = getGRateBinary(input);
  const eRateBinary: number = reverseBinary(`${gRateBinary}`);
  const frstresponse: number =
    parseFromBinaryToDecimal(`${gRateBinary}`) *
    parseFromBinaryToDecimal(`${eRateBinary}`);
  `${gRateBinary}`;
  console.log(
    `gRateBinary = ${gRateBinary}\neRateBinary = ${eRateBinary}\ngRate = ${parseFromBinaryToDecimal(
      `${gRateBinary}`
    )}\neRate = ${parseFromBinaryToDecimal(
      `${eRateBinary}`
    )}\n1st response = ${frstresponse}`
  );
}
