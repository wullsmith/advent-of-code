import * as fs from 'fs';

const filename = '../inputs/1'
const lists = fs.readFileSync(filename, 'utf-8').split('\n\n');

console.log(lists);

let highestSum = 0;

// for (let list of lists) {
//   let items = list.split('\n').map(item => parseInt(item, 10));
//   console.log(items);
// }

