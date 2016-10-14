/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/

var Rej = Rej || {};
 
//title screen
Rej.Game = function(){};
 
Rej.Game.prototype = {
  create: function() {
	//create player
	this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'rej');
	this.player.animations.add('idle', _.range(0,29), 24, true);
	this.player.animations.play('idle');
	this.playerScore = 0;
	this.game.physics.arcade.enable(this.player);
	this.playerSpeed = 120;
	this.player.body.collideWorldBounds = true;
  },
  update: function() {
  	if(this.game.input.activePointer.justPressed()) {
      
      //move on the direction of the input
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
      this.game.camera.follow(this.player);
    }
  },
};