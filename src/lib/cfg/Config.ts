
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
static readonly SWIPTE_DOWN:number = 0;
static readonly SWIPTE_UP:number = 1;
static readonly SWIPTE_LEFT:number = 2;
static readonly SWIPTE_RIGHT:number = 3;
static readonly CAMERA_MARGIN:number=32;


//GAME SETTINGS
static readonly GAME_NAME:string = "Bitless Game";
static readonly GAME_ID:string = "00001";
static readonly GAME_DESC:string = "this is an example of a game created with Illusion TypeScript Library";
static readonly GAME_AUTHOR:string = "Pavul Zavala";
static readonly GAME_VERSION:string = "0.0";





}