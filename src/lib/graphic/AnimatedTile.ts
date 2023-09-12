import { BaseTile } from "./BaseTile";


export class AnimatedTile extends BaseTile
{

    srcX:number;
    srcY:number;

    // frameCounter:number;

    animationStep: number;
    animationStepLimit:number;
    lastIndex:number;


    constructor( x:number, y:number, w:number, h:number, srcX:number, srcY:number, index:number, lastIndex:number )
    {
        super(x,y,w,h,index);
        this.srcX = srcX;
        this.srcY = srcY?srcY:0;
        this.animationStep=0;
        this.animationStepLimit=15;
        this.lastIndex=lastIndex;
    }



    render(ctx:CanvasRenderingContext2D, image:HTMLImageElement)
    {

        this.updateAnimation();

        ctx.drawImage
        (
            image,
            this.srcX, this.srcY, //srcX changes inside updateAnimation()
            this.w, this.h,
            Math.floor( this.x ), Math.floor( this.y ),
            this.w, this.h
        );


    }


    /**
     * at the moment, tile animation only goes FORWARD
     */
    updateAnimation()
    {
            this.animationStep ++;

        if( this.animationStep >= this.animationStepLimit )
        {
            this.animationStep = 0;

            this.srcX = this.index * this.w;
            this.index++;
            if( this.index > this.lastIndex )
            {
                this.index = 0;
            }
        }
    }

}//