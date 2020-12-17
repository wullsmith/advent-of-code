// Day 14: Docking Data
import { readStringList, padZeroes } from './lib/utils';

class DockingProgram {
  instructions: Array<string>;
  bitmask: string;
  mem: object;

  constructor(instructions: Array<string>) {
    this.instructions = instructions;
    this.mem = {};
  }

  generateAddresses(bitmask: string): Array<string> {
    let bitmaskArr = bitmask.split('');
    let newBitmaskArr = [...bitmaskArr];

    let newBitmasks = bitmaskArr.includes('X') ? [] : [ bitmask ];

    for (let [i, bit] of bitmaskArr.entries()) {
      if (bit === 'X') {
        for (let digit of ['0', '1']) {
          newBitmaskArr[i] = digit;
          for (let bitmask of this.generateAddresses(newBitmaskArr.join(''))) {
            newBitmasks.push(bitmask);
          }
        }
        break;
      }
    }

    return newBitmasks;
  }

  applyBitmask1(val: number, bitmask: string): number {
    let curVal = (val >>> 0).toString(2);
    curVal = padZeroes(curVal, 36);

    let curValArr = curVal.split('');

    for (let [i, bit] of bitmask.split('').entries()) {
      if (bit === 'X') {
        continue;
      } else if (bit === '0' || bit === '1') {
        curValArr[i] = bit;
      }
    }

    return parseInt(curValArr.join(''), 2);
  }

  applyBitmask2(val: number, bitmask: string): string {
    let curVal = (val >>> 0).toString(2);
    curVal = padZeroes(curVal, 36);

    let curValArr = curVal.split('');

    for (let [i, bit] of bitmask.split('').entries()) {
      if (bit === '1' || bit === 'X') {
        curValArr[i] = bit;
      }
    }

    return curValArr.join('');
  }

  executeInstruction1(instruction: string) {
    const [op, val] = instruction.split(' = ');
    if (instruction[1] === 'a') {
      // mask
      this.bitmask = val;
    } else if (instruction[1] === 'e') {
      // mem
      let addr = op.match(/\d+/g)[0];
      this.mem[addr] = this.applyBitmask1(parseInt(val), this.bitmask);
    }
  }

  executeInstruction2(instruction: string) {
    const [op, val] = instruction.split(' = ');
    if (instruction[1] === 'a') {
      // mask
      this.bitmask = val;
    } else if (instruction[1] === 'e') {
      // mem
      let address0 = parseInt(op.match(/\d+/g)[0]);
      let newAddress = this.applyBitmask2(address0, this.bitmask);
      let addresses = this.generateAddresses(newAddress).map(s => parseInt(s, 2));

      for (let address of addresses) {
        this.mem[address] = parseInt(val, 10);
      }
    }
  }

  executeAllInstructions1() {
    for (let instruction of this.instructions) {
      this.executeInstruction1(instruction);
    }
  }

  executeAllInstructions2() {
    for (let instruction of this.instructions) {
      this.executeInstruction2(instruction);
    }
  }

  sumMemory(): number {
    let sum = 0;
    for (let addr in this.mem) {
      sum += this.mem[addr];
    }
    return sum;
  }
}

// main
const inputFile = '../inputs/14.txt';
const instructions = readStringList(inputFile);

const dockingProgram1 = new DockingProgram(instructions);
dockingProgram1.executeAllInstructions1();
console.log(`14-1 answer: ${dockingProgram1.sumMemory()}`);

const dockingProgram2 = new DockingProgram(instructions);
dockingProgram2.executeAllInstructions2();
console.log(`14-2 answer: ${dockingProgram2.sumMemory()}`);
