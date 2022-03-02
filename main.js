const { printBoard, validateLocationInput } = require('./helper');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = {
  X1: 'X1',
  X2: 'X2',
  X3: 'X3',
  Y1: 'Y1',
  Y2: 'Y2',
  Y3: 'Y3',
  Z1: 'Z1',
  Z2: 'Z2',
  Z3: 'Z3',
};

// Start with players input name
rl.question('Please input your name to start Tic Tac Toe\n', (name) => main(name));

const main = (playerName) => {
  console.log(`Welcome ${playerName} lets start the game with our Computer!\n`);
  printBoard(board);
  rl.setPrompt('Input your position\n');
  rl.prompt();
  rl.on('line', (input) => {
    if (input === 'end') {
      console.log('End the game');
      rl.close();
    }

    if (validateLocationInput(board, input)) {
      board[input.toUpperCase()] = ' O';
      printBoard(board);
      console.log('Input string is already filled or wrong! Try again:');
    } else {
      printBoard(board);
      console.log('Input string is already filled or wrong! Try again:');
    }
  });
};
