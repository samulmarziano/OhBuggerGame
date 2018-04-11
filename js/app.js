// Enemies our player must avoid
let Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
      this.x = this.x + this.speed * dt;
    } else {
      this.x = -2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
// || PLAYER CLASS ||
let Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
};

Player.prototype.update = function(dt) {

  let character = this;

  // Move left, except if already on left edge
  if (this.pressedKey === 'left' && this.x > 0) {
    this.x -= 100;
  }

  // Move right, except if already on right edge
  if (this.pressedKey === 'right' && this.x < 400) {
    this.x += 100;
  }

  // Move up
  if (this.pressedKey === 'up' && this.y > 0) {
    this.y -= 90;
  }

  // Move down
  if (this.pressedKey === 'down' && this.y < 400) {
    this.y += 90;
  }

  // Restricts character movement to a single jump
  this.pressedKey = null;

  // Player reaches water and game resets
  if (this.y < 0) {
    success();
    this.reset();
  }

  allEnemies.forEach(function(enemy) {
    // Reset if character is caught by enemy
    if (character.x >= enemy.x - 25 && character.x <= enemy.x + 25) {
      if (character.y >= enemy.y - 25 && character.y <= enemy.y + 25) {
        character.reset();
        killed();
      }
    }
  });
};

// Reset function
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput() method
Player.prototype.handleInput = function(e) {
  this.pressedKey = e;
};

// Now instantiate your objects.
let allEnemies = [];

// Place the player object in a variable called player
let player = new Player();

(function displayEnemies() {
  allEnemies.push(new Enemy(0, 50));
  allEnemies.push(new Enemy(0, 140));
  allEnemies.push(new Enemy(0, 230));
}());

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

// Success message
function success() {
  let html = '<span>You did it! Congratulations!!</span>';
  $('#message').html(html);
  $('#message').css('display', 'block');

  setTimeout(function() {
    $('#message').css('display', 'none');
  },2000);
}

// Killed message
function killed() {
  let html = '<span>You were eaten. Lets try that again!</span>';
  $('#message').html(html);
  $('#message').css('display', 'block');

  setTimeout(function() {
    $('#message').css('display', 'none');
  },1000);
}
