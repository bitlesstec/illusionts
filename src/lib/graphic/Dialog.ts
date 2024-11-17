import { CanvasUtil } from "../util/CanvasUtil";


/**
 * this class acts like a helper to create simple dialogs, it will only display
 * text at certain position.
 * - background for dialogs will have to be managed in
 * a different object or you can extend this class providing a proper background
 * either by color or displaying an image,
 * - for texts bigger than width, the text will be splitted in different lines.
 * - you can set how many lines to display at a time, by default 1 but it can be 
 * changed in showDialog method
 */
export class Dialog
{


    active:boolean;
    color:string;
    textList:string[];
    currentLine:number;
    showLines:number;
    
    constructor()
    {
        
        this.color="#FFF";
        this.textList = [];
        this.currentLine=0;
        this.showLines=1;
    }


   /**
    *   * this will display a dialog at x,y coordinates, if the text is too long
     * will be splited in smaller strings in order to fit dialogWidth, to move
     * to the next text, nextLine() should be called
    * @param ctx 
    * @param txt text to display ( will be splitted if does not fit width )
    * @param x 
    * @param y 
    * @param dialogWidth 
    * @param showLines set this to specify how many lines to show per text pagination
    * @param paddingY this is the value of y position between lines, higher values will separate y line positions
    */
    showDialog( ctx:CanvasRenderingContext2D, txt:string, x:number, y:number, dialogWidth:number, showLines:number=1, paddingY:number=14 )
    {
        
        if( this.active )
        {
            if( this.textList.length === 0 )
            {
                this.getTextLines(txt, dialogWidth);
                this.showLines = showLines;
            }

            ctx.fillStyle=this.color;
            
                let ypos = 1;
                for( let ln:number = this.currentLine; ln <= this.currentLine + (this.showLines-1)  /*&&  ln <= this.textList.length-1 */; ln++ )
                {
                    
                    if(ln <= this.textList.length-1)
                    {
                        // console.log(`showing line: ${ln} ,max: ${this.currentLine + (this.showLines-1)}  `)
                        ctx.fillText( this.textList[ ln ], x+8, y + ( ypos * paddingY ), dialogWidth );
                        ypos++;
                    }
                    
                }

        }
    }


    /**
     * it get the text to show in the dialog and it returns an array of possible text lines
     * to iterate over the lines use nextLine() function
     * @param txt 
     * @param maxWidth 
     */
    private getTextLines( txt:string, maxWidth:number)
    {
        const splitedTxt = txt.split(" ");
        this.textList = [];
        let line="";

        for( let idx=0; idx < splitedTxt.length ;idx++)
        {
            // console.log("word: ",splitedTxt[idx])
            // line += splitedTxt[idx]+" ";
            // console.log("Line Added: ",line)

            if( CanvasUtil.getTextWidth( line + splitedTxt[idx]+" " ) >= maxWidth )
            {
                
                this.textList.push( line );
                line = splitedTxt[idx]+" ";
                if(idx === splitedTxt.length-1 )this.textList.push( line );

            }
            else if( idx === splitedTxt.length-1 )
            {
                this.textList.push( line + splitedTxt[idx]+" ");
                line = "";
            }
            else
            {
                line += splitedTxt[idx]+" ";
            }

        }
        
    }//


    /**
     * every time this funtion is called, currentLine will be increased by one, 
     * in order to show next line in dialog, it returns true if last line is
     * reached
     * @param nextLine 
     */
    nextLine():boolean
    {
            //continue with dialog on next line
            this.currentLine += this.showLines;
            if( this.currentLine > this.textList.length-1 )
            {
                //close dialog when reaching max line 
                this.closeDialog();
                return true;           
            }
    return false; 
    }

    /**
     * this function can be used in the even to deactivate dialog, 
     * hence all variables will be reset to it initial values
     */
    closeDialog()
    {
        this.active=false;
        this.textList=[];
        this.currentLine=0;
    }

}