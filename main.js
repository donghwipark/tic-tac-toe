const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Please input your name to start Tic Tac Toe game with Computer!\n', (input) => console.log(input));
