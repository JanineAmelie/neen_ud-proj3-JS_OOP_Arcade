// Enemies our player must avoid
var Enemy = function(howfast, rownum) {

    this.x = (4 * 101);

    switch (rownum) {
        case 1:
            this.y = 60;
            break;
        case 2:
            this.y = 140;
            break;
        case 3:
            this.y = 220;
            break
    }
    this.sprite = 'images/enemy-bug.png'; //spriteloader helper
    this.speed = howfast;
};

Enemy.prototype.Yrow = function(yvaluenum) {
        var currentRow;

        if (yvaluenum > 60 && yvaluenum < 140) {
            currentRow = 1;
            return currentRow;

        } else if (yvaluenum > 140 && yvaluenum < 220) {
            currentRow = 2;
            return currentRow;

        } else if (yvaluenum > 220 && yvaluenum < 310) {
            currentRow = 3;
            return currentRow;
        }
    }
    // Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Modulo resets to 0 when x = a multiple of n
    // In this case n = 505 or 5*(width of the cell)
    var stepSize = (this.speed * dt);
    this.x = (this.x + stepSize) % 505;

    if (this.collision() == true) {
    //endGame();
    //player.resetPos();
    console.log("collision")
    //restartMSG("Oop! Enemy collision! Game Over", "Start a new game?")

    }

};

Enemy.prototype.collision = function() {
    //ei --> enemyIndex
    var collided;
    for (var ei = 0; ei < allEnemies.length; ei++) {

        var enem = allEnemies[ei];
        //Enemy variables
        var x1 = enem.x;
        var x2 = enem.x + 101;
        var y1 = enem.y;
        var y2 = enem.y + 40;

        //player variables
        var a1 = player.x;
        var a2 = player.x + 101;
        var b1 = player.y;
        var b2 = player.y + 80;

        //X VALUES
        if       (x1 < a1 && x1 < a2 && x2 < a1 && x2 < a2) {
            collided = false;
        }else if (x1 > a1 && x1 > a2 && x2 > a1 && x2 > a2) {
            collided = false;

        //Y Values
        }else if (y1 < b1 && y1 < b2 && y2 < b1 && y2 < b2) {
            collided = false;
        }else if (y1 > b1 && y1 > b2 && y2 > b1 && y2 > b2) {
            collided = false;

        //Otherwise there is collision
        }else {
            collided = true;
        }
    }
    return collided;
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.x = 202;
    this.y = 390;
    this.stepX = 100; //stepsize along X
    this.stepY = 80; //stepsize along Y
    this.sprite = 'images/char-stan.png';
};

Player.prototype.Yrow = function(yvaluenum) {
    var currentRow;

    if (yvaluenum > 60 && yvaluenum < 140) {
        currentRow = 1;
        return currentRow;

    } else if (yvaluenum > 140 && yvaluenum < 220) {
        currentRow = 2;
        return currentRow;

    } else if (yvaluenum > 220 && yvaluenum < 310) {
        currentRow = 3;
        return currentRow;
    }
}

Player.prototype.displayPos = function() {
    console.log("player x: " + player.x + " player y: " + player.y);
};

//Function that returns a boolean value to determine if the player can move.
Player.prototype.canMove = function(direction) {
    var leftStep = this.x - this.stepX;
    var rightStep = this.x + this.stepX;
    var upStep = this.y - this.stepY;
    var downStep = this.y + this.stepY;

    switch (direction) {
        case 'left':
            if (leftStep < 2) {
                return false
            } else {
                return true
            }

        case 'up':
            if (upStep < -10) {
                return false
            } else {
                return true
            }

        case 'right':
            if (rightStep > 402) {
                return false
            } else {
                return true
            }
        case 'down':
            if (downStep > 390) {
                return false
            } else {
                return true
            }
    }
};

Player.prototype.move = function(direction) {
    switch (direction) {
        case 'left':
            this.x = this.x - this.stepX;
            break
        case 'up':
            this.y = this.y - this.stepY;
            break
        case 'right':
            this.x = this.x + this.stepX;
            break
        case 'down':
            this.y = this.y + this.stepY;
            break
    }
}

Player.prototype.update = function(direction) {
    if (this.canMove(direction) === true) {
        this.move(direction);
        this.waterContact();
        this.displayPos();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyinput) {
    console.log(keyinput);
    this.update(keyinput);

};

Player.prototype.resetPos = function() {
    this.x = 202;
    this.y = 390;
}


Player.prototype.waterContact = function() {
    var waterTiles = [2, 102, 202, 302, 402, 502];

    for (var i = 0; i < waterTiles.length; i++) {
        if (this.x == waterTiles[i] && this.y == -10) {
            console.log("Stepped on water");
            endGame();
            restartMSG("Congratulations! You win!", "Start a new game?")
        } else {
            /* */
        }
    };
}

/*TODO: ARRAY of 15 spaces for the items/collectibles to spawn in. random generated spot */
actionArea = [
    //from the bottom
    //row 1
    //x   //y
    [2, 230], //0
    [102, 230], // 1
    [202, 230], // 2
    [302, 230], // 3
    [402, 230], // 4
    //row 2
    [2, 150], // 5
    [102, 150], // 6
    [202, 150], // 7
    [302, 150], // 8
    [402, 150], // 9
    //row 3
    [2, 70], //  10
    [102, 70], //  11
    [202, 70], //  12
    [302, 70], //  13
    [402, 70] //  14
]

// if  the player's entire occupied space coordinates:
// if this.x

//[range: this.x to (this.x + width of sprite)  and this.y to (this.y + height of sprite ]  <- calculated at update method.
//falls anywhere between the enemy's occupied space:
// [range: this.x to (this.x + width of sprite)  and this.y to (this.y + height of sprite] <- calculated at upate method.
//collision will occur.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

allEnemies.push(new Enemy(200, 1), new Enemy(100, 2), new Enemy(150, 3))

// This listens for key presses and sends the keys to your Player.handleInput() method.

document.addEventListener('keyup', function(e) {
    if (timerStarted == true) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    }
});
