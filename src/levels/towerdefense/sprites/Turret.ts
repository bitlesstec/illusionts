import { ImageMeasures } from "../../../lib/graphic/ImageMeasures.js";
import { Sprite } from "../../../lib/graphic/Sprite.js";
import { Timer } from "../../../lib/time/Timer.js";
import { SpriteUtil } from "../../../lib/util/SpriteUtil.js";

export class Turret extends Sprite
{

    canshoot:boolean
    shootTask:Timer;


    constructor(image: HTMLImageElement, imgMeasures?:ImageMeasures)
    {
        super(image, imgMeasures);
        this.canshoot=true;
        this.shootTask = new Timer();
    }

    updateTurret(delta: number, bullets:Sprite[]): void 
    {

        let enemy = SpriteUtil.getSpritesByLabel("enemy")[0];
        this.shootTask.process(()=>
        {
            //if task completer then can shoot again
            this.canshoot = true;
        });


        if(this.visible &&  SpriteUtil.spritesDistance(this,enemy ) <= 150 && enemy.visible){
            //enemye in range, shooting!!
           this.angle = SpriteUtil.getAngle(this,enemy.getX()+16, enemy.getY()+16 );

           for( let bul of bullets)
           {
               if( !bul.visible && this.canshoot )
               {
                   let bulletSpd=4;
                console.log("bullet visible");
                   bul.visible=true;
                   bul.setPosition( this.getX()+16, this.getY()+16);
                   SpriteUtil.moveToAngle(bul, this.angle, bulletSpd);
                   this.canshoot=false;
                   this.shootTask.setCounter(100);
                   break;
               }
           }

        }




    }


}