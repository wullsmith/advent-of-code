import * as fs from 'fs';
import { sumArray } from './lib/utils';

const filename = '../inputs/1';

function main() {
  const lists = fs.readFileSync(filename, 'utf-8').split('\n\n');

  let highestSum = 0;
  let top3 = [0, 0, 0];

  for (let list of lists) {
    let items = list.split('\n').map(item => parseInt(item, 10));
    const sum = sumArray(items);

    if (sum > highestSum) {
      highestSum = sum;
    }

    if (sum > top3[0]) {
      top3[0] = sum;
      top3.sort((a, b) => a - b);
    }
  }

  const top3sum = sumArray(top3);

  console.log(`1-1: ${highestSum}`);
  console.log(`1-2: ${top3sum}`);
}

main();


