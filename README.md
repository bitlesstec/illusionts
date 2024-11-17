### IllusionTS
###### Typescript 2D canvas game library

## how to install
```npm install illusionts```

## repository
- gitlab ```https://gitlab.com/pavul/illusionts```
- github ```https://github.com/bitlesstec/illusionts```

## Branches Content
- **master** this is the most stable copy of the library ready to use
- **develop** this is my development branch use it under your own risk


## Youtube Channel
- Here i show how to use the library, installation, level, sprite and some game examples, here you have a list of videos: https://www.youtube.com/watch?v=txcBRog8BhM&list=PLHzmvRibTrMdAaW02Yg3kvsTLrTbjwTW5&index=1
- new channel with updated content: https://www.youtube.com/@BitlessTec


## how to use it

- put this code in your index.ts:
```typescript
 import { Game } from "illusionts";
 import Level1 from "./Level1";
 const game:Game = Game.getInstance("canvas", 640, 480);
    game.loadLevel( new Level1() )
    window.onload =function(){ game.run(); } 
```

- then in you can create your level like:
```typescript
import { BaseLevel } from "illusionts"
export default class Level1 extends BaseLevel
{
    constructor(){ super(640, 480) }
    render(ctx: CanvasRenderingContext2D): void 
    {
        ctx.fillStyle = "#000"
        ctx.fillRect( 0,0, 640, 480)
        ctx.fillStyle = "#FFF"
        ctx.fillText(" HI FROM ILLUSIONTS...", 20, 20)
    }
}
```