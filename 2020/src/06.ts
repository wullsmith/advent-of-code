import * as fs from 'fs';

function readGroupFile(filename: string): Array<string> {
  let groups = fs.readFileSync(filename, 'utf-8').trim().split('\n\n');
  return groups;
}

function countLetters(group: string) {
  let letters = {};
  let count = 0;
  let groupArr = group.split('\n');

  for (let person of groupArr) {
    for (let c of person) {
      if (!letters[c]) {
        letters[c] = 1;
        count++;
      }
    }
  }

  return count;
}

function countCommonLetters(group: string): number {
  let letters = [];
  let persons = group.split('\n');


  for (let letter of persons[0]) {
    letters.push(letter);
  }

  for (let person of persons) {
    let newLetters = [];
    for (let letter of person) {
      if (letters.includes(letter)) {
        newLetters.push(letter);
      }
    }
    letters = newLetters;
  }

  return letters.length;
}

function sumCounts(groups: Array<string>, counter: (group: string) => number) {
  let sum = 0;

  for (let group of groups) {
    sum += counter(group);
  }

  return sum;
}

// main
const inputFile = '../inputs/06.txt';
const groups = readGroupFile(inputFile);

console.log(`6-1 answer: ${sumCounts(groups, countLetters)}`);
console.log(`6-2 answer: ${sumCounts(groups, countCommonLetters)}`);
