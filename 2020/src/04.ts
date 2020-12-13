// Day 4: Passport Processing
import * as fs from 'fs';

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

function readBatchFileWin(filename: string): Array<string> {
  return fs.readFileSync(filename, 'utf-8').trim().split('\r\n\r\n').map(s => s.split('\r\n').join(' '));
}

function isValid1(passport: string): boolean {
  let fields = [];
  let arr = passport.split(' ');

  for (let field of arr) {
    let [name, value] = field.split(':');
    fields.push(name);
  }

  if (fields.length < 7) {
    return false;
  }

  for (let requiredField of REQUIRED_FIELDS) {
    if (!fields.includes(requiredField)) {
      return false;
    }
  }

  return true;
}


function isValidFieldValue(name: string, value: string): boolean {
  switch (name) {
    case 'byr':
      const byr = parseInt(value);
      return (byr >= 1920 && byr <= 2002);
    case 'iyr':
      const iyr = parseInt(value);
      return (iyr >= 2010 && iyr <= 2020);
    case 'eyr':
      const eyr = parseInt(value);
      return (eyr >= 2020 && eyr <= 2030);
    case 'hgt':
      const hgt = parseInt(value);
      const unit = value.slice(-2);
      if (unit === 'in') {
        return (hgt >= 59 && hgt <= 76);
      } else if (unit === 'cm') {
        return (hgt >= 150 && hgt <= 193);
      } else {
        return false;
      }
    case 'hcl':
      return /^#[0-9a-f]{6}$/.test(value);
    case 'ecl':
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    case 'pid':
      return /^[0-9]{9}$/.test(value);
    case 'cid':
      return true; 
  }
}

function isValid2(passport: string): boolean {
  let fields = [];
  let arr = passport.split(' ');

  for (let field of arr) {
    let [name, value] = field.split(':');
    if (!isValidFieldValue(name, value)) {
      return false;
    }
    fields.push(name);
  }

  if (fields.length < 7) {
    return false;
  }


  for (let requiredField of REQUIRED_FIELDS) {
    if (!fields.includes(requiredField)) {
      return false;
    }
  }

  return true;
}

function countValidPassports(passports: Array<string>, validator: (passport: string) => boolean): number {
  let count = 0;
  for (let passport of passports) {
    if (validator(passport)) {
      count++;
    }
  }

  return count;
}

// main
const inputFile = '../inputs/04.txt';
const passports = readBatchFileWin(inputFile);

const numValid1 = countValidPassports(passports, isValid1);
console.log(`4-1 answer: ${numValid1}`);

const numValid2 = countValidPassports(passports, isValid2);
console.log(`4-2 answer: ${numValid2}`);
