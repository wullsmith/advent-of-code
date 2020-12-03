// Day 2: Password Philosophy
import { readStringList } from './lib/utils';

function isValidPassword1(passwordLine: string): boolean {
  let [range, letter, pw] = passwordLine.split(' ');
  const [min, max] = range.split('-').map((n) => parseInt(n));
  letter = letter[0];

  let charCount = 0;
  for(let c of pw.split('')) {
    if (c === letter) {
      charCount++;
    }
  }

  if (charCount >= min && charCount <= max) {
    return true;
  }

  return false;
}

function isValidPassword2(passwordLine: string): boolean {
  let [indices, letter, pw] = passwordLine.split(' ');
  const [i, j] = indices.split('-').map((n) => parseInt(n) - 1);
  letter = letter[0];

  if ((pw[i] === letter) !== (pw[j] === letter)) {
    return true;
  }

  return false;
}

function countValidPasswords(passwordLines: Array<string>, isValid: (passwordLine: string) => boolean): number {
  let count = 0;
  for (let passwordLine of passwordLines) {
    if (isValid(passwordLine)) {
      count++;
    }
  }

  return count;
}

// main
const inputFile = '../inputs/02.txt';
const passwords = readStringList(inputFile);

const numValid1 = countValidPasswords(passwords, isValidPassword1);
console.log(`2-1 answer: ${numValid1}`);

const numValid2 = countValidPasswords(passwords, isValidPassword2);
console.log(`2-2 answer: ${numValid2}`);

