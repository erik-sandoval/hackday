//Parent object for sprites
class Populate {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.sprite = "";
    this.sideways = 101;
    this.upDown = 83;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset() {
    this.x = 0;
    this.y = 415;
  }
}

//Player class
class Player extends Populate {
  constructor() {
    super();
    this.numLives = 0;
    this.score = 0;
    this.x = 0;
    this.y = 415;
    this.sprite = "images/char-boy.png";
  }

  //key input for Player
  handleInput(input) {
    console.log(input);
    switch (input) {
      case "left":
        if (this.x >= this.sideways) {
          this.x -= this.sideways;
        }
        break;
      case "a":
        if (this.x >= this.sideways) {
          this.x -= this.sideways;
        }
        break;
      case "d":
        if (this.x <= this.sideways * 3) {
          this.x += this.sideways;
        }
        break;
      case "right":
        if (this.x <= this.sideways * 3) {
          this.x += this.sideways;
        }
        break;
      case "up":
        if (this.y >= 83) {
          this.y -= this.upDown;
        }
        break;
      case "w":
        if (this.y >= 83) {
          this.y -= this.upDown;
        }
        break;
      case "down":
        if (this.y <= this.upDown * 4) {
          this.y += this.upDown;
        }
        break;
      case "s":
        if (this.y <= this.upDown * 4) {
          this.y += this.upDown;
        }
        break;
    }
  }

  //updates player and sets condition for collision & win
  update() {
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.sideways / 2 > this.x && enemy.x < this.x + this.sideways / 2)) {
        this.numLives--;
        this.reset();
      }
    }
    if (this.numLives <= 0) {
      this.numLives = 3;
      this.score = 0;
      this.reset();
    }
    if (this.y <= 1) {
      this.score++;
    }
  }
}

const player = new Player();

sprite = document.getElementsByClassName("sprite");

console.log(sprite);

spriteArr = Array.from(sprite);

spriteArr.forEach(element => {
  element.addEventListener("click", function() {
    let id = element.getAttribute("id");
    player.sprite = `images/${id}.png`;
    player.reset();
  });
});

//Array to hold Enemy objects
const allEnemies = [];

//Enemy class
class Enemy extends Populate {
  constructor(x, y, speed) {
    super();
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
    this.enemySprite = this.sprite;
  }

  //Smooth movement of Enemy objects across gameboard
  update(dt) {
    if (this.x < this.sideways * 5) {
      this.x += this.speed * dt;
    } else {
      this.x = -100;
    }
  }
}

const enemy1 = new Enemy(101, 83, 150);
const enemy2 = new Enemy(404, 166, 350);
const enemy3 = new Enemy(0, 249, 375);
const enemy4 = new Enemy(0, 83, 100);

allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    87: "w",
    65: "a",
    83: "s",
    68: "d",
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
