const fs = require('fs');
const { runIntcode } = require('./intcode');

// ----------------------------------------------------------------------------

const intcode = fs.readFileSync(process.argv[2], 'utf-8').split(',').map(s => parseInt(s, 10));
const DEBUG = process.argv.includes('-d');
const input = parseInt(process.argv[3], 10);

let res = runIntcode(intcode, [input]);
fs.writeFileSync('9.log', res.program.toString().split(',').join('\n'));