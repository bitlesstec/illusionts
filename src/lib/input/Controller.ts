import { Gamepadable } from "../ntfc/input/Gamepadable";
import { ControllerState } from "./ControllerState";

/**
 * this class contains functionality to use gamepads for a game, 
 * the gamepad need to be retrieved and with those this class 
 * can be instantiated.
 * NOTE: if no gamepad is set, the functions won't work
 * NOTE2: you have to use GameState.GAMEPAD_CONNECTING and all those 
 * game states so you can handle properly if gamepads are connected or disconected
 */
export class Controller implements Gamepadable
{
    //Gamepads Tested:
    // - DragonRise Inc.   Generic   USB  Joystick   (STANDARD GAMEPAD Vendor: 0079 Product: 0006)
    // - XBOX360 - Xbox 360 Controller (XInput STANDARD GAMEPAD 
    // - PS4 controller (via USB)

    //below are generic data for most of gamepads
    static readonly DEAD_THRESHOLD:number = 0.2;
    static readonly XAXIS_DEAD_THRESHOLD:number = Controller.DEAD_THRESHOLD;
    static readonly YAXIS_DEAD_THRESHOLD:number = Controller.DEAD_THRESHOLD;

    static readonly GEN_BTN_RELEASED:number = 0;

    static readonly GEN_BTN_0:number = 0;
    static readonly GEN_BTN_1:number = 1;
    static readonly GEN_BTN_2:number = 2;
    static readonly GEN_BTN_3:number = 3;
    static readonly GEN_BTN_4:number = 4;
    static readonly GEN_BTN_5:number = 5;
    static readonly GEN_BTN_6:number = 6;
    static readonly GEN_BTN_7:number = 7;
    static readonly GEN_BTN_8:number = 8;
    static readonly GEN_BTN_9:number = 9;
    static readonly GEN_BTN_10:number = 10;
    static readonly GEN_BTN_11:number = 11;
    static readonly GEN_BTN_12:number = 12;
    static readonly GEN_BTN_13:number = 13;
    static readonly GEN_BTN_14:number = 14;
    static readonly GEN_BTN_15:number = 15;
    static readonly GEN_BTN_16:number = 16;
    static readonly GEN_BTN_17:number = 17;

    static readonly GEN_LEFTSTICK_XAXIS:number = 0; //analog values from -1 to 1
    static readonly GEN_LEFTSTICK_YAXIS:number = 1; //analog values from -1 to 1
    static readonly GEN_RIGTHSTICK_XAXIS:number = 2; //analog values from -1 to 1
    static readonly GEN_RIGTHSTICK_YAXIS:number = 3; //analog values from -1 to 1

    //XBOX ONE MAPPING
    //XBOX360 - Xbox 360 Controller (XInput STANDARD GAMEPAD 

    static readonly XBOX_BTN_A:number = Controller.GEN_BTN_0;
    static readonly XBOX_BTN_B:number = Controller.GEN_BTN_1;
    static readonly XBOX_BTN_X:number = Controller.GEN_BTN_2;
    static readonly XBOX_BTN_Y:number = Controller.GEN_BTN_3;
    static readonly XBOX_LEFT_BUMPER:number = Controller.GEN_BTN_4;
    static readonly XBOX_RIGTH_BUMPER:number = Controller.GEN_BTN_5;
    static readonly XBOX_LEFT_TRIGGER:number = Controller.GEN_BTN_6; //analogic value
    static readonly XBOX_RIGTH_TRIGGER:number = Controller.GEN_BTN_7;//analogic value
    static readonly XBOX_BTN_VIEW:number = Controller.GEN_BTN_8;
    static readonly XBOX_BTN_MENU:number = Controller.GEN_BTN_9;
    static readonly XBOX_LEFT_STICK_BTN:number = Controller.GEN_BTN_10;
    static readonly XBOX_RIGTH_STICK_BTN:number = Controller.GEN_BTN_11;
    static readonly XBOX_DPAD_UP:number = Controller.GEN_BTN_12;
    static readonly XBOX_DPAD_DOWN:number = Controller.GEN_BTN_13;
    static readonly XBOX_DPAD_LEFT:number = Controller.GEN_BTN_14;
    static readonly XBOX_DPAD_RIGTH:number = Controller.GEN_BTN_15;
    static readonly XBOX_XBOX_BTN:number = Controller.GEN_BTN_16;
    static readonly XBOX_LEFTSTICK_XAXIS:number = Controller.GEN_LEFTSTICK_XAXIS;
    static readonly XBOX_LEFTSTICK_YAXIS:number = Controller.GEN_LEFTSTICK_YAXIS;
    static readonly XBOX_RIGTHSTICK_XAXIS:number = Controller.GEN_RIGTHSTICK_XAXIS;
    static readonly XBOX_RIGTHSTICK_YAXIS:number = Controller.GEN_RIGTHSTICK_YAXIS;

    // XBOX 360 MAPPING

    // PS4 MAPPING
    // Sony Interactive Entertainment Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)
    static readonly PS_BTN_X:number = Controller.GEN_BTN_0;
    static readonly PS_BTN_O:number = Controller.GEN_BTN_1;  
    static readonly PS_BTN_SQUARE:number = Controller.GEN_BTN_2; 
    static readonly PS_BTN_TRIANGLE:number = Controller.GEN_BTN_3; 
    static readonly PS_BTN_L1:number = Controller.GEN_BTN_4;
    static readonly PS_BTN_R1:number = Controller.GEN_BTN_5;
    static readonly PS_BTN_L2:number = Controller.GEN_BTN_6; //analog value
    static readonly PS_BTN_R2:number = Controller.GEN_BTN_7; //analog value
    static readonly PS_BTN_SHARE:number = Controller.GEN_BTN_8;
    static readonly PS_BTN_OPTIONS:number = Controller.GEN_BTN_9;
    static readonly PS_LEFT_STICK_BTN:number = Controller.GEN_BTN_10;
    static readonly PS_RIGTH_STICK_BTN:number = Controller.GEN_BTN_11;
    static readonly PS_DPAD_UP:number = Controller.GEN_BTN_12;
    static readonly PS_DPAD_DOWN:number = Controller.GEN_BTN_13;
    static readonly PS_DPAD_LEFT:number = Controller.GEN_BTN_14;
    static readonly PS_DPAD_RIGTH:number = Controller.GEN_BTN_15;
    static readonly PS_PS_BTN:number = Controller.GEN_BTN_16;
    static readonly PS_LEFTSTICK_XAXIS:number = Controller.GEN_LEFTSTICK_XAXIS;
    static readonly PS_LEFTSTICK_YAXIS:number = Controller.GEN_LEFTSTICK_YAXIS;
    static readonly PS_RIGTHSTICK_XAXIS:number = Controller.GEN_RIGTHSTICK_XAXIS;
    static readonly PS_RIGTHSTICK_YAXIS:number = Controller.GEN_RIGTHSTICK_YAXIS;

    // ps3 MAPPING


    index:number;
    id:string;
    gamePad:Gamepad;

    xAxisDeadThreshold:number;
    yAxisDeadThreshold:number;

    //arrays to keep track of every button pressed so we can check
    //if button or axis was released
    lastButtonPressed:Boolean[] = [];
    lastAxisPressed:Boolean[] = [];

    constructor(gamepad:Gamepad)
    {

        if(gamepad)
        {
            this.index = gamepad.index;
            this.id = gamepad.id;
            this.gamePad = gamepad;
            this.xAxisDeadThreshold = Controller.XAXIS_DEAD_THRESHOLD;
            this.yAxisDeadThreshold = Controller.YAXIS_DEAD_THRESHOLD;
    
            //all indexes for buttons and axis are false
            for(let ind in gamepad.buttons)
            {
                this.lastButtonPressed[ind]=false;
            }
    
            for( let ind in gamepad.axes)
            {
                this.lastAxisPressed[ind]=false;
            }
        }
        
    }
   

    /**
     * this function needs to be called un update method like:
     * gpad.poll(navigator.getGamepads()) , without this we can't
     * receive the gamepad events 
     * @param gamepads dont forget to call this function in update method,
     * this will retrieve gamepad new state, ( with pressed values, etc ).
     */
    poll(gamepads:Gamepad[]):number{

        //if there is no gamepad, but was available before, make disconect
        if( (gamepads[this.index] === null || gamepads[this.index] === undefined) && this.gamePad )
        {
            return ControllerState.DISCONNECTED;//means controller disconected
        }
        //if there is no gamepad connected return
        else if( gamepads[this.index] === null || gamepads[this.index] === undefined ) return ControllerState.NONE;


        this.gamePad = gamepads[this.index];
        return ControllerState.CONNECTED;
    }

    /**
     * returns true if buttons is pressed false if not
     * @param buttonIndex 
     * @returns 
     */
    isButtonPressed(buttonIndex: number): boolean {
        // if( !this.lastButtonPressed[buttonIndex] ){this.lastButtonPressed[buttonIndex]=true;}

        if( this.gamePad )
            return this.gamePad.buttons[ buttonIndex ].pressed;
        else
            return undefined;
    }

    /**
     * returns true if buttons was released false if not
     * @param buttonIndex 
     * @returns 
     */
    isButtonReleased(buttonIndex: number): boolean {

        if(this.gamePad)
        {
            if( this.gamePad.buttons[ buttonIndex ].pressed )
            this.lastButtonPressed[buttonIndex]=true;

            if( !this.gamePad.buttons[ buttonIndex ].pressed && this.lastButtonPressed[buttonIndex] )
            { 
            this.lastButtonPressed[buttonIndex]=false;
            return true; 
            }

            return false;
        }
        else
            return undefined;
        
    }

    /**
     * this will return the value of X or Y axis, whether is less or mayor than dead threshold
     * which is 0.2, if value is between threshold this will return 0
     * @param axisIndex 
     * @returns 
     */
    getAxisValue(axisIndex: number): number 
    {

        if( this.gamePad )
        {
            let value = this.gamePad.axes[ axisIndex ];
            let axis:string = axisIndex===0 || axisIndex===2?"xAxis":"yAxis";
            if( axis === "xAxis")
            {
                return value < -this.xAxisDeadThreshold || value > this.xAxisDeadThreshold? value : 0 ;
            }
            else
            {
                return value < -this.yAxisDeadThreshold || value > this.yAxisDeadThreshold? value : 0 ;
            }
        }
        else
            return undefined;
        
    }


    /**
     * returns true if the axis is released if passes dead_threshold value to -1 or 1
     * @param axisIndex 
     * @returns 
     */
    isAxisReleased(axisIndex: number): boolean 
    {
        if(this.gamePad)
        {
            let value = this.gamePad.axes[ axisIndex ];

            let axis:string = axisIndex===0 || axisIndex===2?"xAxis":"yAxis";
            if( axis === "xAxis")
            {
                value = value < -this.xAxisDeadThreshold || value > this.xAxisDeadThreshold? value : 0 ;
            }
            else
            {
                value = value < -this.yAxisDeadThreshold || value > this.yAxisDeadThreshold? value : 0 ;
            }
    
            // value = value < -this.xAxisDeadThreshold || value > this.xAxisDeadThreshold? value : 0;
            if( value )this.lastAxisPressed[axisIndex]=true;
            
            if( !value && this.lastAxisPressed[axisIndex] ){
                this.lastAxisPressed[axisIndex]=false;
                return true;
            }
            return false;
        }
        else
            return undefined;

        
    }


    /**
     * use this method to get values of those buttons with analog values like triggers
     * @param buttonIndex 
     * @returns 
     */
    getAnalogButtonValue(buttonIndex: number): number 
    {
        if(this.gamePad)
        {
            return this.gamePad.buttons[ buttonIndex ].value;
        }
        else
            return undefined;
    }


}