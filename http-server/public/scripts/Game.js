/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/

var Rej = Rej || {};
Rej.Game = function(){};

Rej.Game.prototype = {
  create: function() {

    var map = this.add.tilemap('map');
    map.addTilesetImage('Ground', 'ground');
    map.setCollisionBetween(540, 570);

    this.layer = map.createLayer('Ground');
    this.layer.resizeWorld();

   	this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'rej');
  	this.player.animations.add('idle', _.range(0,29), 24, true);
    this.player.animations.add('walk', _.range(30,62), 40, true);
  	this.playerScore = 0;
  	this.game.physics.arcade.enable(this.player);
  	this.playerSpeed = 120;
  	this.player.body.collideWorldBounds = true;
    this.player.body.linearDamping = 1;

    
  },

  update: function() {
    this.game.physics.arcade.collide(this.player, this.layer);
    var forward = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    var backward = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    if (forward.isDown) {
      this.player.animations.play('walk');
    }  else {
      this.player.animations.play('idle');
    }
  },
};