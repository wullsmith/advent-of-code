// Day 03: Binary Diagnostic
import { readStringList } from "./lib/utils";

const numbers = readStringList('../inputs/03');

// 3-1
let gammaBits = new Array(numbers[0].length).fill(0);
let epsilonBits = [...gammaBits];

for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers[i].length; j++) {

  }
}

for (const number of numbers) {
  for (let i = 0; i < number.length; i++) {
    if (number[i] === '0') gammaBits[i]--;
    else gammaBits[i]++;
  }
}

for (let i = 0; i < gammaBits.length; i++) {
  if (gammaBits[i] > 0) {
    gammaBits[i] = 1;
    epsilonBits[i] = 0;
  }
  else {
    gammaBits[i] = 0;
    epsilonBits[i] = 1;
  }
}

const gammaFinal = parseInt(gammaBits.join(''), 2);
const epsilonFinal = parseInt(epsilonBits.join(''), 2);
const solution1 = gammaFinal * epsilonFinal;

//console.log(`3-1: ${solution1}`);

// 3-2
let o2Set = [...numbers];
let co2Set = [...numbers];

for (let i = 0; i < numbers[0].length; i++) {
  let o2mc = findMostCommon(o2Set, i, '1');
  let co2mc = findMostCommon(co2Set, i, '0');
  let newO2Set = [];
  let newCO2Set = [];
  for (const num of o2Set) {
    if (num[i] === o2mc) {
      newO2Set.push(num);
    }
  }
  for (const num of co2Set) {
    if (num[i] === co2mc) {
      newCO2Set.push(num);
    }
  }

  if (o2Set.length > 1) o2Set = [...newO2Set];
  if (co2Set.length > 1) co2Set = [...newCO2Set];
  console.log(`o2 length: ${o2Set.length}`);
  console.log(`co2 length: ${co2Set.length}`);
}

const o2rating = parseInt(o2Set[0], 2);
const co2Rating = parseInt(co2Set[0], 2);
const solution2 = o2rating * co2Rating;

console.log(`o2set: ${o2Set}`);
console.log(`co2set: ${co2Set}`);

console.log(`O2:  ${o2rating}`);
console.log(`CO2: ${co2Rating}`);
console.log(`3-2: ${solution2}`);

// helper
function findMostCommon(set: Array<string>, pos: number, tie: '0' | '1') {
  let counter = 0;
  for (let i = 0; i < set.length; i++) {
    if (set[i].charAt(pos) === '1') {
      counter++;
    }
  }

  const half = set.length / 2;
  if (counter > half) {
    return tie === '1' ? '1' : '0';
  } else if (counter < half) {
    return tie === '1' ? '0' : '1';
  } else {
    return tie;
  }
}