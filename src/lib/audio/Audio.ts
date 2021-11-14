import { Config } from "../cfg/Config.js";
import { AudioManager } from "./AudioManager.js";

/**
 * this is a wrapper for Audio file which contains a name and a buffer, as well as
 * the other properties to keep controlled each separate sound, this class also
 * will keep all resources needed to create/play sounds, i mean, every time a 
 * sound is played it will create a new instance of AudioBufferSourceNode
 */
export class Audio
{
    name:string;
    audioBuffer:AudioBuffer;
    sourceNode:AudioBufferSourceNode;
    length:number;
    loop:boolean;
    audioCtx:AudioContext;
    isPlaying:boolean;
    // start:number;


    constructor( name:string, buffer:AudioBuffer, loop:boolean=false )
    {
        this.name = name
        this.loop = loop;
        this.audioBuffer = buffer;
        this.audioCtx = AudioManager.audioCtx;
        this.sourceNode =  this.audioCtx.createBufferSource();
        this.sourceNode.buffer = buffer;
        this.sourceNode.connect( this.audioCtx.destination );
        this.sourceNode.loop = this.loop;
        console.log("loaded sound: ", name);
        this.isPlaying = false;
    }

    /**
     * this will return a new sourceNode of the current settings of Audio file,
     * this is useful cause to play a sound we have to create a new sourceNode
     * that's how web api works
     * @returns 
     */
    getSourceNode():AudioBufferSourceNode{
        let tempSourceNode:any = this.audioCtx.createBufferSource();
        tempSourceNode.buffer = this.audioBuffer
        tempSourceNode.connect( this.audioCtx.destination );
        tempSourceNode.loop = this.loop;
        tempSourceNode.id=this.name+"_"+(++Config.AUDIO_PLAYING_ID_COUNTER); 
        this.isPlaying=true;//does not matter under this approach TODO: improve this

        console.log(`before playing sound: ${AudioManager.playingList.size} : ${tempSourceNode.id}`)
        AudioManager.playingList.set( tempSourceNode.id, tempSourceNode );
        console.log(`after playing sound: ${AudioManager.playingList.size}`)

        //when sound finish playing it will be removed from playingList
        tempSourceNode.onended = ()=>{
            console.log(`${this.name} - has ended`);
            this.isPlaying = false;
            console.log(`before stop onended: ${AudioManager.playingList.size}`)
            if( AudioManager.playingList.has( tempSourceNode.id ) )
            {
                console.log(`trying delete ${tempSourceNode.id}`)
                AudioManager.playingList.delete( tempSourceNode.id );
            }
            else console.log(":::NOT ENTER")
                
            console.log(`after stop onended: ${AudioManager.playingList.size}`)
        }

        return tempSourceNode;
    }

}