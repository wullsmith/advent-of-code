import * as fs from 'fs';

export function readIntList(filename: string): Array<number> {
  return fs.readFileSync(filename, 'utf-8').split('\n').map(s => parseInt(s, 10)).filter((n) => !Number.isNaN(n));
}

export function readStringList(filename: string): Array<string> {
  return fs.readFileSync(filename, 'utf-8').split('\n').filter((s) => s !== '').map((s) => s.trim());
}

export function readIntListCsv(filename: string): Array<number> {
  return fs.readFileSync(filename, 'utf-8').split(',').map(s => parseInt(s));
}

export function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export function lcm(a: number, b: number): number {
  const max = a > b ? a : b;
  const min = a < b ? a : b;

  let multiple = max;

  while (multiple % min !== 0) {
    multiple += max;
  }

  return multiple;
}

export function padZeroes(val: string, len: number): string {
  let newVal = val;
  while (newVal.length < len) {
    newVal = '0' + newVal;
  }

  return newVal;
}

export function sumArray(arr: Array<number>): number {
  return arr.reduce((prev, cur) => prev + cur);
}