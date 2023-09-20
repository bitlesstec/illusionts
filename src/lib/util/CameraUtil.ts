
import { Camera } from "../camera/Camera";


/**
 * this class will provide the camera with some specific functionality
 * that can be used in all levels 
 */
export class CameraUtil  //Moveable
{

    canXMove:number = 0;
    canYMove:number = 0;
    cam:Camera;

    constructor( cam:Camera )
    {
        this.cam = cam;
    }


    moveOnX( camSpd:number, move:number=1 ): number 
    {
        this.canXMove += camSpd;
        if( this.canXMove >= 1 )
        {
            this.canXMove = 0;
            this.cam.moveX( move ) ;
            return move;
        }
        return 0;
    }
    

    moveOnY( camSpd:number, move:number=1): number 
    {
        this.canYMove += camSpd;
        if( this.canYMove >= 1 )
        {
            this.canYMove = 0;
            this.cam.moveY( move ) ;
            return move;
        }
        return 0;
    }

}