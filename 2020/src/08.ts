// Day 8: Handheld Halting

import { readStringList } from "./lib/utils";

const PROGRAM_END = 0;
const PROGRAM_LOOP = 1;

class BootLoader {
  instructions: Array<string>;
  accumulator: number;
  ip: number;
  read: object;

  constructor(instructions: Array<string>) {
    this.instructions = instructions;
    this.accumulator = 0;
    this.ip = 0;
    this.read = {}
  }

  acc(x) {
    this.accumulator += x;
  }

  jmp(x) {
    this.ip += x;
  }

  next() {
    this.ip = (this.ip + 1) % this.instructions.length;
  }

  readInstruction(instructionLine: string) {
    const instruction = instructionLine.split(' ');
    const op = instruction[0];
    const arg = parseInt(instruction[1]);

    // console.log(`${this.ip}:\t${op}\t${arg}\t${this.accumulator}`);

    switch (op) {
      case 'acc':
        this.acc(arg);
        this.next();
        break;
      case 'jmp':
        this.jmp(arg);
        break;
      default:
        this.next();
    }
  }

  start() {
    while (this.ip < this.instructions.length) {
      if (this.read[this.ip]) {
        if (this.read[this.ip] === 1) {
          console.log(`Program loops infinitely. acc: ${this.accumulator}`);
          return PROGRAM_LOOP;
        } else {
          this.read[this.ip]++;
        }
      } else {
        this.read[this.ip] = 1;
      }

      const line = this.instructions[this.ip];
      this.readInstruction(line);
    }

    console.log(`Program complete. acc: ${this.accumulator}`);
    return PROGRAM_END;
  }
}

function repairProgram(instructionLines: Array<string>) {
  let result = PROGRAM_LOOP;
  let modifiedInstructions = [...instructionLines]
  let modifyLine = 0;

  while (result !== PROGRAM_END && modifyLine < modifiedInstructions.length) {
    let curLine = modifiedInstructions[modifyLine];
    let [op, rem] = curLine.split(' ');
    if (op === 'nop') {
      modifiedInstructions[modifyLine] = curLine.replace('nop', 'jmp');
    } else if (op === 'jmp') {
      modifiedInstructions[modifyLine] = curLine.replace('jmp', 'nop');
    } else {
      modifyLine++;
      continue;
    }

    const bootLoader = new BootLoader(modifiedInstructions);
    result = bootLoader.start();

    modifiedInstructions = [...instructionLines];
    modifyLine++;
  }
}

// main
const inputFile = '../inputs/08.txt';
const instructionLines = readStringList(inputFile);
const bootLoader = new BootLoader(instructionLines);

// part 1
bootLoader.start();

// part 2
repairProgram(instructionLines);
