// Day 11: Seating System
import { readStringList } from './lib/utils';

class SeatingSystem {
  seatLayout: Array<Array<string>>;

  static OCCUPIED = '#';
  static EMPTY = 'L';
  static FLOOR = '.';

  constructor(seatLayout: Array<Array<string>>) {
    this.seatLayout = seatLayout;
  }

  isSeat(x: number, y: number): boolean {
    return this.seatLayout[y] && (this.seatLayout[y][x] === SeatingSystem.EMPTY || this.seatLayout[y][x] === SeatingSystem.OCCUPIED);
  }

  isOccupied(x: number, y: number): boolean {
    return this.seatLayout[y] && this.seatLayout[y][x] === SeatingSystem.OCCUPIED;
  }

  countAdjacentOccupied(x: number, y: number): number {
    let count = 0;

    if (this.isOccupied(x-1, y-1)) count++;
    if (this.isOccupied(x, y-1))   count++;
    if (this.isOccupied(x+1, y-1)) count++;
    if (this.isOccupied(x-1, y))   count++;
    if (this.isOccupied(x+1, y))   count++;
    if (this.isOccupied(x-1, y+1)) count++;
    if (this.isOccupied(x, y+1))   count++;
    if (this.isOccupied(x+1, y+1)) count++;

    return count;
  }

  isDirectionOccupied(x: number, y: number, dir: string): boolean {
    let xStep = 0;
    let yStep = 0;

    switch (dir) {
      case 'N':
        yStep = -1;
        break;
      case 'NE':
        yStep = -1;
        xStep = 1;
        break;
      case 'E':
        xStep = 1;
        break;
      case 'SE':
        yStep = 1;
        xStep = 1;
        break;
      case 'S':
        yStep = 1;
        break;
      case 'SW':
        yStep = 1;
        xStep = -1;
        break;
      case 'W':
        xStep = -1;
        break;
      case 'NW':
        xStep = -1;
        yStep = -1;
        break;
      default:
        console.log(`Error: invalid direction "${dir}"`);
        return null;
    }

    let i = x + xStep;
    let j = y + yStep;

    while (j >= 0 && j < this.seatLayout.length && i >= 0 && i < this.seatLayout[j].length) {
      if (this.isSeat(i, j)) {
        if (this.isOccupied(i, j)) {
          return true;
        } else {
          return false;
        }
      }
      i += xStep;
      j += yStep;
    }
    return false;
  }

  countVisibleOccupied(x: number, y: number): number {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    let count = 0;
    for (let dir of directions) {
      if (this.isDirectionOccupied(x, y, dir)) {
        count++;
      }
    }

    return count;
  }

  countTotalOccupied(): number {
    let count = 0;
    for (let y = 0; y < this.seatLayout.length; y++) {
      for (let x = 0; x < this.seatLayout[y].length; x++) {
        if (this.isOccupied(x, y)) {
          count++;
        }
      }
    }

    return count;
  }

  willBeOccupied1(x: number, y: number): boolean {
    const status = this.seatLayout[y][x];

    if (status === SeatingSystem.FLOOR) {
      console.log(`Error! That's a floor.`);
      return null;
    }

    const numAdjacentOccupied = this.countAdjacentOccupied(x, y);

    if (status === SeatingSystem.EMPTY && numAdjacentOccupied === 0) {
      return true;
    } else if (status === SeatingSystem.OCCUPIED && numAdjacentOccupied >= 4) {
      return false;
    } else {
      return status === SeatingSystem.OCCUPIED;
    }
  }

  willBeOccupied2(x: number, y: number): boolean {
    const status = this.seatLayout[y][x];

    if (status === SeatingSystem.FLOOR) {
      console.log(`Error! That's a floor.`);
      return null;
    }

    const numVisibleOccupied = this.countVisibleOccupied(x, y);


    if (status === SeatingSystem.EMPTY && numVisibleOccupied === 0) {
      return true;
    } else if (status === SeatingSystem.OCCUPIED && numVisibleOccupied >= 5) {
      return false;
    } else {
      return status === SeatingSystem.OCCUPIED;
    }
  }

  findNextLayout1(): Array<Array<string>> {
    let nextLayout = JSON.parse(JSON.stringify(this.seatLayout));

    for (let y = 0; y < nextLayout.length; y++) {
      for (let x = 0; x < nextLayout[y].length; x++) {
        if (nextLayout[y][x] === SeatingSystem.FLOOR) {
          continue;
        }

        if (this.willBeOccupied1(x, y) === true) {
          nextLayout[y][x] = SeatingSystem.OCCUPIED;
        } else {
          nextLayout[y][x] = SeatingSystem.EMPTY;
        }
      }
    }

    return nextLayout;
  }

  findNextLayout2(): Array<Array<string>> {
    let nextLayout = JSON.parse(JSON.stringify(this.seatLayout));

    for (let y = 0; y < nextLayout.length; y++) {
      for (let x = 0; x < nextLayout[y].length; x++) {
        if (nextLayout[y][x] === SeatingSystem.FLOOR) {
          continue;
        }

        if (this.willBeOccupied2(x, y) === true) {
          nextLayout[y][x] = SeatingSystem.OCCUPIED;
        } else {
          nextLayout[y][x] = SeatingSystem.EMPTY;
        }
      }
    }

    return nextLayout;
  }

  equalsLayout(layout: Array<Array<string>>): boolean {
    for (let y = 0; y < this.seatLayout.length; y++) {
      for (let x = 0; x < this.seatLayout[y].length; x++) {
        if (this.seatLayout[y][x] !== layout[y][x]) {
          return false;
        }
      }
    }
    return true;
  }

  proceedUntilStableState1() {
    let ticks = 0;
    let proceed = true;
    while (proceed) {
      ticks++;
      const next = this.findNextLayout1();
      if (this.equalsLayout(next)) {
        proceed = false;
      } else {
        this.seatLayout = [...next];
      }
    }
  }

  proceedUntilStableState2() {
    let proceed = true;
    while (proceed) {
      const next = this.findNextLayout2();
      if (this.equalsLayout(next)) {
        proceed = false;
      } else {
        this.seatLayout = [...next];
      }
    }
  }
}

// main
const inputFile = '../inputs/11.txt';
const seatLayout = readStringList(inputFile).map(line => line.split(''));

const seatingSystem1 = new SeatingSystem(seatLayout);
seatingSystem1.proceedUntilStableState1();
const numOccupied1 = seatingSystem1.countTotalOccupied();
console.log(`11-1 answer: ${numOccupied1}`);

const seatingSystem2 = new SeatingSystem(seatLayout);
seatingSystem2.proceedUntilStableState2();
const numOccupied2 = seatingSystem2.countTotalOccupied();
console.log(`11-2 answer: ${numOccupied2}`);
