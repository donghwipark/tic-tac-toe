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

const main = async (playerName) => {
  console.log(`Welcome ${playerName} lets start the game with our Computer!\n`);

  // Vairables
  let players = setPlayers(playerName);
  let currentPlayer = playerName;
  let count = 0;

  // Inner functions
  const switchPlayerAfterAction = (playerName) => {
    count++;
    printBoard(board);
    currentPlayer = currentPlayer === 'computer' ? playerName : 'computer';
    rl.setPrompt("Computer's turn!");
    rl.prompt();
  };

  printBoard(board);
  // First prompt
  rl.setPrompt(`Current player: ${currentPlayer}\nInput your position\n`);
  rl.prompt();

  rl.on('line', (input) => {
    console.log('Current player: ', currentPlayer, count);
    if (input === 'end') {
      console.log('End the game');
      rl.close();
      return;
    }

    if (validateLocationInput(board, input)) {
      // Player's input
      board[input.toUpperCase()] = players[currentPlayer];
      switchPlayerAfterAction(playerName);

      // Computer's input
      let location = computerChooseRandomLocation(board);
      board[location] = players[currentPlayer];

      // Switch to Player and repeat
      switchPlayerAfterAction(playerName);
      rl.setPrompt(`Current player: ${currentPlayer}\nInput your position\n`);
      rl.prompt();
    } else {
      printBoard(board);
      console.log('Input string is already filled or wrong! Try again:\n');
    }
  });
};

/**
 * Helpers Functions
 */
const printBoard = (board) => {
  console.log(`
    ${board.X1} | ${board.Y1} | ${board.Z1}
    ___|____|___
       |    |  
    ${board.X2} | ${board.Y2} | ${board.Z2}
    ___|____|___
       |    |  
    ${board.X3} | ${board.Y3} | ${board.Z3}
  `);
};

const validateLocationInput = (board, input) => board[input.toUpperCase()] === input.toUpperCase();

const setPlayers = (playerName) => {
  const playerObj = { computer: ' X' };
  playerObj[playerName] = ' O';
  return playerObj;
};

const computerChooseRandomLocation = (board) => {
  const availableLocations = Object.keys(board).filter((key) => board[key] === board[board[key]]);
  // return Random available location
  return availableLocations[Math.floor(Math.random() * availableLocations.length)];
};
