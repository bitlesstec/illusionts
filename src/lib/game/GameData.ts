

/**
 * this class uses localStorage to save/load the data of the game,
 * also this can be used to load and save objects for the game between levels
 */
export class GameData
{

     //this can be used to store some persistent data in player browser 
    static localStorage:Storage = <Storage>window.localStorage;

    static gameDataName:string="gameData";
    private static data:Map< string, any > = new Map<string, any>();

    static tempData:any = {};
    
      /**
     * Will return game data map if no key is provided, but will return
     * specific key value if provided.
     * @param key The key to retrieve the value for.
     * @param isNumber If true, the value will be parsed as a number.
     * @returns The value associated with the key, or the entire data map if no key is provided.
     */
      static getData(key?: string, isNumber: boolean = false): any {
        if (key) {
            const value = this.data.get(key);
            return isNumber ? parseFloat(value) : value;
        } else {
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
    static  save(key?:string):void
    {
        if( key )
        {
            GameData.localStorage.setItem( key, JSON.stringify(this.data.get(key) ) )
        }
        else
        {
            //if keynot provided save all gameData
            GameData.localStorage.setItem(GameData.gameDataName, JSON.stringify(Array.from(this.data.entries())));
        }
        
    }


   /**
     * This will load and return the data saved in localStorage:
     * if key is provided will return the item for the specific key like localStorage.getItem(key)
     * if key not provided will load the data into data.Map<string, any>.
     * @param key The key to load the value for.
     * @returns The loaded data or undefined if an error occurs.
     */
   static load(key?: string): any {
    try {
        if (key) {
            const item = GameData.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } else {
            const gData = GameData.localStorage.getItem(GameData.gameDataName);
            if (gData) {
                GameData.data = new Map<string, any>(JSON.parse(gData));
                return true;
            }
            return undefined;
        }
    } catch (error) {
        console.error(`Error Loading Game Data: ${error}`);
        return undefined;
    }
}



}