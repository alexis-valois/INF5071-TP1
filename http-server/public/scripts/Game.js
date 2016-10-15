/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/

var Rej = Rej || {};
Rej.Game = function(){};

var jumpTimer = 0;

Rej.Game.prototype = {
  create: function() {

    var map = this.add.tilemap('map');
    map.addTilesetImage('Ground', 'ground');
    

    this.layer = map.createLayer('Ground');
    this.layer.resizeWorld();

    map.setCollisionBetween(1, 10000, this.layer);

   	this.player = this.game.add.sprite(0, 350, 'rej');
  	this.player.animations.add('idle', _.range(0,29), 24, true);
    this.player.animations.add('walk', _.range(30,62), 40, true);
  	this.playerScore = 0;
  	this.game.physics.arcade.enable(this.player);
  	this.playerSpeed = 120;
  	this.player.body.collideWorldBounds = true;
    this.player.body.linearDamping = 1;


    
    this.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.backward = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
  },

  update: function() {
    this.game.physics.arcade.collide(this.player, this.layer);
    if (this.forward.isDown) {
      this.player.animations.play('walk');
    }
    else {
      this.player.animations.play('idle');
    }

    if (this.jump.isDown && this.player.body.onFloor() && this.game.time.now > jumpTimer)
    {
        this.player.body.velocity.y = -450;
        jumpTimer = this.game.time.now + 750;
    } 

  },
};