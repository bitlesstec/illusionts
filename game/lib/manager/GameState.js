/**
 * those states are basic for most games, however
 * you can add more if you want
 */
export var GameState;
(function (GameState) {
    GameState[GameState["LOADING"] = 0] = "LOADING";
    GameState[GameState["PLAYING"] = 1] = "PLAYING";
    GameState[GameState["GAMEOVER"] = 2] = "GAMEOVER";
    GameState[GameState["COMPLETED"] = 3] = "COMPLETED";
    GameState[GameState["PAUSED"] = 4] = "PAUSED";
    GameState[GameState["STOPPED"] = 5] = "STOPPED";
    GameState[GameState["DIALOGUING"] = 6] = "DIALOGUING";
    GameState[GameState["INTRANSITION"] = 7] = "INTRANSITION";
})(GameState || (GameState = {}));
