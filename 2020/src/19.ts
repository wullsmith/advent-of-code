// Day 19: Monster Messages
import { readStringList, sleep } from './lib/utils';
import * as fs from 'fs';

function readInput(input: string): Array<Array<string>> {
  return fs.readFileSync(input, 'utf-8').split('\n\n').filter(s => s.length > 0).map(s => s.split('\n'));
}

function parseRules(lines: Array<string>): object {
  let ruleDict = {};
  for (let line of lines) {
    let [key, rem] = line.split(': ');
    if (rem[0] === '"a"' || rem[0] === '"b"') {
      ruleDict[key] = rem[0];
    } else {
      let ruleNums: Array<any> = [];
      ruleNums = rem.includes('|') ? rem.split(' | ') : [rem];
      ruleDict[key] = ruleNums;
    }
  }
  return ruleDict;
}

let resolvedRules = {};
function resolveRule(ruleNum: string, ruleDict: object, level: number): string {
  // -----debug ----
  let tabs = '';
  for (let i = 0; i < level; i++) {
    tabs += '    ';
  }
  // ---------------

  if (resolvedRules[ruleNum]) {
    console.log(tabs + `${ruleNum} already resolved: ${resolvedRules[ruleNum]}`);
    return resolvedRules[ruleNum];
  }

  let stringArr = [];
  let set = false;
  let num = parseInt(ruleNum, 10);
  if (num >= 0) {
    let nextEntry = ruleDict[ruleNum];
    console.log(tabs + `${ruleNum}: ${nextEntry}`);

    set = nextEntry.length > 1;
    for (let [i, entry] of nextEntry.entries()) {
      if (i > 0) stringArr.push('|');
      for (let n of entry.split(' ')) {
        let resolvedRule = resolveRule(n, ruleDict, level+1);
        stringArr.push(resolvedRule);
      }
    }

    let result = stringArr.join('').split('').filter(c => c !== '"').join('');
    if (set) result = '(' + result + ')';
    resolvedRules[ruleNum] = result;
    console.log(tabs + `${ruleNum} result: ${result}`);
    return result;
  } else {
    console.log(tabs + `string found: ${ruleNum}`);
    return ruleNum;
  }
}

function ruleToRegex(rule: string): RegExp {
  return RegExp('^' + rule + '$');
}

function countValidMessages(messages: Array<string>, re: RegExp): number {
  let count = 0;
  for (let m of messages) {
    if (re.test(m)) count++;
  }
  return count;
}

// main
const inputFile = '../inputs/19.txt';
const [rules, messages] = readInput(inputFile);
console.log('---------------------------------------------');
let ruleDict = parseRules(rules);

const rule0 = resolveRule('0', ruleDict, 0);
const re = ruleToRegex(rule0);
console.log(`19-1 answer: ${countValidMessages(messages, re)}`);
