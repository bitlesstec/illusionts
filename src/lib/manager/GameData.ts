import { GameManager } from "./GameManager.js";




export class GameData
{

    static gameDataName:string="gameData";
    private static data:Map< string, any > = new Map<string, any>();
    
    /**
     * will return game data map if no key is provided, but will return
     * specific key value if provided
     * @param key 
     * @returns 
     */
    static getData(key?:string)
    {
        if( key )
        {
            return this.data.get(key);
        }
        else
        {
            return this.data;
        }
    }


    /**
     * will set the object in the speficic key of the map, 
     * objects to set can be string, numbers, booleans or inclusive other objects
     * @param key 
     * @param val 
     */
    static  setData(key:string, val:any)
    {
        this.data.set(key, val);
    }

    /**
     * this will save current game data in localStorage if no key providad,
     * but if key is provided then it will save the item in local storage with that key
     */
    static  save(key?:string)
    {
        if( key )
        {
            GameManager.getInstance().localStorage.setItem( key, JSON.stringify(this.data.get(key) ) )
        }
        else
        {
            //if keynot provided save all gameData
            GameManager.getInstance().localStorage.setItem( GameData.gameDataName, JSON.stringify(this.data))
        }
        
    }


    /**
     * this will load and return the data saved in localStorage:
     * if key is provided will return the item for the specific key like  localStorage.getItem( key )
     * if key not provided will load the data into data.Map<string, any> 
     * 
     * 
     * @param key 
     * @returns 
     */
    static load(key?:string)
    {
        try{
            if( key )
            {
                return GameManager.getInstance().localStorage.getItem( key ); 
            }
            else
            {
                const gData = GameManager.getInstance().localStorage.getItem( GameData.gameDataName );
                if(gData)
                {
                    GameData.data = new Map<string, any>(Object.entries(gData));
                    return true;
                }   
                return undefined;
            }
        }catch(error)
        {
            console.error(`Error Loding Game Data... ${error}`)
            return undefined;
        }

        
    }


}