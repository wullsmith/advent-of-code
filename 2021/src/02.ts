// Day 2: Dive!
import { readStringList } from './lib/utils';

const commands = readStringList('../inputs/02').map(cmd => cmd.split(' '));

// 2-1
let horizontalPos = 0;
let depth = 0;

for (const command of commands) {
  const cmd = command[0];
  const n = parseInt(command[1]);

  switch (cmd) {
    case 'forward':
      horizontalPos += n;
      break;
    case 'up':
      depth -= n;
      break;
    case 'down':
      depth += n;
      break;
  }
}

const solution1 = horizontalPos * depth;
console.log(`2-1: ${solution1}`);

// 2-2
let aim = 0;
horizontalPos = 0;
depth = 0;

for (const command of commands) {
  const cmd = command[0];
  const n = parseInt(command[1]);

  switch (cmd) {
    case 'forward':
      horizontalPos += n;
      depth += (aim * n);
      break;
    case 'up':
      aim -= n;
      break;
    case 'down':
      aim += n;
      break;
  }
}

const solution2 = horizontalPos * depth;
console.log(`2-2: ${solution2}`);
