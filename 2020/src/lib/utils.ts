import * as fs from 'fs';

export function readIntList(filename: string): Array<number> {
  return fs.readFileSync(filename, 'utf-8').split('\n').map(s => parseInt(s, 10)).filter((n) => !Number.isNaN(n));
}