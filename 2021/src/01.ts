// Day 01: Sonar Sweep

import { readIntList } from './lib/utils';

const levels = readIntList('../inputs/01');

let increases1 = 0;
for (let i = 0; i < levels.length; i++) {
  if (i > 0) {
    if ((levels[i] - levels[i-1]) > 0) increases1++;
  }
}

let increases2 = 0;
for (let i = 0; i < levels.length; i++) {
  if (i > 2) {
    const sumA = levels[i-1] + levels[i-2] + levels[i-3];
    const sumB = levels[i] + levels[i-1] + levels[i-2];
    if (sumB - sumA > 0) increases2++;
  }
}

console.log(`1-1: ${increases1}`);
console.log(`1-2: ${increases2}`);
