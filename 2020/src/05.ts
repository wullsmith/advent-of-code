// Day 5: Binary Boarding
import { readStringList } from './lib/utils';

function getRow(spec: string): number {
  if (spec.length !== 7) {
    console.log(`Error: spec must have length 7 (${spec})`);
  }

  let min = 0;
  let max = 127;

  for (let c of spec) {
    if (c === 'B') {
      min = Math.ceil(min + (max-min)/2);
    } else if (c === 'F') {
      max = Math.floor(max - (max-min)/2);
    }
  }

  if (min !== max) {
    return -1;
  }

  return min;
}

function getCol(spec: string): number {
  if (spec.length !== 3) {
    console.log(`Error: spec must be 3 characters (${spec})`);
    return -1;
  }

  let min = 0;
  let max = 7;

  for (let c of spec) {
    if (c === 'R') {
      min = Math.ceil(min + (max-min)/2);
    } else if (c === 'L') {
      max = Math.floor(max - (max-min)/2);
    }
  }

  if (min !== max) {
    return -1;
  }

  return min;
}

function getSeatId(boardingPass: string): number {
  if (boardingPass.length !== 10) {
    return -1;
  }

  const rowSpec = boardingPass.slice(0, 7);
  const colSpec = boardingPass.slice(-3);

  return (getRow(rowSpec)*8) + getCol(colSpec);
}

function getSeatIds(boardingPasses: Array<string>): Array<number> {
  let seatIDs = [];
  for (let pass of boardingPasses) {
    seatIDs.push(getSeatId(pass));
  }

  return seatIDs;
};

function findSeatID(seatIds: Array<number>): number {
  let seatDict = {};

  let minId = Infinity;
  let maxId = 0;

  for(let id of seatIds) {
    if (id < minId) minId = id;
    if (id > maxId) maxId = id;
    seatDict[id] = 1;
  }

  for(let i = minId+1; i < maxId; i++) {
    if (!seatDict[i] && seatDict[i+1] && seatDict[i-1]) {
      return i;
    }
  }

  return -1;
}

// main
const inputFile = __dirname + '/../inputs/05.txt';
const passes = readStringList(inputFile);
const seatIDs = getSeatIds(passes);
const maxID = seatIDs.reduce((acc, cur) => Math.max(acc, cur));

console.log(`5-1 answer: ${maxID}`);

const myId = findSeatID(seatIDs);
console.log(`5-2 answer ${myId}`);