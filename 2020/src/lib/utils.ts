import * as fs from 'fs';

export function readIntList(filename: string): Array<number> {
  return fs.readFileSync(filename, 'utf-8').split('\n').map(s => parseInt(s, 10)).filter((n) => !Number.isNaN(n));
}

export function readStringList(filename: string): Array<string> {
  return fs.readFileSync(filename, 'utf-8').split('\n').filter((s) => s !== '').map((s) => s.trim());
}

export function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}