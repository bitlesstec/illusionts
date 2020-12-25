import { GameManager } from './lib/manager/GameManager.js';
import { MenuLevel } from './levels/menulevel.js';
// @TODO below code must be in a separate class maybe a game.js class that will be added to the html
//set the game instance, load the first level and start the game
let game = GameManager.getInstance();
//
// game.loadLevel( new TestLevel() );
game.loadLevel(new MenuLevel());
window.onload = function () { game.run(); };
// se puede usar el windows onload aqui antes de ejecutar todo
