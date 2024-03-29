// Day 05: Hydrothermal Venture
import { readStringList } from './lib/utils';

const filename = '../inputs/05'
const input = readStringList(filename);
const coordinates = input.map(line => line.split(' -> '));

const size = 1000;

let grid: Array<Array<number>> = [...new Array(size)].map(() => [...new Array(size)].map(() => 0));
const part2 = true;

function fillGridLine(x1: number, y1: number, x2: number, y2: number) {
  if (x1 === x2) {
    // vertical line
    const [start, end] = [y1, y2].sort((a, b) => a - b);
    for (let y = start; y <= end; y++) {
      grid[y][x1]++;
    }
  } else if (y1 === y2) {
    // horizontal line
    const [start, end] = [x1, x2].sort((a, b) => a - b);
    for (let x = start; x <= end; x++) {
      grid[y1][x]++;
    }
  } else if (part2) {
    const diffX = Math.abs(x1 - x2);
    const diffY = Math.abs(y1 - y2);
    if (diffX === diffY) {
      // diagonal line
      const incX = x1 < x2 ? 1 : -1;
      const incY = y1 < y2 ? 1 : -1;
      const dist = Math.abs(y1 - y2);
      let steps = 0;
      let x = x1;
      let y = y1;
      while (steps <= dist) {
        grid[y][x]++;
        x += incX;
        y += incY;
        steps++;
      }
    }
  }
}


function main() {
  // populate grid
  for (let pair of coordinates) {
    let [x1, y1] = pair[0].split(',').map(n => parseInt(n));
    let [x2, y2] = pair[1].split(',').map(n => parseInt(n));

    fillGridLine(x1, y1, x2, y2);
  }

  // count intersection points
  let numX = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] >= 2) {
        numX++;
      }
    }
  }

  console.log(`5-${part2 ? '2' : '1'}: ${numX} overlap points`);
}

main();
