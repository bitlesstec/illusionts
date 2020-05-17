/**
 * this class contains the menu of the diferent levels where i show
 * how this framework works, this menu is also a level with the only purpose
 * to select the desired working level
 */
import { BaseLevel } from "../../src/com/bitless/level/baselevel.js";
import { GameManager } from "../../src/com/bitless/manager/gamemanager.js";
import { TestLevel } from "./testLevel.js";
import { TileLevel } from "./tilelevel.js";
import { RotateLevel } from "./rotatelevel.js";
import { DemoSpriteLevel } from "./demospritelevel.js";
import { CollisionLevel } from "./collisionlevel.js";
// import { AssetLoadable } from "../../src/com/bitless/ntfc/assetLoadable.js";
export class MenuLevel extends BaseLevel {
    constructor() {
        super(640, 480);
        this.levelSelector = 1;
        this.maxSelector = 5;
    } //
    update(delta) {
    } //
    render(ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.levelWidth, this.levelHeight);
        ctx.fillStyle = "#FFF";
        //draw arc
        ctx.beginPath();
        ctx.arc(20, this.levelSelector * 20, 3, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        ctx.fillText("TEST LEVEL1", 40, 24);
        ctx.fillText("TILE LEVEL", 40, 48);
        ctx.fillText("ROTATION LEVEL", 40, 68);
        ctx.fillText("SPRITES LEVEL", 40, 88);
        ctx.fillText("COLLISION LEVEL", 40, 108);
    } //
    /**
     * events for key down, to select desired option from menu
     * @param event
     */
    keyDown(event) {
        // this.ev = event.key + event.keyCode;
        // console.log(event);
        switch (event.keyCode) {
            case 87: //W
            case 28: //arrowUP
                this.levelSelector -= 1;
                if (this.levelSelector <= 1) {
                    this.levelSelector = 1;
                }
                break;
            case 83: //S
            case 40: //arrowDown
                this.levelSelector += 1;
                if (this.levelSelector >= this.maxSelector) {
                    this.levelSelector = this.maxSelector;
                }
                break;
            case 13: //enter
                //goto desired level
                console.log("loading new level!!! " + this.levelSelector);
                switch (this.levelSelector) {
                    case 1:
                        GameManager.getInstance().loadLevel(new TestLevel());
                        break;
                    case 2:
                        GameManager.getInstance().loadLevel(new TileLevel());
                        break;
                    case 3:
                        GameManager.getInstance().loadLevel(new RotateLevel());
                        break;
                    case 4:
                        GameManager.getInstance().loadLevel(new DemoSpriteLevel());
                        break;
                    case 5:
                        GameManager.getInstance().loadLevel(new CollisionLevel());
                        break;
                }
                break;
        } //
    }
} //
