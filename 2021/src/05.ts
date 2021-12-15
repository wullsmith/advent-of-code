// Day 05: Hydrothermal Venture
import { readStringList } from './lib/utils';

const input = readStringList('../inputs/05');
const coordinates = input.map(line => line.split(' -> '));

let grid: Array<Array<number>> = [...new Array(1000)].map(() => [...new Array(1000)].map(() => 0));

function fillGridLine(x1: number, y1: number, x2: number, y2: number) {
  if (x1 === x2) {
    // vertical line
    const [start, end] = [y1, y2].sort();
    for (let y = start; y <= end; y++) {
      grid[y][x1]++;
    }
  } else if (y1 === y2) {
    // horizontal line
    const [start, end] = [x1, x2].sort();
    for (let x = start; x <= end; x++) {
      grid[y1][x]++;
    }
  }
}


function main() {
  // populate grid
  for (let pair of coordinates) {
    //console.log(`pair: ${pair}`);
    let [x1, y1] = pair[0].split(',').map(n => parseInt(n));
    let [x2, y2] = pair[1].split(',').map(n => parseInt(n));
    //console.log(`parsed: (${x1},${y1}) -> (${x2},${y2})`);

    if (x1 === x2 || y1 === y2) {
      fillGridLine(x1, y1, x2, y2);
    }
  }

  // count intersection points
  let numX = 0;
  for (let y = 0; y < 1000; y++) {
    for (let x = 0; x < 1000; x++) {
      //console.log(`(${x},${y})`);
      if (grid[y][x] >= 2) numX++;
    }
  }
  console.log(`5-1: ${numX} overlap points`);
}

main();
