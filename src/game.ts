
// this file will load the first level of your game, if
// you want to change:
// 1 just import the first level and
// 2 create the level instance to load
// 3 run the game 


import {GameManager} from './lib/manager/GameManager.js';

// import { SampleLevel } from './levels/SampleLevel.js';
// import { MenuLevel } from './levels/MenuLevel.js';
import { SplashScreenLevel } from './levels/SplashScreenLevel.js';

//you can set canvas id as well as width and height
let game = GameManager.getInstance("canvas", 640, 480);//canvas width and height by default

// game.setFps(15); //changing fps of this game to 30
// game.setCalculateFps(); //allow fps calculation in console

//enabling mouse/touch control because some leves use those events
game.enableMouseControl=true;
game.enableTouchControl=true;

//use this to scale the game screen to windows size keeping aspect ratio
game.scaleToWindow();

// game.loadLevel( new MenuLevel() );
game.loadLevel( new SplashScreenLevel() );

window.onload =function(){game.run();} 
