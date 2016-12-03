// TODO: Create superclass called 'Entity', that has the method:
// Render() {ctx.drawImage(Resources.get(this.sprite), this.x, this.y)}
// Player and Enemy are subclasses of this.

// Enemies our player must avoid
var Enemy = function(howfast, rownum) {
    this.x = (4 * 101);
    //Switch to handle which row the enemy should spawn.
    switch (rownum) {
        case 1:
            this.y = 60;
            break;
        case 2:
            this.y = 140;
            break;
        case 3:
            this.y = 220;
            break;
    }
    this.sprite = 'images/enemy-bug.png'; //spriteloader helper
    this.speed = howfast;
};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Modulo resets to 0 when x = a multiple of n
    // In this case n = 505 or 5*(width of the cell)
    var stepSize = (this.speed * dt);
    this.x = (this.x + stepSize) % 505;

    //the following ends the game
    if (this.collision() === true) {
        endGame(); //defined in engine.js
        player.resetPos();
        //console.log("collision")//debug for collision detection
        //restartMSG defined in engine.js is a function that creates UI
        restartMSG("Oop! Enemy collision! Game Over", "Start a new game?");
    }
};

Enemy.prototype.collision = function() {
    //ei --> enemyIndex
    //by default collided is set to false nothing is colliding yet.
    var collided = false;

    //Constantly loops through all the enemies to the check for collisions
    for (var ei = 0; ei < allEnemies.length; ei++) {
        var enem = allEnemies[ei];

//We need to compute the actual bounding box
//of the character sprite for proper collision
//because the enemy and player image sprite
//in the images folder has white space around it.
//see my visual explanation of this problem at this link:
//https://www.dropbox.com/s/vllmjpfqud0opko/3_explanationforSprite-collision.jpg?raw=1

        var imageHeight = 171;
        var imageWidth = 101;

        //enemy actual width = 101px same as imagewidth
        var enemyHeight = 65;
        var enemyBotSpace = 28;

         /* Enemy bounding box computation */
        var x1 = enem.x;
        var x2 = enem.x + imageWidth;
        var y1 = enem.y + (imageHeight - (enemyHeight + enemyBotSpace));
        var y2 = enem.y + (imageHeight - enemyBotSpace);

        //Player Sprite Measurements based
        //on the actual image
        var charHeight = 75;
        var charWidth = 66;
        //charSideSpace is the whitespace transparency
        //around the character in the image file
        var charSideSpace = 18;
        var charBotSpace = 32;

        /* Actual Player bounding box computation
        see my visual explanation image above*/
        var a1 = player.x + (imageWidth - (charWidth + charSideSpace));
        var a2 = player.x + (imageWidth - charSideSpace);
        var b1 = player.y + (imageHeight - (charHeight + charBotSpace));
        var b2 = player.y + (imageHeight - charBotSpace);

        //conditions where it doesn't collide
        //see this image for my visual explanation of the ff code:
        //https://www.dropbox.com/s/a3vziucds4wc9n6/4_perfect-collision-detection.jpg?raw=0
        //basically there is no collision if the player's sprite's bounding box,
        //does not overlap the enemy's bounding box.
        var xCond1 = x1 < a1 && x1 < a2 && x2 < a1 && x2 < a2;
        var xCond2 = x1 > a1 && x1 > a2 && x2 > a1 && x2 > a2;
        var yCond1 = y1 < b1 && y1 < b2 && y2 < b1 && y2 < b2;
        var yCond2 =  y1 > b1 && y1 > b2 && y2 > b1 && y2 > b2;

        //This if statement checks if any of the these conditions are met
        //I want to end the function on the first detection of collision.
        //needs to fail all of these 4 conditions for collided to be true.
        if (!(xCond1 || xCond2 || yCond1 || yCond2) ) {
            //There isn't a point to checking for the rest of the enemies
            //if there is a single collision
            //If it returns earlier it stops, it goes back
            //repeats the loop and collided remains false.
            collided = true;
            return collided;
        }
    }
    return collided;
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class constructor
var Player = function() {
    //starting coordinates
    this.x = 202;
    this.y = 390;

    this.stepX = 101; //stepsize along X
    this.stepY = 83; //stepsize along Y

    //current sprite
    this.sprite = 'images/char-boy.png';
};


//Used for debugging current position of the player
Player.prototype.displayPos = function() {
    console.log("player x: " + this.x + " player y: " + this.y);
};

//Function that returns a boolean value to determine if the player can move.
Player.prototype.canMove = function(direction) {
    var leftStep = this.x - this.stepX;
    var rightStep = this.x + this.stepX;
    var upStep = this.y - this.stepY;
    var downStep = this.y + this.stepY;

    //the numbers are the coordinates of the extreme most bounds
    switch (direction) {
        case 'left':
            if (leftStep < 2) {
                return false;
            } else {
                return true;
            }
              break;

        case 'up':
            if (upStep < -10) {
                return false;
            } else {
                return true;
            }
                        break;

        case 'right':
            if (rightStep > 402) {
                return false;
            } else {
                return true;
            }
                break;

        case 'down':
            if (downStep > 390) {
                return false;
            } else {
                return true;
            }
          break;
    }
};

//move function that takes in a parameter direction from
//Player.prototype.update method, only when canMove is true
Player.prototype.move = function(direction) {
    switch (direction) {
        case 'left':
            this.x = this.x - this.stepX;
            break;

        case 'up':
            this.y = this.y - this.stepY;
            break;
        case 'right':
            this.x = this.x + this.stepX;
            break;
        case 'down':
            this.y = this.y + this.stepY;
            break;
    }
};

//called by the handleInputfunction
Player.prototype.update = function(direction) {
    //checks if the player can move first
    //i.e. the player is not out of bounds etc
    //before the
    if (this.canMove(direction) === true) {
        this.move(direction); //moves the player
        this.waterContact(); //check if the player hit water (for end state)
        //this.displayPos(); //debug function that logs coords.
    }
};

//renders the player sprite
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handles the input called from the keyup event listener
Player.prototype.handleInput = function(keyinput) {
    //console.log(keyinput); //for debugging
    this.update(keyinput);
};

//coordinates where the player should be placed when this method is called
Player.prototype.resetPos = function() {
    this.x = 202;
    this.y = 390;
};

//function to determine if the player has hit water
Player.prototype.waterContact = function() {
    var waterTiles = [2, 102, 202, 302, 402, 502];

    //loops through the water tiles array
    //checking if the position of the player is on the water tile
    for (var i = 0; i < waterTiles.length; i++) {
        if (this.x == waterTiles[i] && this.y == -10) {
            console.log("Stepped on water");
            endGame();
            restartMSG("Congratulations! You win!", "Start a new game?");
        } else {
            /* */
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

//adding new enemy types to the allEnemies array
allEnemies.push(new Enemy(200, 1), new Enemy(100, 2), new Enemy(150, 3));

// This listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    if (timerStarted === true) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
