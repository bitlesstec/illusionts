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
    
    //this list is temporal and has all the audio audioCtx is playing
    static playingList:Map<String, AudioBufferSourceNode>;//to keep track of current playing aduios

    //this will keep al Audio files where the source nodes are created
    //audio files created ( in play() ) will be added to "playingList"
    //but will be removed from that list after finishing...
    static audioList:Map<string, Audio>; 
    
    private static musicVolume:number;
    private static sfxVolume:number;
    

    private static lastMusicVolume:number;
    private static lastSfxMusicVolume:number;
    

    static musicGainNode:GainNode;
    static sfxGainNode:GainNode;
    
    private static isPaused:boolean;
    private static isMuted:boolean;

    private static instance: AudioManager;

    // sound source nodes for sfx and background music
    // private sfxSourceNode:AudioBufferSourceNode;
    // private musicSourceNode:AudioBufferSourceNode;

    private constructor()
    {
        // AudioManager.audioCtx.state.
        //this is needed to start audio context api
        AudioManager.audioCtx = new AudioContext();
        AudioManager.playingList = new Map<string, AudioBufferSourceNode>();
        AudioManager.audioList = new Map(); 

        AudioManager.musicGainNode = AudioManager.audioCtx.createGain();
        AudioManager.sfxGainNode = AudioManager.audioCtx.createGain();

        AudioManager.musicGainNode.connect( AudioManager.audioCtx.destination );
        AudioManager.sfxGainNode.connect( AudioManager.audioCtx.destination );

        AudioManager.musicVolume = 0.5;
        AudioManager.sfxVolume = 0.5;

        AudioManager.lastMusicVolume = 0.5;
        AudioManager.lastSfxMusicVolume = 0.5;

        AudioManager.isPaused=false;
        AudioManager.isMuted=false;
    }//


    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
          AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
      }


    /**
     * play audio file specified by mscName, if no argument is 
     * present this will play current played file
     * @param mscName 
     * @param ifIsPlaying if set to false, it will only play the soound if is not playing
     */
    static play(name: string, ifIsPlaying:boolean=true, millis?:number):void
    {

        if(!AudioManager.isPlaying)
            if(AudioManager.audioList.get( name ).isPlaying)
                return
 
        const starTime =  millis?millis:0;
        AudioManager.isPaused = false;
        const sourceNode = this.audioList.get( name ).getSourceNode();
        // console.log(`playing ${name} at ${starTime} - ${sourceNode.buffer.duration} `)
        sourceNode.start( starTime );

        //overwrite onended if you want an special treat to the must when is done
        // sourceNode.onended = ()=>{
        //     // sourceNode.buffer.duration para saber la duracion total del audio
        //     console.log(`${name} finalizing playing at ${sourceNode.context.currentTime}`);
        // }
    }

    /**
     * returns true if speicied sound is playing and false if not
     * @param name 
     * @returns 
     */
    static isPlaying( name:string ):boolean
    {
        return AudioManager.audioList.get( name ).isPlaying;
        // let sourceNode = this.audioList.get( name ).getSourceNode();
        //console.log(`is ${name} playing? `+ this.audioList.get( name ).isPlaying )
        // console.log(`playing ${name} at ${sourceNode.  context.currentTime} - state: ${sourceNode.context.state}`)
        // sourceNode.onended //   start( starTime );
    }

    /**
     * this will pause current audioContext that are playing
     */
    static pause(): void {
        AudioManager.isPaused=true;
        AudioManager.audioCtx.suspend();
    }

    /**
     * this will resume (unpause) current audioContext
     */
    static resume(): void {
        AudioManager.isPaused=false;
        AudioManager.audioCtx.resume();
    }

    /**
     * @param this will mute all sounds (current AudioContext)
     */
    static mute(): void {
        AudioManager.isMuted = true;

        AudioManager.musicGainNode.gain.value=0
        AudioManager.sfxGainNode.gain.value=0;

        AudioManager.lastMusicVolume = this.musicVolume;
        AudioManager.lastSfxMusicVolume = this.sfxVolume;
    }

    /**
     * this will unmute all sounds (current AudioContext)
     */
    static unmute(){
        AudioManager.isMuted = false;
        AudioManager.musicVolume = this.lastMusicVolume;
        AudioManager.sfxVolume = this.lastSfxMusicVolume;

        AudioManager.musicGainNode.gain.value = this.musicVolume;
        AudioManager.sfxGainNode.gain.value = this.sfxVolume;

    }

    /**
     * this will stop all sounds matching "name" in playingList
     * 
     * @param name 
     */
    static stop(name:string){
        for(let key of AudioManager.playingList.keys() )
        {
            if( key.includes( name )  )
            {
                AudioManager.playingList.get( key ).stop();
                AudioManager.playingList.delete( name );
                break;//get out of the loop
            }

        }
    }

    /**
     * this will stop all sounds playing, and will clear
     * playinglist
     */
    static stopAll()
    {   
        // console.log(`before stopall ${AudioManager.playingList.size}`)
        for(let key of AudioManager.playingList.keys() )
            AudioManager.playingList.get( key ).stop();

            AudioManager.playingList.clear();
            // console.log(`after stopall ${AudioManager.playingList.size}`)
    }

    
    static addSound( name:string, buffer:AudioBuffer, loop:boolean = false )
    {
        const audio:Audio = new Audio( name, buffer, loop );
        AudioManager.audioList.set( name, audio );
    }

    /**
     * this will set volume in Audio Context destination device
     * only accepts numbers between 0 to 1
     * @param gain 
     */
    static setMusicVolume(gain:number)
    {
        const gainValue = gain>=1?1:gain;
        AudioManager.musicVolume=gainValue;
        AudioManager.musicGainNode.gain.value = gainValue;
    }

    static setSfxVolume(gain:number)
    {
        const gainValue = gain>=1?1:gain;
        AudioManager.sfxVolume=gainValue;
        AudioManager.sfxGainNode.gain.value = gainValue;
    }

}