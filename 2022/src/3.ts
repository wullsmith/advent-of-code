import { readStringList } from "./lib/utils";

const filename = '../inputs/3';

function buildPriorityMap(): object {
  const code_a = 'a'.charCodeAt(0);
  const code_A = 'A'.charCodeAt(0);

  let pMap = {};

  for (let i = 0; i < 26; i++) {
    const c1 = String.fromCharCode(code_a + i);
    const c2 = String.fromCharCode(code_A + i);

    pMap[c1] = i + 1;
    pMap[c2] = i + 1 + 26;
  }

  return pMap;
}

function splitInHalf(s: string): [string, string] {
  const len = s.length;
  const mid = len / 2;
  const s1 = s.substring(0, mid);
  const s2 = s.substring(mid, len);
  return [s1, s2];
}

function findCommonItem(s1: string, s2: string): string {
  let found = {};
  for (let c of s1) {
    found[c] = true;
  }

  for (let c of s2) {
    if (found[c]) {
      return c;
    }
  }

  console.log('Error: no common item found');
  return null;
}

function findCommonItem3(s1: string, s2: string, s3: string): string {
  let found1 = {};
  let found2 = {};

  for (let c of s1) {
    found1[c] = true;
  }

  for (let c of s2) {
    if (found1[c]) {
      found2[c] = true;
    }
  }

  for (let c of s3) {
    if (found2[c]) {
      return c;
    }
  }

  console.log(`findCommonItem3(): no common item found`);
}

function main(part: number) {
  const pMap = buildPriorityMap();
  const rucksacks = readStringList(filename);

  let pSum = 0;

  if (part === 1) {
    for (let rucksack of rucksacks) {
      const [s1, s2] = splitInHalf(rucksack);
      const c = findCommonItem(s1, s2);
      pSum += pMap[c];

      // console.log(`${s1} vs ${s2} --> ${c} (${pMap[c]})`);
    }

    console.log(`3-1: ${pSum}`);
    return;
  }

  if (part === 2) {
    for (let i = 0; i < rucksacks.length; i += 3) {
      const [s1, s2, s3] = [ rucksacks[i], rucksacks[i+1], rucksacks[i+2] ]
      const c = findCommonItem3(s1, s2, s3);
      pSum += pMap[c];
    }

    console.log(`3-2: ${pSum}`);
    return;
  }
}

main(2);
