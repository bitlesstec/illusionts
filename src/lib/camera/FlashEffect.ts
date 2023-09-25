import { Point } from "../graphic/Point";
import { MathUtil } from "../util/MathUtil";
import { Camera } from "./Camera";



export class FlashEffect
{

    isFlashing:boolean;
    time:number; //this will count how much time has elapsed
    duration:number;//duration in seconds
    color:string;
    // prevPosition:Point;
    camera:Camera;
    alpha:number;
    

    constructor(cam:Camera)
    {

        this.camera=cam;
        this.time = 0;
        this.duration = 1;
        this.color="#FFF"; //white by default

    }

     /**
     * call this method to execute shake, but shake method should be called in Level.update()
     * @param makeShake 
     */
      activate( makeFlash:boolean )
      {
          this.isFlashing = makeFlash;
          this.alpha = 1;
      }


      updateFlash(deltaTime:number, duration:number=1, color:string="#FFF")
      {
          
        if( this.isFlashing )
        {
            console.log(`delta ${deltaTime} - duration ${duration}`)
            this.time += ( deltaTime );

            if(this.time >= duration)
            {
                this.isFlashing = false;
                this.time = 0;
            }
            this.alpha = this.time/duration;

        }

      }

    /**
     * this will only draw rect at filled color the time flashing is lasting
     * @param ctx 
     */
      render(ctx:CanvasRenderingContext2D)
      {

        if( this.isFlashing )
        {
            ctx.save();
            ctx.globalAlpha = this.alpha;
    
            ctx.fillStyle = this.color;
    
            ctx.fillRect( this.camera.viewX , this.camera.viewY, this.camera.viewWidth, this.camera.viewHeight );
    
            ctx.restore();
        }
        
      }


      /**
       * this method should be put in Level.update, this will execute camera shake with defined variables
       * @param amplitude how muy will move in pixels
       * @param duration number of steps will last by default 60
       */
    //   shake( amplitude:number=16, duration:number=60, frecuency:number=60 )//needs duration
    //   {
    //       if( this.isShaking )
    //       {
    //           // if(!this.isShaking)this.prevPosition =  new Point(this.x,this.y);
    //           // this.isShaking=true;
    //           this.shakeStepCounter++;
    //           this.durability++;
      
    //           console.log()
  
    //           this.camera.x =this.prevPosition.x; 
    //           this.camera.y =this.prevPosition.y; 
    //           console.log(" frecuency/60 :",frecuency/60)
    //           if(this.shakeStepCounter >= frecuency/60 )
    //           {
  
    //               this.camera.x += MathUtil.getRandomRangeInt( -amplitude, amplitude );
    //               this.camera.y += MathUtil.getRandomRangeInt( -amplitude, amplitude );
    //               this.shakeStepCounter=0;
    //           }
      
    //           if(this.durability >= duration)
    //           {
    //               this.isShaking=false;
    //               this.durability=0;
    //               this.camera.x = this.prevPosition.x; 
    //               this.camera.y = this.prevPosition.y;
    //               console.log("END of SHAKING")
    //           }
    //       }
  
          
  
    //   }
  

}