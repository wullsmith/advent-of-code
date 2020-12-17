// Day 16: Ticket Translation
import * as fs from 'fs';

interface FieldRange {
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

function isAnyValidField(value: number, fieldRanges: Array<FieldRange>): boolean {
  for (const fieldRange of fieldRanges) {
    if ((value >= fieldRange.min1 && value <= fieldRange.max1) || (value >= fieldRange.min2 && value <= fieldRange.max2)) {
      return true;
    }
  }
  return false;
}

function getNearbyFieldValues(inputString: string): Array<number> {
  let fieldString = inputString.split('nearby tickets:')[1];
  return fieldString.split(/[\n,]/).filter(s => s !== '').map(s => parseInt(s));
}

function getFieldRanges(inputString: string): Array<FieldRange> {
  let fieldLines = inputString.split('your ticket:')[0].split('\n').filter(s => s !== '');
  let fieldRanges = [];

  const regex = /(?<min>\d+)-(?<max>\d+)/g;
  for (let line of fieldLines) {
    let matches = [...line.matchAll(regex)];

    fieldRanges.push({
      min1: matches[0][1],
      max1: matches[0][2],
      min2: matches[1][1],
      max2: matches[1][2],
    });
    // let match = regex.exec(line);
    // if (match === null) break;

    // const min1 = match.groups.min;
    // const max1 = match.groups.max;

    // match = regex.exec(line);
    // const min2 = match.groups.min;
    // const max2 = match.groups.max;

    // fieldRanges.push({
    //   min1,
    //   max1,
    //   min2,
    //   max2,
    // });
  }
  return fieldRanges;
}

function findErrorRate(inputString: string): number {
  const fieldRanges = getFieldRanges(inputString);
  const fieldValues = getNearbyFieldValues(inputString);

  let errorRate = 0;
  for (const value of fieldValues) {
    if (!isAnyValidField(value, fieldRanges)) errorRate += value;
  }

  return errorRate;
}

// main
const inputFile = '../inputs/16.txt';
const inputString = fs.readFileSync(inputFile, 'utf-8');
// console.log(getNearbyFieldValues(inputString))
// console.log(getFieldRanges(inputString));
console.log(`16-1 answer: ${findErrorRate(inputString)}`);