/*global Phaser*/

// create a new scene named "Game"
var gameScene = new Phaser.Scene('Game');
 
// our game's configuration
var config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 800, // game width
  height: 600, // game height
  parent: 'phaser-app',
  pixelArt: true,
  scene: [bootScene, preloadScene, mainScene, warehouseScene, labScene, gameScene], // our newly created scene
  backgroundColor: '#ccc'
};
 
// create the game, and pass it the configuration
var game = new Phaser.Game(config);