// Day 04: Giant Squid
import * as fs from 'fs';
import { colorizedPrint } from './lib/utils';

const filename = '../inputs/04';
const inputs = fs.readFileSync(filename, 'utf-8').split('\n\n').filter((s) => s !== '').map((s) => s.trim());

const numbers = inputs[0].split(',').map(n => parseInt(n));

const boards = inputs.slice(1)
  .map(board => board.split('\n')
  .map(row => row.split(' ').filter(c => c !== '').map(n => parseInt(n))));

// let marks = new Array(boards.length).fill(new Array(5).fill(new Array(5).fill(false)));
// let marks = Array.from({ length: boards.length }, () => Array.from({ length: 5 }, () => Array.from({ length: 5}, () => false)));
let markedBoards = [...new Array(boards.length)].map(() => [...new Array(5)].map(() => [...new Array(5)].map(() => false)));
let removed = new Array(boards.length).fill(false);

function checkNumber(i: number, num: number): boolean {
  const board = boards[i];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (board[y][x] === num) {
        markedBoards[i][y][x] = true;
        return true;
      }
    }
  }
  return false;
}

function checkWinner(i: number): [number, number] {
  const rowWinner = checkWinnerRows(i);
  if (rowWinner !== -1) {
    return [0, rowWinner];
  }

  const colWinner = checkWinnerCols(i);
  if (colWinner !== -1) {
    return [1, colWinner];
  }

  const diagWinner = checkWinnerDiagonals(i);
  if (diagWinner !== -1) {
    return [2, diagWinner];
  }

  return [-1, -1];
}

function checkWinnerRows(i: number): number {
  const board = markedBoards[i];
  for (let row = 0; row < 5; row++) {
    let allMarked = true;
    for (let col = 0; col < 5; col++) {
      if (!board[row][col]) {
        allMarked = false;
        break;
      }
    }
    if (allMarked) {
      console.log(`row ${row} win!`);
      return row;
    }
  }
  return -1;
}

function checkWinnerCols(i: number): number {
  const board = markedBoards[i];
  for (let col = 0; col < 5; col++) {
    let allMarked = true;
    for (let row = 0; row < 5; row++) {
      if (!board[row][col]) {
        allMarked = false;
        break;
      }
    }
    if (allMarked) {
      console.log(`column ${col} win!`);
      return col;
    }
  }
  return -1;
}

function checkWinnerDiagonals(i: number): number {
  const board = markedBoards[i];
  let allMarked = true;
  for (let i = 0; i < 5; i++) {
    if (!board[i][i]) {
      allMarked = false;
      break;
    }
  }
  if (allMarked) {
    console.log(`Diagonal 0 win!`);
    return 0;
  }


  allMarked = true;
  let x = 4;
  for (let y = 0; y < 5; y++) {
    if (!board[y][x]) {
      allMarked = false;
      break;
    }
    x--;
  }
  if (allMarked) {
    console.log(`Diagonal 1 win!`);
    return 1;
  }

  return -1;
}

function printBoard(i: number): void {
  const board = boards[i];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      process.stdout.write(`${board[y][x]} `);
    }
    console.log();
  }
}

function printMarkedBoard(i: number): void {
  const board = markedBoards[i];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const marked = board[y][x];
      const c = marked ? 'X ' : 'O ';
      const color = marked ? 91 : 99;
      colorizedPrint(c, color);
    }
    console.log();
  }
}

// sum unmarked numbers
function sumBoard(i: number): number {
  const board = boards[i];
  const marked = markedBoards[i];
  let sum = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (!marked[y][x]) {
        sum += board[y][x];
      }
    }
  }
  return sum;
}

// main
function main(): void {
  let winnersFound = 0;
  for (const num of numbers) {
    console.log(`NUMBER: ${num}`);
    for (let i = 0; i < boards.length; i++) {
      if (removed[i]) continue;
      if (checkNumber(i, num)) {
        const [winType, index] = checkWinner(i);
        if (winType !== -1) {
          console.log(`Board ${i} wins!`);
          printBoard(i);
          printMarkedBoard(i);
          console.log();
          winnersFound++;

          if (winnersFound === 1) {
            const solution1 = sumBoard(i) * num;
            console.log(`4-1: ${solution1}`);
          }

          if (winnersFound === boards.length) {
            console.log('last winner!');
            const solution2 = sumBoard(i) * num;
            console.log(`4-2: ${solution2}`);
            return;
          }

          removed[i] = true;
        }
      }
    }
  }
}

main();
