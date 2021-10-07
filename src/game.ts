
// this file will load the first level of your game, if
// you want to change:
// 1 just import the first level and
// 2 create the level instance to load
// 3 run the game 


import {GameManager} from './lib/manager/GameManager.js';
import { SampleLevel } from './levels/SampleLevel.js';

//you can set canvas id as well as width and height
let game = GameManager.getInstance("canvas", 640, 480);//canvas width and height by default


// game.setFps(30); //changing fps of this game to 30
// game.setCalculateFps(); //allow fps calculation in console

//enabling mouse/touche control because some leves use those events
game.enableMouseControl=true;
game.enableTouchControl=true;
game.loadLevel( new SampleLevel() );

//use this to set new canvas scale
// game.scaleCanvas(2,2);
window.onload =function(){game.run();} 