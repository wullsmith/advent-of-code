// Day 06: Lanternfish
import * as fs from 'fs';

const filename = '../inputs/06';
let fishList = fs.readFileSync(filename, 'utf-8').split(',').map(n => parseInt(n));

const numDays = 256;

function countFishV1(fish: Array<number>, days: number): number {
  let fishTimes = [...fish];
  let daysPassed = 0;
  while (daysPassed < days) {
    let newFishList = [];
    let toAdd = 0;
    for (let i=0; i<fishTimes.length; i++) {
      const fishTime = fishTimes[i];
      if (fishTime === 0) {
        toAdd++;
        newFishList.push(6);
      } else {
        newFishList.push(fishTime - 1);
      }
    }

    // add new fish
    for (let i = 0; i < toAdd; i++) {
      newFishList.push(8);
    }

    fishTimes = [...newFishList];

    daysPassed++;
  }
  console.log(`list after ${days} more days: ${fishTimes}`);
  return fishTimes.length;
}

function countFishV2(fish: Array<number>, days: number): number {
  let fishCounts = [0,0,0,0,0,0,0,0,0];
  for (let f of fish) {
    fishCounts[f]++;
  }

  let daysPassed = 0;
  while (daysPassed < days) {
    let toAdd = fishCounts.shift();
    fishCounts.push(toAdd);
    fishCounts[6] += toAdd;
    daysPassed++;
    // console.log(`day ${daysPassed}: ${fishCounts}`)
  }

  return fishCounts.reduce((acc, n) => acc + n);
}

console.log(`6-1: ${countFishV2(fishList, 80)}`);
console.log(`6-2: ${countFishV2(fishList, 256)}`);
