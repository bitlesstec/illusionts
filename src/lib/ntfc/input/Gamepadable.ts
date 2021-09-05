

/**
 * this provides several functions to use with a gamepad
 */
export interface Gamepadable{


    /**
     * this must be used in UPDATE() method, this will poll gamepad events
     */
    poll(gamepads:Gamepad[]):void;

    /**
     * this will check if a button defined by it index is pressed or not,
     * will return 1 if pressed or 0 if not, however if the button has analogic value
     * may return a value between -1 & 1
     * @param buttonIndex 
     */
    isButtonPressed( buttonIndex:number ):boolean;

    /**
     * returns true if button defined by index was released
     * @param buttonIndex 
     */
    isButtonReleased( buttonIndex:number ):boolean;

    /**
     * returns a value between -1 & 1 from analogic value
     * CAREFUL ANALOG VALUES OFTEN HAVE A THRESHOLD!
     * @param axisIndex 
     */
    getAxisValue( axisIndex:number ):number;


    /**
     * this will return true if the axis defined is released false if not
     * @param axisIndex 
     */
    isAxisReleased( axisIndex:number ):boolean;


    /**
     * this is intended to use it with buttons that has analogic values like
     * triggers on some controllers.
     * this will return value between 0 & 1
     * CAREFUL ANALOG VALUES OFTEN HAVE A THRESHOLD!
     * @param buttonIndex 
     */
    getAnalogButtonValue( buttonIndex:number ):number;

}