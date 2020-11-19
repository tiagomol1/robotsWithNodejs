var robot = require("robotjs");

robot.setKeyboardDelay(100);
robot.setMouseDelay(100);
console.log('start robot...')

robot.moveMouse(20, 740);
robot.mouseClick();
robot.typeString("cmd");
robot.keyTap("enter");

setTimeout(() => {
  console.log('abre diretório')
},10000);
robot.typeString("cd C:/NodeJS/GrupoMeta/Robos/ConsultaReceita && code .");
robot.keyTap("enter");



