

import {Point} from "./point.js";

import {Positionable} from "../ntfc/positionable.js";

import { Renderable } from "../ntfc/renderable.js";
import { Colorizable } from "../ntfc/colorizable.js";


/**
 * this class will display a background on related
 * x & y position, this class can be also used as a tile instead 
 * background...
 * by default X & Y position is 0,0
 */
export class Background extends Point
             implements Positionable, Renderable, Colorizable
{

    w:number;
    h:number;
    color:string;
    image: HTMLImageElement;
    visible: boolean;


    // constructor()
    // {
    // super();
    // }

    constructor( image: HTMLImageElement )
    {
        super();
        this.image = new Image( );
        this.image =image;
        this.visible = false;
        this.image.onload = () =>
        {
        //console.log("image loaded");
        this.w = this.image.width;
        this.h = this.image.height;
        this.visible = true;
        }
        
        this.color = "#000000"; //black by default
    }   

    setPosition( x:number, y:number ):void
    {
        this.x = x;
        this.y = y;
    }

    /**
     * this method will render the image at X & Y point, basically
     * is backgroundImage
     * @param ctx 
     */
    render( ctx: CanvasRenderingContext2D ):void
    {
        ctx.drawImage( this.image, this.x, this.y, this.w, this.h );
    }

    /**
     * this method will render a rectanle from X & Y of W & H size, of the stablished
     * color
     * @param
     */
    renderColor( ctx: CanvasRenderingContext2D ):void
    {
        ctx.fillStyle = this.color;
        ctx.fillRect( this.x, this.y, this.w, this.h );
    }


}