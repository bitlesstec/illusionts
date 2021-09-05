import { Point } from "../graphic/Point";


/**
 * this class contain some utility methods:
 * lenghtDir on X axis
 * lenghtDir on Y axis
 * clamp
 * lerp
 * getRandomRange
 * directRuleof3
 * reverseRuleOf3
 * 
 */
export class MathUtil
{

    /**
     * 
     * @param lenght returns x position of the vector determined by lenght and angleDirection
     * @param angleDirection 
     */
    static lengthDirX( lenght:number, angleDirection:number ):number
    {
        return Math.cos( angleDirection /* ( Math.PI / 180 ) */ ) * lenght;
    }

    /**
     * 
     * @param lenght returns Y position of the vector determined by lenght and angleDirecton
     * you must add this value to originY where this vector will be added 
     * example: sprite.y + lenghtDirY( 10 , 45 )
     * @param angleDirection 
     */
    static lengthDirY( lenght:number, angleDirection:number ):number
    {
        return Math.sin( angleDirection /* ( Math.PI / 180 ) */ ) * lenght;
    }

    /**
     * if value is mayor than max value, max value will be returned
     * if value is minor than min value, min valye will be returned
     * if value is between range of max and min value, then value will be returned
     * @param value 
     * @param minValue 
     * @param maxValue 
     */
    static clamp( value:number, minValue:number, maxValue:number )
    {
        // value must be between minValue and maxValue
        return (value > maxValue) ? maxValue : (value < minValue) ? minValue : value;
    }


    /**
     * this functions creates linear interpolation depending on argument t, 
     * which is percentage of v0 until v1
     * example: lerp(0, 10, 0.5): will return 5.0, because is the middle ( 0.5 ) between 0 and 10
     * @param v0 
     * @param v1 
     * @param t 
     */
    static lerp( v0:number, v1:number, t:number ):number
    {
        return (1-t)*v0 + t*v1;
    }

    /**
     * generates and return a number between min and max values
     * you can use floor or ceil, to get the integer returned number
     * example: getRandomRange( -10 ,10 ) will return a number between -10 and 10
     * @param min 
     * @param max 
     */
    static getRandomRange( min:number, max:number ):number
    {
        return min + ( Math.random() * (  ( max - ( min )  ) + 1 ) );
    }

    /**
     * this function help to resolve proporsional ammounts,
     * e.g. is util if you want to get hp ammount, with a fixed width 
     * healt bar
     * 
     * example:
     * a -- > b
     * c --> x
     * -----------------
     * 50 --> 100%
     * 25 --> ?
     * @param a 
     * @param b 
     * @param c 
     */
    static directRuleOf3( a:number, b:number, c:number ):number
    {
        return( ( b * c ) / a );
    }

    /**
     * this function will resolve proporsional ammouts when some of
     * the known values is augmented the result will be decremented and
     * viseversa
     * @param a 
     * @param b 
     * @param c 
     */
    static reverseRuleOf3( a:number, b:number, c:number ):number
    {
        return( ( a * b ) / c );
    }

    /**
     * this will return angle in degrees converted to Radians
     * @param angle 
     */
    static toRadians( angle:number ):number
    {
      return angle * ( Math.PI / 180 );
    }


    /**
     * trayectoria parabolica de un objeto
     * @NOTE buscar como mejorar este codigo, ver como programar projectir parabolico
     * @param initPoint 
     * @param destPoint 
     * @param minSpd 
     * @param maxSpd 
     */
    static projectileTrajectory( initPoint:Point, destPoint:Point, minSpd:number, maxSpd:number ):[ number, number ]
    {
        let xi:number = initPoint.x;
        let yi:number = initPoint.y;
        let xf:number = destPoint.x;
        let yf:number = destPoint.y;

        let grav:number = 9.8;


        let xdir:number = Math.sign( xf-xi );
        xf=xi + Math.abs( xf-xi );

        if( xi === xf ){
            xf = ++xi;
        }

        let c:number = ( grav / ( 2 * Math.pow( minSpd, 2 ) ) ) * ( Math.pow( xf-xi, 2 ) );

        let potmin:number = minSpd;
        while(  Math.pow( xf-xi,2)-4 * (c * ( c -yf + yi ) ) < 0 )
        {
            potmin+=5;
            if( xi === xf ){ xf = ++xi; }
            c =  ( grav / ( 2 * Math.pow( potmin, 2 ) ) ) * ( Math.pow( xf-xi, 2 ) );
        }

        let res =  -( xf -xi ) - Math.sqrt( Math.pow(xf-xi,2)-4 * ( c * ( c-yf-yi ) ) ) / -2 * c

        let ang:number = Math.atan( res ) * 180 / Math.PI;

        if(xdir === -1){
            ang += 2 * Math.abs( ang - 90 );
        }

        let pot:number = Math.min( minSpd, maxSpd );

        return [ this.lengthDirX( pot, ang )/60, this.lengthDirY( pot, ang )/60 ];

    }


    static projectile( launchAngle:number, spd:number ):[ number, number ]
    {
        let DEG2RAD:number = Math.PI/180;
        let g:number = 9.8;
        let time:number = 10;

        let ang:number = launchAngle * DEG2RAD;
        let v0x:number = spd * Math.cos(ang); // initial velocity in x
        let v0y:number = spd * Math.sin(ang); // initial velocity in y

        // let x:number = (v0x * time);
        // // // double y = (v0y * time) + (0.5 * g * (float)Math.Pow(time, 2));
        // let y:number = (0.5 * g * time + v0y) * time

        return [ v0x, -v0y];
    }

}//