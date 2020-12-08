// Day 3: Toboggan Trajectory
import { readStringList } from './lib/utils';

function countTrees(grid: Array<string>, slopeX: number, slopeY: number): number {
  const height = grid.length;
  const width = grid[0].length;
  let x = 0;
  let y = 0;
  let numTrees = 0;

  while(y < height) {
    if (grid[y][x] === '#') {
      numTrees++;
    }

    y += slopeY;
    x = (x + slopeX) % width;
  }

  return numTrees;
}

// main
const inputFile = __dirname + '../inputs/03.txt';
const grid = readStringList(inputFile);
const numTrees1 = countTrees(grid, 3, 1);

console.log(`3-1 answer: ${numTrees1}`);

const product2 =
  countTrees(grid, 1, 1) *
  countTrees(grid, 3, 1) *
  countTrees(grid, 5, 1) *
  countTrees(grid, 7, 1) *
  countTrees(grid, 1, 2);

console.log(`3-2 answer: ${product2}`);