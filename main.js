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

/**
 * Starting of command line receiving player's name
 */
rl.question('Please input your name to start Tic Tac Toe\n', (name) => main(name));

/**
 * Main function
 */
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
  };

  printBoard(board);
  // First prompt
  rl.setPrompt(`Current player: ${currentPlayer}\nInput your position: `);
  rl.prompt();

  rl.on('line', async (input) => {
    if (input === 'exit') {
      console.log(`End the game, Bye ${playerName}!`);
      rl.close();
    } else {
      if (validateLocationInput(board, input)) {
        // Player's input
        board[input.toUpperCase()] = players[currentPlayer];
        switchPlayerAfterAction(playerName);

        if (!checkGameFinished(board, count, playerName)) {
          // Computer's choice
          console.log("Computer's turn\n");
          let location = computerChooseRandomLocation(board);
          board[location] = players[currentPlayer];

          if (!checkGameFinished(board, count, playerName)) {
            // Switch to Player and repeat
            switchPlayerAfterAction(playerName);
            rl.setPrompt(`It is your turn ${currentPlayer} ( O )!\nPlease input your position\n`);
            rl.prompt();
          } else {
            rl.close();
          }
        } else {
          rl.close();
        }
      } else {
        printBoard(board);
        console.log('Input string is already filled or wrong! Try again:\n');
      }
    }
  });
};

/**
 * Helper Functions
 */
const printBoard = (board) => {
  console.log(`
    ${board.X1} | ${board.Y1} | ${board.Z1}
    ___|____|___
       |    |  
    ${board.X2} | ${board.Y2} | ${board.Z2}
    ___|____|___
       |    |  
    ${board.X3} | ${board.Y3} | ${board.Z3}\n
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

const checkGameFinished = (board, count, playerName) => {
  if (count === 9) {
    console.log('You and computer tied OTL, Please try again!');
    return true;
  } else {
    const winningPattern = [
      // Vertical
      ['X1', 'X2', 'X3'],
      ['Y1', 'Y2', 'Y3'],
      ['Z1', 'Z2', 'Z3'],
      // Horizontal
      ['X1', 'Y1', 'Z1'],
      ['X2', 'Y2', 'Z2'],
      ['X3', 'Y3', 'Z3'],
      // Diagonal
      ['X1', 'Y2', 'Z3'],
      ['X3', 'Y2', 'Z1'],
    ];

    let winner = '';
    const result = winningPattern.filter((triad) => {
      if (board[triad[0]] === board[triad[1]] && board[triad[1]] === board[triad[2]]) {
        winner = board[triad[0]] === ' X' ? 'computer' : playerName;
        return true;
      } else {
        return false;
      }
    }).length;

    // Return result finsh, tie, not finished
    if (result) {
      if (winner === 'computer') {
        printBoard(board);
      }
      console.log('The Winner of Tic Tac Toe is ' + winner + '!');
      return true;
    } else {
      return false;
    }
  }
};
