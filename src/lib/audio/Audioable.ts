/**
 * this is the main interface that sets all methods used
 * by AudioManager
 */
export interface Audioable
{

    play( mscName?:string ):Promise<void>;

    playSfx( sfxName:string ):Promise<void>;

    pause():void;

    mute( mute:boolean ):void;
    
    stop():void;

    setVolume( volumeLevel:number ):void;

    autoLoop( enableLoop:boolean ):void;

}