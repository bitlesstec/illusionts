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
    static audioCtx:AudioContext = new AudioContext();
    
    //this list is temporal and has all the audio audioCtx is playing
    static playingList:Map<String, AudioBufferSourceNode> = new Map<string, AudioBufferSourceNode>();//to keep track of current playing aduios

    //this will keep al Audio files where the source nodes are created
    //audio files created ( in play() ) will be added to "playingList"
    //but will be removed from that list after finishing...
    static audioList:Map<string, Audio> = new Map(); 
    
    private static volume:number = 0.1;
    private static lastVolume:number = 0.1;
    private static gainNode:GainNode = AudioManager.audioCtx.createGain();;
    private static isPaused:boolean = false;
    private static isMuted:boolean = false;

    // sound source nodes for sfx and background music
    // private sfxSourceNode:AudioBufferSourceNode;
    // private musicSourceNode:AudioBufferSourceNode;

    // constructor()
    // {
    //     // AudioManager.audioCtx.state.
    //     //this is needed to start audio context api
    //     AudioManager.audioCtx = new AudioContext();
    //     this.gainNode = AudioManager.audioCtx.createGain();
    //     this.volume = 0.1//1;
    //     this.gainNode.gain.value = this.volume;
    //     this.audioList = new Map<string, Audio>();
    //     AudioManager.playingList = new Map<string, AudioBufferSourceNode>();
    //     this.isPaused=false;
    //     this.isMuted=false;
    //     // this.sfxSourceNode = this.audioCtx.createBufferSource();
    //     // this.musicSourceNode = this.audioCtx.createBufferSource();
    // }


    /**
     * play audio file specified by mscName, if no argument is 
     * present this will play current played file
     * @param mscName 
     */
    static play(name: string, millis?:number):void
    {
        let starTime =  millis?millis:0;
        this.isPaused = false;
        let sourceNode = this.audioList.get( name ).getSourceNode();
        console.log(`playing ${name} at ${starTime} - ${sourceNode.buffer.duration} `)
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
        return this.audioList.get( name ).isPlaying;
        // let sourceNode = this.audioList.get( name ).getSourceNode();
        //console.log(`is ${name} playing? `+ this.audioList.get( name ).isPlaying )
        // console.log(`playing ${name} at ${sourceNode.  context.currentTime} - state: ${sourceNode.context.state}`)
        // sourceNode.onended //   start( starTime );
    }

    /**
     * this will pause current audioContext that are playing
     */
    static pause(): void {
        this.isPaused=true;
        AudioManager.audioCtx.suspend();
    }

    /**
     * this will resume (unpause) current audioContext
     */
    static resume(): void {
        this.isPaused=false;
        AudioManager.audioCtx.resume();
    }

    /**
     * @param this will mute all sounds (current AudioContext)
     */
    static mute(): void {
        this.isMuted = true;
            this.gainNode.gain.value = 0;
            this.lastVolume = this.volume;
    }

    /**
     * this will unmute all sounds (current AudioContext)
     */
    static unmute(){
        this.isMuted = false;
        this.volume = this.lastVolume;
        this.gainNode.gain.value = this.volume;
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
        console.log(`before stopall ${AudioManager.playingList.size}`)
        for(let key of AudioManager.playingList.keys() )
            AudioManager.playingList.get( key ).stop();

            AudioManager.playingList.clear();
            console.log(`after stopall ${AudioManager.playingList.size}`)
    }

    
    static addSound( name:string, buffer:AudioBuffer, loop:boolean = false )
    {
        let audio:Audio = new Audio( name, buffer, loop );
        this.audioList.set( name, audio );
    }

    /**
     * this will set volume in Audio Context destination device
     * only accepts numbers between 0 to 1
     * @param gain 
     */
    static setVolume(gain:number)
    {
        let gainValue = gain>=1?1:gain;
        this.gainNode.gain.value = gainValue;
    }

}