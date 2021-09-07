import { ImageMeasures } from "../../../lib/graphic/ImageMeasures.js";
import { Sprite } from "../../../lib/graphic/Sprite.js";


export class Enemy extends Sprite
{

    hp:number;

    constructor(image: HTMLImageElement, imgMeasures?:ImageMeasures)
    {
        super(image, imgMeasures);
        this.hp=10;
    }


}