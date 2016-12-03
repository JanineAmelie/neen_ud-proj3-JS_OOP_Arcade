**Udacity FrontEnd Nanodegree Proj 3**
Classic Arcade Game Clone
---

### Table of Contents
1. [Project Overview](#project-overview)
2. [Game Objectives](#game-objectives)
2. [Project Information](#project-information)
3. [Implementing Sprite Collisions](#implementing-the-collision-of-the-sprites)
7. [How to Run](#how-to-run)
9. [View Live](https://janinelourens.github.io/neen_ud-proj3-JS_OOP_Arcade/)

---

### Project-Overview

I was provided visual assets and a javaScript game loop engine. My task was to implement game functionality, add enemy entities and player charatcers to emulate an arcade frogger-like game.  I utilized Object Oriented Programming to structure my code and prototypal inheritance to create features.

---


### Game-Objectives

**Reach the other side's water blocks, without getting hit by the enemies before the timer runs out. **

---


### Project-Information

- **Features:**
  - HTML5 Canvas
  -  Game UI
  - Timed Games
  - Near "perfect" collision detection for the enemies
  - Reset and End State

- **Project Specifications:**
  - ✓  Player can not move off screen
  - ✓  Vehicles cross the screen
  - ✓  Vehicle-player collisions happen logically (not too early or too late)
  - ✓  Vehicle-player collision resets the game
  - ✓  Something happens when player wins

---

### Implementing-the-Collision-of-the-sprites
Implementing the collision detection for the sprites required a little bit more thought, as the provided assets have white space around them:

![white-space](https://www.dropbox.com/s/ycxm4kq1qds3vls/3_collision.jpg?raw=1)

####**Calculating the exact actual bounding box of the sprite with reference to its position on the HTML5 Canvas:**

![enter image description here](https://www.dropbox.com/s/vllmjpfqud0opko/3_explanationforSprite-collision.jpg?raw=1)

```javascript
   var a1 = player.x + (imageWidth - (charWidth + charSideSpace));
   var a2 = player.x + (imageWidth - charSideSpace);
   var b1 = player.y + (imageHeight - (charHeight + charBotSpace));
   var b2 = player.y + (imageHeight - charBotSpace);
```


#### ***So here is the workaround I created for the Enemy.prototype.collision:***
![Collison](https://www.dropbox.com/s/a3vziucds4wc9n6/4_perfect-collision-detection.jpg?raw=1)


```javascript
var xCond1 = x1 < a1 && x1 < a2 && x2 < a1 && x2 < a2;
var xCond2 = x1 > a1 && x1 > a2 && x2 > a1 && x2 > a2;
var yCond1 = y1 < b1 && y1 < b2 && y2 < b1 && y2 < b2;
var yCond2 =  y1 > b1 && y1 > b2 && y2 > b1 && y2 > b2;

if (!(xCond1 || xCond2 || yCond1 || yCond2) ) {
    collided = true;
    return collided;
}
```
---
### How-to-Run:

#### **Getting the project on your system (viewing offline):**

1. Clone, Fork or Download the ZIP file of this project into a folder on your local machine.
2. Make sure you are connected to the net.
3. Unzip the file using Winrar / 7zip etc.
4. Double click the index.html file and open with your favorite browser. (Preferably Chrome :stuck_out_tongue: )

#### **Testing Live:**
1. View the site live here: https://janinelourens.github.io/neen_ud-proj3-JS_OOP_Arcade/

