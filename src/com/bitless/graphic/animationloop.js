/**
 * this will define the order wich the frames of an sprite will be updated...
 * FORWARD will be from frame 0 to last frame and star over again
 * BACKWARD will be from lastFrame to frame 0 and star over again
 * STOPATEND will be from 0 to last frame, however it wont start over again
 */
export var AnimationLoop;
(function (AnimationLoop) {
    AnimationLoop[AnimationLoop["FORWARD"] = 0] = "FORWARD";
    AnimationLoop[AnimationLoop["BACKWARD"] = 1] = "BACKWARD";
    AnimationLoop[AnimationLoop["STOPATEND"] = 2] = "STOPATEND";
})(AnimationLoop || (AnimationLoop = {}));
