import { AnimationLoop } from "./AnimationLoop";
import { BaseTile } from "./BaseTile";
import { Tile } from "./Tile";


/**
 * 
 */
export class AnimatedTile extends BaseTile
{

    srcX:number;
    srcY:number;

    // frameCounter:number;

    animationStep: number;
    animationStepLimit:number;
    lastIndex:number;
    animationLoop:AnimationLoop;
    animationFrames:Tile[];
    enable:boolean;

    animationIndex: number; //index position of animationFrames


    constructor( animationFrames:Tile[] = [] )
    {
        super( 0, 0, 0, 0, animationFrames.length > 0 ? animationFrames[0].index : 0 );
        this.srcX = 0;
        this.srcY = 0;
        this.animationStep=0;
        this.animationStepLimit=15;
        this.lastIndex = animationFrames.length === 0 ? 0: animationFrames.length-1;
        this.animationLoop = AnimationLoop.FORWARD;
        this.enable = true;
        this.animationIndex = 0;
    }



    render(ctx:CanvasRenderingContext2D, image:HTMLImageElement)
    {

        this.updateAnimation();

        const tile =  this.animationFrames[ this.animationIndex ]
        ctx.drawImage
        (
            image,
            tile.srcX, tile.srcY, //srcX changes inside updateAnimation()
            tile.w, tile.h,
            Math.floor( tile.x ), Math.floor( tile.y ),
            tile.w, tile.h
        );


    }


    /**
     * at the moment, tile animation only goes FORWARD
     */
    updateAnimation()
    {
        if( !this.enable || this.animationFrames.length === 0 ) return;

            this.animationStep ++;
        
        if( this.animationStep >= this.animationStepLimit )
        {
            this.animationStep = 0;

            switch(this.animationLoop)
            {
                case AnimationLoop.FORWARD:
                
                this.animationIndex++;
                if (this.animationIndex >= this.animationFrames.length) 
                {
                    this.animationIndex = 0; 
                }
                    
                    break;
                
                    case AnimationLoop.BACKWARD:
                        this.animationIndex--;
                        if (this.animationIndex < 0) 
                        {
                            this.animationIndex = this.animationFrames.length - 1;
                        }
                    break;

            }//switch


        }//

        

        // if( this.animationStep >= this.animationStepLimit )
        // {
        //     this.animationStep = 0;

        //     this.srcX = this.index * this.w;
        //     this.index++;
        //     if( this.index > this.lastIndex )
        //     {
        //         this.index = 0;
        //     }
        // }
    }

}//