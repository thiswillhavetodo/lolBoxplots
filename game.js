/*global Phaser*/

// create a new scene named "Game"
var gameScene = new Phaser.Scene('Game');
 
// our game's configuration
var config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 1024, // game width
  height: 576, // game height
  parent: 'phaser-app',
  pixelArt: true,
  scene: [bootScene, preloadScene, menuScene, mainScene, mapScene, warehouseScene, labScene, gameScene], // our newly created scene
  backgroundColor: '#ccc'
};
 
// create the game, and pass it the configuration
var game = new Phaser.Game(config);

function LoLApi (messageName, payloadObj) {
    parent.postMessage({
        message: messageName,
        payload: JSON.stringify(payloadObj)
    }, 
'*');
}
