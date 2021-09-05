import { Audioable } from "./Audioable.js";


/**
 * this class will handle all functions used to play audios
 * or sounds in a game
 */
export class AudioManager implements Audioable
{

    currentPlay:string;
    audioList:Map<string, HTMLAudioElement>;
    
    // private audioCtx:AudioContext;
    private volume:number;
    private lastVolume:number;
    // private sfxVolume:number;
    private autoPlay:boolean;
    private isPaused:boolean;
    private isMuted:boolean;

    constructor()
    {
        //this is needed to start audio context api
        // this.audioCtx = new AudioContext();
        this.volume = 1;
        this.autoPlay = false;
        // this.cicleCount = 0;
        this.audioList = new Map<string, HTMLAudioElement>();
        this.isPaused=false;
        this.isMuted=false;
    }

    /**
     * this method will set the list of sound files to use
     * @param soundList 
     */
    loadSounds( soundList:Map<string, HTMLAudioElement> )
    {
        this.audioList = soundList;
    }

    /**
     * play audio file specified by mscName, if no argument is 
     * present this will play current played file
     * @param mscName 
     */
    async play(mscName?: string):Promise<void>
    {
        
        if( mscName )
        {
            this.currentPlay = mscName;
            let currentPlay:HTMLAudioElement = this.audioList.get( mscName );
            this.isPaused = false;
            currentPlay.autoplay = true;
            currentPlay.muted=false;
            await currentPlay.play();
        }
        else
        {
            let currentPlay:HTMLAudioElement = this.audioList.get( this.currentPlay );
            await currentPlay.play();
            this.isPaused = false;
        }
   
    }
  
    /**
     * this method should be used to play sound effects
     * @param soundName 
     */
    async playSfx( sfxName:string ):Promise<void>
    {
        // if there is volume and is not muted this sfx will play
        if( this.volume > 0 || !this.isMuted )
        {
            var currentSfx:HTMLAudioElement = this.audioList.get( sfxName );
            currentSfx.autoplay=false;
            await currentSfx.play();
        }

    }

    /**
     * this will pause current playing audio file
     */
    pause(): void {
        this.isPaused=true;
        let currentPlay:HTMLAudioElement = this.audioList.get( this.currentPlay );
        currentPlay.pause();
    }

    /**
     * 
     * @param mute 
     */
    mute(mute: boolean): void {
        var currentPlay:HTMLAudioElement = this.audioList.get( this.currentPlay );
        currentPlay.muted = mute;
        this.isMuted = mute;
        if( this.isMuted )
            currentPlay.volume = 0;
        else
            currentPlay.volume = this.lastVolume;
    }
    
    /**
     * stops audio file playing
     */
    stop(): void {
        var currentPlay:HTMLAudioElement = this.audioList.get( this.currentPlay );
        currentPlay.pause();
        currentPlay.currentTime = 0;
    }
    
    /**
     * this will change the volume of the audio file, must be
     * a range between 0 and 1
     * @param volumeLevel 
     */
    setVolume(volumeLevel: number): void 
    {
        var currentVolume:number = volumeLevel;
        if( currentVolume >= 1 ) currentVolume = 1;
        if( currentVolume <= 0 ) currentVolume = 0;
        this.lastVolume = currentVolume;
        var currentPlay:HTMLAudioElement = this.audioList.get( this.currentPlay );
        currentPlay.volume = this.lastVolume;
    }
    
    /**
     * this will set auto loop if current play
     * @param enableLoop 
     */
    autoLoop(enableLoop: boolean): void {
        this.autoPlay = enableLoop;
        var currentPlay:HTMLAudioElement = this.audioList.get( this.currentPlay );
        if( this.autoPlay )
            currentPlay.autoplay = true;
        else
            currentPlay.autoplay = false;
    }

}