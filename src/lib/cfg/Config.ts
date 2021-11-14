

export class Config
{

/**
* every sprite isntance created will have its own id
*/
static SPRITE_ID_COUNTER:number = 1000; //to create id's for sprites
static AUDIO_PLAYING_ID_COUNTER:number = 1000; //to create ids for audio files

//default name and path for custom font
static readonly DEFAULT_FONT_NAME:string = "press-start";
static readonly DFLT_FNT_NAME_PATH:string = "/assets/font/press-start.ttf";

static readonly RADIAN:number = ( 180 / Math.PI );

//USED IN MOUSE CONTROL
static readonly SWIPTE_DOWN = 0;
static readonly SWIPTE_UP = 1;
static readonly SWIPTE_LEFT = 2;
static readonly SWIPTE_RIGHT = 3;
}