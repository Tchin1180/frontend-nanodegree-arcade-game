// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.step =101;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};

//creating three different bugs and various location and speed (x location, y location, speed)
const bugs = new Enemy(-101,50, 50);
const bugss = new Enemy(-101, 133, 200);
const bugsss = new Enemy(0, 216, 100);
const allEnemies = [];
allEnemies.push(bugs, bugss, bugsss);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < this.step * 5 ) {
      this.x += this.speed * dt;
    } else {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.step = 101; //defining the x moving parameters
    this.jump = 83; //defining the y moving parameters
    this.startingX = this.step * 2;
    this.startingY = (this.jump * 4) + 50;
    this.x = this.startingX;
    this.y = this.startingY;
    this.won = false;
  }
  //update players position if it hits a bug
  update() {
    //check collission on the x-axis first, and check that it is touching and overlapping the enemy y-axis as well; if yes, resetboard
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
          this.resetBoard();
        }
    }
      if(this.y === -33) {
        //player reaches the edge of the last tile (before the water) without colliding = Game won!
        this.y -= 20;
        this.won = true;
        toggleModal();
      }

  }

  //render the player to the board using the drawImage from engine.js
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //uses the keyboard to handle movement of player and restrict them from moving outside of board
   handleInput(input) {
    switch(input) {
      case 'up':
        if(this.y > this.jump/2) {
          this.y -=this.jump;
        }
        break;
      case 'down':
        if(this.y < this.jump * 4) {
          this.y +=this.jump;
        }
        break;
      case 'left':
        if(this.x > 0) {
        this.x -=this.step;
      }
        break;
      case 'right':
        if(this.x < this.step * 4) {
        this.x +=this.step;
      }
        break;
    }
  }

    resetBoard() {
      //if a collision happens between player and enemy, restart the board
      this.x = this.startingX;
      this.y = this.startingY;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//trigger modal if game is won
function toggleModal() {
  let modal = document.querySelector('.modal_body');
  let modalOverlay = document.querySelector('.modal-overlay');
  modal.classList.toggle('hide');
  modalOverlay.classList.toggle ('hide');
}

//user clicks on the replay button: close out modal and restart game
document.querySelector('.modal_replay').addEventListener('click', replayGame);

function replayGame() {
  toggleModal();
  resetPlayer();
}

function resetPlayer() {
  player.x = player.startingX;
  player.y = player.startingY;
}
