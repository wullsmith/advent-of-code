// Day 13: Shuttle Search
import { readStringList, lcm } from './lib/utils';

function findBusIdAndWaitTime(leaveTime: number, busIds: Array<number>): [number, number] {
  let time = 0;
  while (true) {
    time++;
    if (time >= leaveTime) {
      for (let busId of busIds) {
        if (time % busId === 0) {
          console.log(`best bus: ${busId}; leave at ${time} (wait ${time - leaveTime})`);
          return [busId, time - leaveTime];
        }
      }
    }
  }
}

function findGoldCoinTimestamp(busIds: Array<number>): number {
  let sortedBusIds = busIds.filter(n => n !== -1).sort((a, b) => b - a);
  let indexes = {};

  for (let busId of sortedBusIds) {
    indexes[busId] = busIds.indexOf(busId);
  }

  const maxBusId = sortedBusIds[0];
  let time = maxBusId - indexes[maxBusId];
  let timeStep = maxBusId;
  let indexToFind = 1;

  let isGoldTime = false;
  while (true) {
    time += timeStep;
    isGoldTime = true;

    for (let i = 0; i < sortedBusIds.length; i++) {
      let busId = sortedBusIds[i];
      if ((time + indexes[busId]) % busId === 0) {
        if (i === indexToFind) {
          timeStep = lcm(timeStep, sortedBusIds[indexToFind]);
          indexToFind++;
        }
        continue;
      } else {
        isGoldTime = false;
        break;
      }
    }

    if (isGoldTime) {
      return time;
    }
  }
}

function parseBusIds1(busIds: string): Array<number> {
  return busIds.split(',').filter(s => s !== 'x').map(s => parseInt(s));
}

function parseBusIds2(busIds: string): Array<number> {
  return busIds.split(',').map(s => {
    return s === 'x' ? -1 : parseInt(s);
  });
}

// main
const inputFile = '../inputs/13.txt';
const data = readStringList(inputFile);
const earliestLeaveTime = parseInt(data[0]);
const busIds1 = parseBusIds1(data[1]);

const ans = findBusIdAndWaitTime(earliestLeaveTime, busIds1);
console.log(`13-1 answer: ${ans[0] * ans[1]}`);

const busIds2 = parseBusIds2(data[1]);
const goldTime = findGoldCoinTimestamp(busIds2);
console.log(`13-2 answer: ${goldTime}`);
