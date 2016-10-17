/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/

var Rej = Rej || {};
 
//loading the game assets
Rej.Preload = function(){};
 
Rej.Preload.prototype = {
  preload: function() {
   //show logo in loading screen
   this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
   this.splash.anchor.setTo(0.5);
 
   this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
   this.preloadBar.anchor.setTo(0.5);
 
   this.load.setPreloadSprite(this.preloadBar);
 
   //load game assets
   this.load.spritesheet('rej', 'assets/sprites/rej.png', 256, 128, 92);
   this.load.tilemap('world1-1', 'assets/maps/world1-1.json', null, Phaser.Tilemap.TILED_JSON);
   this.load.image('Ground', 'assets/tiles/ground.png');
   this.load.image('GenericPlateformer', 'assets/tiles/generic_platformer_tiles.png');
   
  },
  create: function() {
   //this.state.start('MainMenu');
   this.game.stateTransition.to('MainMenu');
  }
};