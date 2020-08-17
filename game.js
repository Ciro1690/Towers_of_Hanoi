class Game {
    constructor() {
        this.towers = [[3, 2, 1], [], []];
    }

  promptMove(reader, callback) {
    this.print();
    reader.question("Where do you want to take the stacks from? ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Where do you want to move the stacks to? ", end => {
            const endTowerIdx = parseInt(end);
            callback(startTowerIdx,endTowerIdx);
        });
    });
  };

    isValidMove(startTowerIdx, endTowerIdx) {
        const startTower = this.towers[startTowerIdx];
        const endTower = this.towers[endTowerIdx];

        if (startTower.length === 0) {
            return false;
        } else if (endTower.length == 0) {
            return true;
        } else {
            const topStartDisc = startTower[startTower.length - 1];
            const topEndDisc = endTower[endTower.length - 1];
            return topStartDisc < topEndDisc;
        }
    }

  move(startTowerIdx, endTowerIdx) {
      if(this.isValidMove(startTowerIdx, endTowerIdx)) {
        let popped = this.towers[startTowerIdx].pop();  
        this.towers[endTowerIdx].push(popped);
        return true;
      } else {
          return false;
      }
  }

  print() {
    console.log(JSON.stringify(this.towers));
  }

  isWon() {
    console.log(this.towers[2])
      if ((this.towers[2].length === 3) || (this.towers[1].length === 3)) {
        return true;
    } else {
        return false;
    }
  }

  run(reader, gameCompletionCallback) {
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
        if(!this.move(startTowerIdx, endTowerIdx)) {
            console.log("Invalid move");
        }

        if(!this.isWon()) {
          this.run(reader, gameCompletionCallback);
        } else {
            this.print();
            console.log("You win");
            gameCompletionCallback();
          }
    });
  };
}

module.exports = Game;