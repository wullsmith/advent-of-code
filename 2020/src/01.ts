// Day 1: Report Repair
import { readIntList } from './lib/utils';

class Expenses {
  private expenses: Array<number>;
  private expensesObj: object;

  constructor(expenses: Array<number>) {
    this.expenses = expenses;
    this.expensesObj = Object.assign({}, ...expenses.map((e) => ({ [e]: 1 }))) 
  }

  findAddends2(targetSum: number): [number, number] {
    for (let e of expenses) {
      const diff = targetSum - e;

      if (this.expensesObj[diff]) {
        return [e, diff];
      }
    }

    // not found
    return [-1, -1];
  }

  findAddends3(targetSum: number): [number, number, number] {
    for (let e of this.expenses) {
      const targetSum2 = targetSum - e;
      const [a, b] = this.findAddends2(targetSum2);

      if (a !== -1 && b !== -1) {
        return [e, a, b];
      }
    }

    // not found
    return [-1,-1,-1];
  }
}

// main
const targetSum = 2020;
const inputFile = '../inputs/01.txt';
const expenses = readIntList(inputFile);
const expenseCalculator = new Expenses(expenses); 

const [a1, a2] = expenseCalculator.findAddends2(targetSum);
const product1 = a1 * a2;
console.log(`1-1 answer: ${a1}*${a2} = ${product1}`);

const [b1, b2, b3] = expenseCalculator.findAddends3(targetSum);
const product2 = b1 * b2 * b3;
console.log(`1-2 answer: ${b1}*${b2}*${b3} = ${product2}`);
