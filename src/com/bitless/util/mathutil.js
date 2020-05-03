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
export class MathUtil {
    /**
     *
     * @param lenght returns x position of the vector determined by lenght and angleDirection
     * @param angleDirection
     */
    static lengthDirX(lenght, angleDirection) {
        return Math.cos(angleDirection * (Math.PI / 180)) * lenght;
    }
    /**
     *
     * @param lenght returns Y position of the vector determined by lenght and angleDirecton
     * you must add this value to originY where this vector will be added
     * example: sprite.y + lenghtDirY( 10 , 45 )
     * @param angleDirection
     */
    static lengthDirY(lenght, angleDirection) {
        return Math.sin(angleDirection * (Math.PI / 180)) * lenght;
    }
    /**
     * if value is mayor than max value, max value will be returned
     * if value is minor than min value, min valye will be returned
     * if value is between range of max and min value, then value will be returned
     * @param value
     * @param minValue
     * @param maxValue
     */
    static clamp(value, minValue, maxValue) {
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
    static lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }
    /**
     * generates and return a number between min and max values
     * you can use floor or ceil, to get the integer returned number
     * example: getRandomRange( -10 ,10 ) will return a number between -10 and 10
     * @param min
     * @param max
     */
    static getRandomRange(min, max) {
        return min + (Math.random() * ((max - (min)) + 1));
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
    static directRuleOf3(a, b, c) {
        return ((b * c) / a);
    }
    /**
     * this function will resolve proporsional ammouts when some of
     * the known values is augmented the result will be decremented and
     * viseversa
     * @param a
     * @param b
     * @param c
     */
    static reverseRuleOf3(a, b, c) {
        return ((a * b) / c);
    }
    /**
     * this will return angle in degrees converted to Radians
     * @param angle
     */
    static toRadians(angle) {
        return angle * (Math.PI / 180);
    }
} //
