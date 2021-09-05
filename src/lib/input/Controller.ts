import { Gamepadable } from "../ntfc/input/Gamepadable.js";


export class Controller implements Gamepadable
{
    //other gamepads tested
    // DragonRise Inc.   Generic   USB  Joystick   (STANDARD GAMEPAD Vendor: 0079 Product: 0006)


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
    static readonly XBOXONE_BTN_A:number = Controller.GEN_BTN_0;
    static readonly XBOXONE_BTN_B:number = Controller.GEN_BTN_1;
    static readonly XBOXONE_BTN_X:number = Controller.GEN_BTN_2;
    static readonly XBOXONE_BTN_Y:number = Controller.GEN_BTN_3;
    static readonly XBOXONE_LEFT_BUMPER:number = Controller.GEN_BTN_4;
    static readonly XBOXONE_RIGTH_BUMPER:number = Controller.GEN_BTN_5;
    static readonly XBOXONE_LEFT_TRIGGER:number = Controller.GEN_BTN_6; //analogic value
    static readonly XBOXONE_RIGTH_TRIGGER:number = Controller.GEN_BTN_7;//analogic value
    static readonly XBOXONE_BTN_VIEW:number = Controller.GEN_BTN_8;
    static readonly XBOXONE_BTN_MENU:number = Controller.GEN_BTN_9;
    static readonly XBOXONE_LEFT_STICK_BTN:number = Controller.GEN_BTN_10;
    static readonly XBOXONE_RIGTH_STICK_BTN:number = Controller.GEN_BTN_11;
    static readonly XBOXONE_DPAD_UP:number = Controller.GEN_BTN_12;
    static readonly XBOXONE_DPAD_DOWN:number = Controller.GEN_BTN_13;
    static readonly XBOXONE_DPAD_LEFT:number = Controller.GEN_BTN_14;
    static readonly XBOXONE_DPAD_RIGTH:number = Controller.GEN_BTN_15;
    static readonly XBOXONE_XBOX_BTN:number = Controller.GEN_BTN_16;
    static readonly XBOXONE_LEFTSTICK_XAXIS:number = Controller.GEN_LEFTSTICK_XAXIS;
    static readonly XBOXONE_LEFTSTICK_YAXIS:number = Controller.GEN_LEFTSTICK_YAXIS;
    static readonly XBOXONE_RIGTHSTICK_XAXIS:number = Controller.GEN_RIGTHSTICK_XAXIS;
    static readonly XBOXONE_RIGTHSTICK_YAXIS:number = Controller.GEN_RIGTHSTICK_YAXIS;



    // XBOX 360 MAPPING

    // PS4 MAPPING
    // Sony Interactive Entertainment Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)
    static readonly PS4_BTN_X:number = Controller.GEN_BTN_0;
    static readonly PS4_BTN_O:number = Controller.GEN_BTN_1;  
    static readonly PS4_BTN_SQUARE:number = Controller.GEN_BTN_2; 
    static readonly PS4_BTN_TRIANGLE:number = Controller.GEN_BTN_3; 
    static readonly PS4_BTN_L1:number = Controller.GEN_BTN_4;
    static readonly PS4_BTN_R1:number = Controller.GEN_BTN_5;
    static readonly PS4_BTN_L2:number = Controller.GEN_BTN_6; //analog value
    static readonly PS4_BTN_R2:number = Controller.GEN_BTN_7; //analog value
    static readonly PS4_BTN_SHARE:number = Controller.GEN_BTN_8;
    static readonly PS4_BTN_OPTIONS:number = Controller.GEN_BTN_9;
    static readonly PS4_LEFT_STICK_BTN:number = Controller.GEN_BTN_10;
    static readonly PS4_RIGTH_STICK_BTN:number = Controller.GEN_BTN_11;
    static readonly PS4_DPAD_UP:number = Controller.GEN_BTN_12;
    static readonly PS4_DPAD_DOWN:number = Controller.GEN_BTN_13;
    static readonly PS4_DPAD_LEFT:number = Controller.GEN_BTN_14;
    static readonly PS4_DPAD_RIGTH:number = Controller.GEN_BTN_15;
    static readonly PS4_PS_BTN:number = Controller.GEN_BTN_16;
    static readonly PS4_LEFTSTICK_XAXIS:number = Controller.GEN_LEFTSTICK_XAXIS;
    static readonly PS4_LEFTSTICK_YAXIS:number = Controller.GEN_LEFTSTICK_YAXIS;
    static readonly PS4_RIGTHSTICK_XAXIS:number = Controller.GEN_RIGTHSTICK_XAXIS;
    static readonly PS4_RIGTHSTICK_YAXIS:number = Controller.GEN_RIGTHSTICK_YAXIS;



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

    constructor(gamepad:Gamepad){
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
   

    /**
     * 
     * @param gamepads dont forget to call this function in update method,
     * this will retrieve gamepad new state.
     */
    poll(gamepads:Gamepad[]){
        this.gamePad = gamepads[this.index];
    }

    /**
     * returns true if buttons is pressed false if not
     * @param buttonIndex 
     * @returns 
     */
    isButtonPressed(buttonIndex: number): boolean {
        // if( !this.lastButtonPressed[buttonIndex] ){this.lastButtonPressed[buttonIndex]=true;}
        return this.gamePad.buttons[ buttonIndex ].pressed;
    }

    /**
     * returns true if buttons was released false if not
     * @param buttonIndex 
     * @returns 
     */
    isButtonReleased(buttonIndex: number): boolean {

        if( this.gamePad.buttons[ buttonIndex ].pressed )
                             this.lastButtonPressed[buttonIndex]=true;

        if( !this.gamePad.buttons[ buttonIndex ].pressed && this.lastButtonPressed[buttonIndex] )
        { 
            this.lastButtonPressed[buttonIndex]=false;
            return true; 
        }

        return false;
    }

    /**
     * this will return the value of X or Y axis, whether is less or mayor than dead threshold
     * which is 0.2, if value is between threshold this will return 0
     * @param axisIndex 
     * @returns 
     */
    getAxisValue(axisIndex: number): number {
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


    /**
     * returns true if the axis is released if passes dead_threshold value to -1 or 1
     * @param axisIndex 
     * @returns 
     */
    isAxisReleased(axisIndex: number): boolean {

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


    /**
     * use this method to get values of those buttons with analog values like triggers
     * @param buttonIndex 
     * @returns 
     */
    getAnalogButtonValue(buttonIndex: number): number {
        return this.gamePad.buttons[ buttonIndex ].value;
    }


}