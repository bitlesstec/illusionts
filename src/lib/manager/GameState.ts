
/**
 * those states are basic for most games, however
 * you can add more if you want extending this
 */
export enum GameState
{ 
LOADING,
PLAYING,
GAMEOVER,
COMPLETED,
PAUSED,
STOPPED,//game is not paused but is stoped, like for some game events
DIALOGUING,//use this if a player is dialoguin with NPC
TRANSITIONING,//transtion between one level to another
TRANSITIONED,//used when transition animation is done to load a new level
SAVING,//show animation while game is beign saved
SAVED,
GAMEPAD_CONNECTED,
GAMEPAD_DISCONNECTED,
GAMEPAD_CONNECTING,
INPUT_SCREEN, //to use it when we open html popup for now
BREAK_POINT,
}