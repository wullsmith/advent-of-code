// Day 9: Encoding Error
import { readIntList } from './lib/utils';

function canSum(arr: Array<number>, target: number): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return true;
      }
    }
  }

  return false;
}

function findInvalidNumber(arr: Array<number>, preambleLength: number): number {
  let i = preambleLength;

  while(i < arr.length) {
    if (!canSum(arr.slice(i - preambleLength, i), arr[i])) {
      return arr[i];
    }

    i++;
  }

  return -1;
}

function sumArray(arr: Array<number>) {
  let sum = 0;
  for (let n of arr) {
    sum += n;
  }

  return sum;
}

function findContiguousSet(arr: Array<number>, target: number): Array<number> {
  let start = 0;
  let length = 2;

  while (start < arr.length - 2) {
    for (let start = 0; start < arr.length - 2; start++) {
      for (let length = 2; start+length < arr.length; length++) {
        let section = arr.slice(start, start+length);
        if (sumArray(section) === target) {
          return section;
        }
      }
    }
  }

  return [];
}

function sumMinMax(arr: Array<number>): number {
  let min = Infinity;
  let max = 0;

  for (let n of arr) {
    if (n < min) min = n;
    if (n > max) max = n;
  }

  return min + max;
}

// main
const inputFile = '../inputs/09.txt';
const array = readIntList(inputFile);
const invalidNumber = findInvalidNumber(array, 25);
console.log(`9-1 answer: ${invalidNumber}`);

const contiguousSet = findContiguousSet(array, invalidNumber);
console.log(`9-2 answer: ${sumMinMax(contiguousSet)}`);
