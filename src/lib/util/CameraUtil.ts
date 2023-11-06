
import { Camera } from "../camera/Camera";


/**
 * this class will provide the camera with some specific functionality
 * that can be used in all levels 
 */
export class CameraUtil  //Moveable
{

    canRightMove:number = 0;
    canTopMove:number = 0;
    canLeftMove:number = 0;
    canBottomMove:number = 0;
    cam:Camera;

    constructor( cam:Camera )
    {
        this.cam = cam;
    }


    moveRight( camSpd:number, move:number = 1 ): number 
    {
        this.canRightMove += camSpd;
        if( this.canRightMove >= 1 )
        {
            this.canRightMove = 0;
            this.cam.moveX( move ) ;
            return move;
        }
        return 0;
    }
    

    moveTop( camSpd:number, move:number=1): number 
    {
        this.canTopMove += camSpd;
        if( this.canTopMove >= 1 )
        {
            this.canTopMove = 0;
            this.cam.moveY( -move ) ;
            return move;
        }
        return 0;
    }

    moveLeft( camSpd:number, move:number=1 ): number 
    {
        this.canRightMove += camSpd;
        if( this.canRightMove >= 1 )
        {
            this.canRightMove = 0;
            this.cam.moveX( -move ) ;
            return move;
        }
        return 0;
    }
    

    moveBottom( camSpd:number, move:number=1): number 
    {
        this.canTopMove += camSpd;
        if( this.canTopMove >= 1 )
        {
            this.canTopMove = 0;
            this.cam.moveY( move ) ;
            return move;
        }
        return 0;
    }


    slideOnX(spd:number, friction:number)
    {

    }

    slideOnY()
    {}

}