const Game = require('./game.js');

const readline = require('readline');

const reader = readline.createInterface({
    // it's okay if this part is magic; it just says that we want to
    // 1. output the prompt to the standard output (console)
    // 2. read input from the standard input (again, console)

    input: process.stdin,
    output: process.stdout
});


let g = new Game();
g.run(reader, completion);

function completion() {
    reader.question("Play again? y or n: ", restartGame => {
      if (restartGame === 'y') {
        g = new Game();
        g.run(reader, completion);
      } else {
        reader.close();
        }
    })
};
