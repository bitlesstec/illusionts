
/**
 * this interface provide events handlers for 
 * kerboard events
 *
 * EVENT          Description
 * keyDown        fired on pressing the key (auto-repeats if the key is pressed for long)
 * keyUp          fired when a key is released
 */
export interface Keyable
{
keyDown( event );
keyUp( event );
}