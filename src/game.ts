
// this file will load the first level of your game, if
// you want to change:
// 1 just import the first level and
// 2 create the level instance to load
// 3 run the game 


import {GameManager} from './lib/manager/GameManager.js';
import { SampleLevel } from './levels/SampleLevel.js';


//you can set canvas id as well as width and height
let game = GameManager.getInstance("canvas", 640, 360);

game.loadLevel( new SampleLevel() );

//use this to set new canvas scale
//game.scaleCanvas(2,2);
window.onload =function(){game.run();} 
