const robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);
robot.setKeyboardDelay(2);

robot.keyTap("escape", "control");
robot.typeString("senior");
robot.keyTap("enter");
setTimeout(() => {
    robot.typeString("vetorh");
    return robot.keyTap("enter");
}, 1000);
setTimeout(() => {
    robot.typeString("administração");
    return robot.keyTap("enter");
}, 1000);