import { Audio } from "./Audio.js";
//import { Audioable } from "./Audioable.js";


/**
 * this class will handle all functions used to play audios
 * or sounds in a game, in fact an instance of this class is set
 * in BaseLevel.
 * 
 * note to me: seems stable for now, check for improvement later
 */
export class AudioManager// implements Audioable
{

    //this is the Audio Context where all buffers will be created and pointed to destination
    static audioCtx:AudioContext;
    static playingList:Map<String, AudioBufferSourceNode>;//to keep track of current playing aduios

    //this will keep al Audio files where the source nodes are created
    //audio files created ( in play() ) will be added to "playingList"
    //but will be removed from that list after finishing...
    audioList:Map<string, Audio>; 
    
    private volume:number;
    private lastVolume:number;
    private gainNode:GainNode;
    private isPaused:boolean;
    private isMuted:boolean;

    // sound source nodes for sfx and background music
    // private sfxSourceNode:AudioBufferSourceNode;
    // private musicSourceNode:AudioBufferSourceNode;

    constructor()
    {
        //this is needed to start audio context api
        AudioManager.audioCtx = new AudioContext();
        this.gainNode = AudioManager.audioCtx.createGain();
        this.volume = 0.1//1;
        this.gainNode.gain.value = this.volume;
        this.audioList = new Map<string, Audio>();
        AudioManager.playingList = new Map<string, AudioBufferSourceNode>();
        this.isPaused=false;
        this.isMuted=false;
        // this.sfxSourceNode = this.audioCtx.createBufferSource();
        // this.musicSourceNode = this.audioCtx.createBufferSource();
    }


    /**
     * play audio file specified by mscName, if no argument is 
     * present this will play current played file
     * @param mscName 
     */
    play(name: string, millis?:number):void
    {
        let starTime =  millis?millis:0;
        this.isPaused = false;
        let sourceNode = this.audioList.get( name ).getSourceNode();
        console.log(`playing ${name} at ${starTime}`)
        sourceNode.start( starTime );
    }
  

    /**
     * this will pause current audioContext that are playing
     */
    pause(): void {
        this.isPaused=true;
        AudioManager.audioCtx.suspend();
    }

    /**
     * this will resume (unpause) current audioContext
     */
    resume(): void {
        this.isPaused=false;
        AudioManager.audioCtx.resume();
    }

    /**
     * @param this will mute all sounds (current AudioContext)
     */
    mute(): void {
        this.isMuted = true;
            this.gainNode.gain.value = 0;
            this.lastVolume = this.volume;
    }

    /**
     * this will unmute all sounds (current AudioContext)
     */
    unmute(){
        this.isMuted = false;
        this.volume = this.lastVolume;
        this.gainNode.gain.value = this.volume;
    }

    /**
     * this will stop all sounds matching "name" in playingList
     * 
     * @param name 
     */
    stop(name:string){
        for(let key of AudioManager.playingList.keys() )
        {
            if( key.includes( name )  )
            {
                AudioManager.playingList.get( key ).stop();
                AudioManager.playingList.delete( name );
            }

        }
    }

    /**
     * this will stop all sounds playing, and will clear
     * playinglist
     */
    stopAll()
    {   
        console.log(`before stopall ${AudioManager.playingList.size}`)
        for(let key of AudioManager.playingList.keys() )
            AudioManager.playingList.get( key ).stop();

            AudioManager.playingList.clear();
            console.log(`after stopall ${AudioManager.playingList.size}`)
    }

    
    addSound( name:string, buffer:AudioBuffer, loop:boolean = false )
    {
        let audio:Audio = new Audio( name, buffer, loop );
        this.audioList.set( name, audio );
    }

    /**
     * this will set volume in Audio Context destination device
     * only accepts numbers between 0 to 1
     * @param gain 
     */
    setVolume(gain:number)
    {
        let gainValue = gain>=1?1:gain;
        this.gainNode.gain.value = gainValue;
    }

}