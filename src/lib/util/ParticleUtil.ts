import { Point } from "../graphic/Point.js";
import { Sprite } from "../graphic/Sprite.js";


/**
 * pseudo particle class, STILL IN PROGRESS DO NOT USE!!
 */
export class ParticleUtil
{

    startPoint: Point;
    sprites:Sprite[];
    numberParticles:number;
    gravity:number;
    randSpacing:boolean;
    minAngle:number;//min val 0
    maxAngle:number;//max val 6.28 ( radians )
    minSize:number;
    maxSize:number;
    minXSpd:number;
    maxXSpd:number;
    minYSpd:number;
    maxYSpd:number;
    minScaleSpd:number;
    maxScaleSpd:number;
    minAlphaSpd:number;
    maxAlphaSpd:number;
    minRotSpd:number;
    maxRotSpd:number;

    constructor( initPoint:Point, sprites:Sprite[]){

        this.startPoint = initPoint;
        this.sprites=sprites;
        this.numberParticles=20;
        this.gravity=0.1;
        this.randSpacing=true;
        this.minAngle=0;
        this.maxAngle=6.28
        this.minSize=12;
        this.maxSize=24;
        this.minXSpd=2;
        this.maxXSpd=4;
        this.minYSpd=2;
        this.maxYSpd=4;
        this.minScaleSpd=0.005;
        this.maxScaleSpd=0.01;
        this.minAlphaSpd=0.005;
        this.maxAlphaSpd=0.01;
        this.minRotSpd=0.05;
        this.maxRotSpd=0.1;

    }


}