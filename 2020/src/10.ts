// Day 10: Adapter Array
import { count } from 'console';
import { readIntList } from './lib/utils';

let arrangementMemo = {};

function multiplyDifferences(sortedAdapterList: Array<number>): number {
  let oneDiffs = 0;
  let threeDiffs = 0;

  for (let i = 1; i < sortedAdapterList.length; i++) {
    let diff = sortedAdapterList[i] - sortedAdapterList[i-1];
    if (diff === 1) oneDiffs++;
    else if (diff === 3) threeDiffs++;
  }

  return oneDiffs * threeDiffs;
}

function countArrangements(sortedAdapterList: Array<number>): number {
  const key = sortedAdapterList.join(',');

  if (arrangementMemo[key]) {
    return arrangementMemo[key];
  }

  if (sortedAdapterList.length === 1) {
    arrangementMemo[key] = 1;
    return 1;
  }

  let arrangements = 0;
  let diff = 0;
  let i = 1;

  while (i < sortedAdapterList.length) {
    diff = sortedAdapterList[i] - sortedAdapterList[0];
    if (diff <= 3) {
      arrangements += countArrangements(sortedAdapterList.slice(i));
    } else {
      break;
    }
    i++;
  }

  arrangementMemo[key] = arrangements;
  return arrangements;
}

// main
const inputFile = '../inputs/10.txt';
const adapterList = readIntList(inputFile);

const sortedList = adapterList.sort((a, b) => a - b);

// add outlet and built-in adapter
sortedList.push(sortedList.slice(-1)[0] + 3);
sortedList.unshift(0);

console.log(`10-1 answer: ${multiplyDifferences(sortedList)}`);
console.log(`10-2 answer: ${countArrangements(sortedList)}`);
