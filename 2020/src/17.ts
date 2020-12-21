// Day 17: Conway's Cubes
import { readStringList } from './lib/utils';
import * as fs from 'fs';

function readInput(inputFile: string): Array<Array<Array<string>>> {
  return [fs.readFileSync(inputFile, 'utf-8').split('\n').map(s => s.split(''))];
}

function copy3DArray(arr: Array<Array<Array<string>>>): Array<Array<Array<string>>> {
  let newArr = [];
  for (let z = 0; z < arr.length; z++) {
    newArr[z] = [];
    for (let y = 0; y < arr[z].length; y++) {
      newArr[z][y] = [];
      for (let x = 0; x < arr[z][y].length; x++) {
        newArr[z][y][x] = arr[z][y][x];
      }
    }
  }
  return newArr;
}

function print3DArray(arr: Array<Array<Array<string>>>) {
  for (let z = 0; z < arr.length; z++) {
    console.log(`z = ${z}`);
    for (let y = 0; y < arr[z].length; y++) {
      console.log(arr[z][y].join(''));
    }
    console.log();
  }
}

class LifeGrid {
  grid: Array<Array<Array<string>>>;

  static ACTIVE = '#';
  static INACTIVE = '.';

  static ADJACENTS = [
    [0,0,1],
    [0,0,-1],
    [0,1,0],
    [0,-1,0],
    [0,1,1],
    [0,1,-1],
    [0,-1,1],
    [0,-1,-1],
    [1,0,0],
    [-1,0,0],
    [1,0,1],
    [1,0,-1],
    [-1,0,1],
    [-1,0,-1],
    [1,1,0],
    [1,-1,0],
    [-1,1,0],
    [-1,-1,0],
    [1,1,1],
    [1,1,-1],
    [1,-1,1],
    [1,-1,-1],
    [-1,1,1],
    [-1,1,-1],
    [-1,-1,1],
    [-1,-1,-1]
  ]

  constructor(grid: Array<Array<Array<string>>>) {
    this.grid = grid;
  }

  getCubeStatus(x: number, y: number, z: number): string {
    if (!this.grid[z] || !this.grid[z][y]) {
      return LifeGrid.INACTIVE;
    }

    return this.grid[z][y][x] || LifeGrid.INACTIVE;
  }

  setCubeStatus(x: number, y: number, z: number, status: string) {
    if (!this.grid[z]) this.grid[z] = [];
    if (!this.grid[z][y]) this.grid[z][y] = [];
    this.grid[z][y][x] = status;
  }

  isActive(x: number, y: number, z: number): boolean {
    return this.getCubeStatus(x, y, z) === LifeGrid.ACTIVE;
  }

  countAdjacentActiveCubes(x: number, y: number, z: number): number {
    let count = 0;
    for (let coords of LifeGrid.ADJACENTS) {
      if (this.getCubeStatus(x+coords[0], y+coords[1], z+coords[2]) === LifeGrid.ACTIVE) {
        count++;
      }
    }
    return count;
  }

  countTotalActiveCubes() {
    let count = 0;
    for (let z = 0; z < this.grid.length; z++) {
      for (let y = 0; y < this.grid[z].length; y++) {
        for (let x = 0; x < this.grid[z][y].length; x++) {
          if (this.isActive(x,y,z)) {
            count++;
          }
        }
      }
    }
    return count;
  }

  expand() {
    let zLength = this.grid.length;
    let yLength = this.grid[0].length;
    let xLength = this.grid[0][0].length;

    let newGrid = [];
    for (let z = 0; z <= zLength + 1; z++) {
      if (!newGrid[z]) newGrid[z] = [];
      for (let y = 0; y <= yLength + 1; y++) {
        if (!newGrid[z][y]) newGrid[z][y] = [];
        for (let x = 0; x <= xLength + 1; x++) {
          if ((x - 1 < 0 || x > xLength) ||
              (y - 1 < 0 || y > yLength) ||
              (z - 1 < 0 || z > zLength)) {
            newGrid[z][y][x] = LifeGrid.INACTIVE;
          } else {
            newGrid[z][y][x] = this.grid[z-1][y-1][x-1];
          }
        }
      }
    }
    this.grid = newGrid;
  }

  expandBy(n: number) {
    for (let i = 0; i < n; i++) {
      this.expand();
    }
  }

  advance() {
    let edgeActive = false;
    let gridCopy = new LifeGrid(copy3DArray(this.grid));
    for (let z = 0; z < this.grid.length; z++) {
      for (let y = 0; y < this.grid[z].length; y++) {
        for (let x = 0; x < this.grid[z][y].length; x++) {
          const nAdj = gridCopy.countAdjacentActiveCubes(x,y,z);
          if (gridCopy.isActive(x,y,z)) {
            if ((x === 0 || x === this.grid[z][y].length) ||
                (y === 0 || y === this.grid[z].length)    ||
                (z === 0 || z === this.grid.length))
                  edgeActive = true;

            if (nAdj === 2 || nAdj === 3) {
              continue;
            } else {
              this.setCubeStatus(x, y, z, LifeGrid.INACTIVE);
            }
          } else {
            if (nAdj === 3) {
              this.setCubeStatus(x, y, z, LifeGrid.ACTIVE);
            }
          }
        }
      }
    }
    if (edgeActive) {
      this.expandBy(10);
    }
  }

  run(cycles: number) {
    for (let cycle = 0; cycle < cycles; cycle++) {
      this.advance();
    }
  }

  print() {
    print3DArray(this.grid);
  }
}

// main
const inputFile = '../inputs/17.txt';
const grid = readInput(inputFile);

let lifeGrid = new LifeGrid(grid);
lifeGrid.expandBy(10);

lifeGrid.run(6);
console.log(`17-1 answer: ${lifeGrid.countTotalActiveCubes()}`);
