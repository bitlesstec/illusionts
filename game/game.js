// this file will load the first level of your game, if
// you want to change:
// 1 just import the first level and
// 2 create the level instance to load
// 3 run the game 
import { GameManager } from './lib/manager/GameManager.js';
import { SampleLevel } from './levels/SampleLevel.js';
let game = GameManager.getInstance();
game.loadLevel(new SampleLevel());
window.onload = function () { game.run(); };
