### IllusionTS
###### Typescript 2D game library

## Before Start
1. you need to have npm and node installed in your computer
2. then you can execute command ```npm install``` this will install all devDependencies and dependencies needed (including typescript)
3. download or clone this repository from master branch
4. open repo or add it to your workspace in visual studio code ( you need this installed also )

## To Start the game
- execute ```npm run build``` command if you are in linux/mac or ```npm run build.win``` if you are in windows after that execute:
- ```npm run start``` this will start an http-server where game is hosted
- enter url provided for ```npm run start``` command (http://localhost:8080/game.html)

## Branches Content
- **master** this is the clean copy of the library ready to use
- **develop** this is my working branch where i test new features dont use this for your games it may change without noticing
- **examples** this contains several levels to show you how to use the library to make collisions, rotations, sprites, levels, etc.

## Troubleshooting
- when you add a new asset it wont be reflected in game/asset folder when build, until you delete game folder and build again
- every time you start http-server you have to clean browser cache or data otherwise new changes won't be reflected

## Work in progress
- create scrolling platform with tileset and save data/game
