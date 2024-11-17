import { Config } from "../cfg/Config";
import { Sprite } from "../graphic/Sprite";
import { Camera } from "./Camera";


/**
 * this class contains invisible margis
 * to know how to move camera in X or y Axis depending
 * of player/sprite movement
 * @todo i need to create more settings for different camera movements
 */
export class Margin
{


    /**
     * 
     * @todo add bounds on margins
     */
     private marginLeft:number;
     private marginRight:number;
     private marginTop:number;
     private marginBottom:number;
     camera:Camera;
     color:string;

     //if sprite is set, camera will follow sprite with
     //defined margins
     sprite:Sprite;


     constructor( camera:Camera ){
        this.marginLeft=-1;
        this.marginRight=-1;
        this.marginTop=-1;
        this.marginBottom=-1;
        this.camera = camera;
        this.color="#FFF";
     }
     

     //MARGINS WILL HELP TO SET BOUNDARIES WHERE THE PLAYER
    //CAN PASS TO MOVE THE CAMERA OR TO MAKE THE CAMERA FOLLOW
    //THE PLAYER

    /**
     * set margins for Y axis
     * @param top 
     * @param bottom 
     */
    setTopBottomMargin(top:number, bottom:number)
    {
        this.marginTop=top;
        this.marginBottom=bottom;
    }

    /**
     * set margins for X axis
     * @param left 
     * @param right 
     */
    setLeftRightMargin(left:number, right:number)
    {
        this.marginLeft=left;
        this.marginRight=right;
    }

    /**
     * set all margins for current camera where can be used to lock the camera
     * to follow a sprite/player
     * @param top 
     * @param bottom 
     * @param left 
     * @param right 
     */
    setMargins(top:number, bottom:number, left:number, right:number)
    {
        this.setTopBottomMargin(top,bottom);
        this.setLeftRightMargin(left,right);
    }
    

    /**
     * this method will lock camera to a certain sprite
     * once this is set, camera will start following sprite object
     * with defined margins
     * @param sprite 
     */
    lockTo(sprite:Sprite)
    {
        this.sprite = sprite;

        const marginWidth = Math.ceil( this.camera.viewWidth/3 );
        // this.marginLeft = marginWidth;
        // this.marginRight = marginWidth*2;
        this.setLeftRightMargin( marginWidth, marginWidth*2 );

        const marginHeigth = Math.ceil( this.camera.viewHeight/3 );
        console.log("marginHeigth:",marginHeigth)
        // this.marginTop = marginHeigth;
        // this.marginBottom = marginHeigth*2; 
        this.setTopBottomMargin( marginHeigth, marginHeigth*2);
    }


   /**
     * this function must be used in update method.
     * this will check the player agains top, bottom, right or left margin if set ( if they are different -1)
     * will return the side of the margin checked,
     * moveIt means if the camera will move at spd defined, if not, means
     * you would have to implement your owm camera movement depending on the edge
     */
   checkMargins(spd:number, moveIt:boolean=true):string
   {
       let side:string = "";
       //check is sprite is set to move camera on sprite margins
       
      side += this.checkXMargin( spd, moveIt );
      side += this.checkYMargin( spd, moveIt )

       return side;
   }

   checkYMargin(spd:number, moveIt:boolean=true):string
   {
       let side:string = "";
       if(this.sprite)
       {
           //cehck y margins
           if( this.sprite.getY()+8 < this.camera.viewY+this.marginTop && this.marginTop !== -1 ){
               if(moveIt)
                   this.camera.moveY( -spd );
               side = Config.SIDE_TOP;
           }

           if( this.sprite.getY()+8 > this.camera.viewY+this.marginBottom && this.marginBottom !== -1){
               if(moveIt)
                   this.camera.moveY( spd );
               side = Config.SIDE_BOTTOM;
           } 
       }
       return side;
   }
   

   checkXMargin(spd:number, moveIt:boolean=true):string
   {
       let side:string = "";
       if(this.sprite)
       {
           //check x margins
           if( this.sprite.getX()+8 < this.camera.viewX+this.marginLeft && this.marginLeft !== -1 )
           {
               if(moveIt)
                   this.camera.moveX( -spd );
               side = Config.SIDE_LEFT;
           }

           if( this.sprite.getX()+8 > this.camera.viewX+this.marginRight && this.marginRight !== -1)
           {   if(moveIt) 
                   this.camera.moveX( spd );
               side = Config.SIDE_RIGHT;
           }
       }
       return side;
       
   }
    
    /**
     * this will render the margins at the posision set but only if margins
     * are diferent than 0
     * @param ctx 
     */
    render(ctx:CanvasRenderingContext2D)
    {

        ctx.strokeStyle=this.color;
        ctx.beginPath();

        if( this.marginTop )
        {
            ctx.moveTo( Math.floor( this.camera.viewX ), Math.ceil( this.camera.viewY + this.marginTop ) );
            ctx.lineTo( Math.floor( this.camera.viewX + this.camera.viewWidth ) , Math.ceil( this.camera.viewY + this.marginTop ) );
            
        }

        if( this.marginBottom )
        {
            ctx.moveTo( Math.floor( this.camera.viewX ), Math.ceil( this.camera.viewY + this.marginBottom ) );
            ctx.lineTo( Math.floor( this.camera.viewX + this.camera.viewWidth ) , Math.ceil( this.camera.viewY + this.marginBottom ) );
        }

        if( this.marginLeft )
        {
            ctx.moveTo( this.camera.viewX + this.marginLeft, 0);
            ctx.lineTo( this.camera.viewX + this.marginLeft,this.camera.viewHeight);
        }

        if( this.marginRight )
        {
            ctx.moveTo( this.camera.viewX + this.marginRight, 0);
            ctx.lineTo( this.camera.viewX + this.marginRight,this.camera.viewHeight);
        }

        ctx.closePath();
        ctx.stroke();

    }
    


}