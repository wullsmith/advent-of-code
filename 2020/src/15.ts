// Day 15: Rambunctious Recitation
import { readIntListCsv, sleep } from './lib/utils';

function playMemoryGame(startingList: Array<number>, limit: number): number {
  let turn = 1;
  let lastTurn = {};

  // starting numbers (all are unique)
  for (let i = 0; i < startingList.length - 1; i++) {
    let n = startingList[i];
    lastTurn[n] = turn;
    turn++;
  }

  let lastNumber = startingList.slice(-1)[0];
  let newNumber = NaN;

  while (turn < limit) {
    if (lastTurn[lastNumber]) {
      newNumber = turn - lastTurn[lastNumber];
    } else {
      newNumber = 0;
    }
    lastTurn[lastNumber] = turn;
    lastNumber = newNumber;
    turn++;

    // console.log(`turn ${turn}: "${newNumber}"`);
    console.log(`turn ${turn}: ${Object.keys(lastTurn).length}`);
  }

  return lastNumber;
}

// main
const inputFile = '../inputs/15.txt';
const startingList = readIntListCsv(inputFile);
const sampleList = [0,3,6];
// console.log(`15-1 answer: ${playMemoryGame(startingList, 2020)}`);

console.log(`15-2 answer: ${playMemoryGame(startingList, 30000000)}`);
// console.log(`sample answer: ${playMemoryGame2(sampleList, 10)}`);

// 184 low
// 1636 high