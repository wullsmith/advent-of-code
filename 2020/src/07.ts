// Day 7: Handy Haversacks
import { count } from 'console';
import { readStringList } from './lib/utils';

function parseRules(ruleStrings: Array<string>): object {
  let rules = {};

  for (let rule of ruleStrings) {
    let [keyColor, rem] = rule.split(' bags contain ');
    let insideBags = rem.split(', ').map((s) => {
      return s.split(' ').filter((s) => !/bags?\.?/.test(s)).join(' ');
    });

    rules[keyColor] = {};

    for (let bag of insideBags) {
      let num = parseInt(bag[0]);

      if (Number.isNaN(num)) {
        rules[keyColor] = {};
        continue;
      }

      let color = bag.slice(2);
      rules[keyColor][color] = num;
    }
  }

  return rules;
}

function canContainColor(outsideColor: string, insideColor: string, rules: object): boolean {
  const colorsContained = Object.keys(rules[outsideColor]);
  if (colorsContained.includes(insideColor)) {
    return true;
  } else {
    for (let color of colorsContained) {
      if (canContainColor(color, insideColor, rules)) {
        return true;
      }
    }
  }

  return false;
}

function countContainingColors(insideColor: string, rules: object): number {
  let count = 0;

  for (let color in rules) {
    if (canContainColor(color, insideColor, rules)) {
      count++;
    }
  }

  return count;
}

function countTotalBagsContained(outsideColor: string, rules: object): number {
  const colorsObj = rules[outsideColor];
  const colorsContained = Object.keys(colorsObj);

  if (colorsContained.length === 0) {
    return 0;
  }

  let sum = 0;
  for (let color of colorsContained) {
    const numBags = colorsObj[color];
    sum += numBags + numBags*countTotalBagsContained(color, rules);
  }

  return sum;
}



// main
const inputFile = '../inputs/07.txt';
const rulesRaw = readStringList(inputFile);
const rules = parseRules(rulesRaw);

console.log(`7-1 answer: ${countContainingColors('shiny gold', rules)}`);
console.log(`7-2 answer: ${countTotalBagsContained('shiny gold', rules)}`);
