

/**
 * this class contain some utility methods:
 * lenghtDir on X axis
 * lenghtDir on Y axis
 * clamp
 * lerp
 * getRandomRange
 * directRuleof3
 * reverseRuleOf3
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
     * if value is minor than min value, min value will be returned
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
     * same as getRandomRange but will return an integer number
     * @param min 
     * @param max 
     * @returns 
     */
    static getRandomRangeInt( min:number, max:number ):number
    {
        return Math.floor( MathUtil.getRandomRange(min, max) );
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

    static mix(leftBound:number, rightBound:number, percentage:number)
    {
        return leftBound * ( 1 - percentage ) + rightBound * percentage;
    }


    /**
     * this selects randomly 1 item at returns it
     * if 10 arguments are passed the will return 1 of those 10
     * @param args 
     * @returns 
     */
    static choose(args:number[])
    {
        const randChoose = Math.floor(Math.random() * args.length);
        return args[randChoose];
    }
    

    //MATH FUNCTION
    // y = sin(x * 2pi / period) * amplitude + midpoint
    // y is the property we want to change
    // x is time (increasing constantly)
    // 2pi is a mathematical constant (it's the circumference of a circle with radius 1)
    // period is how long one cycle of the sine wave takes
    // amplitude is how high up and down the sine wave goes

    /**
     * creates a sine wave
     * @param time 
     * @param period   is how long one cycle of the sine wave takes
     * @param amplitude  is how high up and down the sine wave goes
     * @param midpoint 
     * USAGE:
     * #1
     * y = sine_wave(current_time / 1000, 1, 64, 0);
     * 
     * #2
     * var time = current_time / 1000;
        image_yscale = sine_between(time, 1, 0.75, 1);
        image_angle = sine_wave(time, 2, 15, 0);

        #3
        * image_angle = sineWave(current_time / 1000, 1, 45, 270);
     */
        static sineWave( time:number, period:number, amplitude:number, midpoint:number)
        {
            return Math.sin(time * 2 * Math.PI / period) * amplitude + midpoint;
        }
    
        /**
         * 
         * @param time 
         * @param period 
         * @param minimum 
         * @param maximum 
         * @returns 
         * USAGE:
         * image_alpha = sineBetween(current_time / 1000, 2, 0, 1);
         
         */
        static sineBetween(  time:number, period:number,  minimum:number, maximum:number ) 
        {
            var midpoint =  MathUtil.mean([minimum, maximum]);
            var amplitude = maximum - midpoint;
            return MathUtil.sineWave(time, period, amplitude, midpoint);
        }
    
    /**
     * This function works by adding up all the input values and then dividing them by their own number.
     * You can have as many arguments as you require (note that more arguments will mean that the function will be slower to parse).
     *  So, mean(2, 6, 9, 32) returns 12.25 as 2+6+9+32=49 and 49/4=12.25.
     * @param values 
     * @returns 
     * es para sacar promedio en espanol
     */
        static mean(values: number[]):number
        {
            if (values.length === 0) return 0; 
            return values.reduce((sum, value) => sum + value, 0) / values.length;
        }

        
}//