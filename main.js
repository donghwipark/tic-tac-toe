const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Start with players input name
rl.question('Please input your name to start Tic Tac Toe\n', (name) => game(name));

const game = (playerName) => {
  console.log(`Welcome ${playerName} lets start the game with our Computer!\n`);
  rl.setPrompt('Input your position \n');
  rl.prompt();

  rl.on('line', (input) => {
    if (input === 'end') {
      console.log('End the game');
      rl.close();
    } else {
      console.log('\nPlease input your position to keep the game\n');
    }
  });
};
