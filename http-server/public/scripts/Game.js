/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/

var Rej = Rej || {};
Rej.Game = function(){};

var jumpTimer = 0;
var previousYvelocity;

Rej.Game.prototype = {
  create: function() {

    var map = this.add.tilemap('map');
    map.addTilesetImage('Ground', 'ground');
    map.addTilesetImage('Tree', 'tree');
    map.addTilesetImage('fleche', 'fleche');
    map.addTilesetImage('crate', 'crate');

    this.layer = map.createLayer('Ground');
    this.decor = map.createLayer('Decors');
    this.layer.resizeWorld();

    map.setCollisionBetween(1, 1000, true, this.layer);

   	this.player = this.game.add.sprite(150, 350, 'rej');
  	this.player.animations.add('idle', _.range(0,29), 24, true);
    this.player.animations.add('walk', _.range(30,62), 40, true);
    this.player.animations.add('jump', _.range(63,78), 60, false);
    this.player.animations.add('land', _.range(79,91), 60, false);
  	this.playerScore = 0;
  	this.game.physics.arcade.enable(this.player);
  	this.playerSpeed = 120;
  	this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(.5, .5);
    
    this.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.backward = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    
  },

  update: function() {
  	this.game.physics.arcade.collide(this.player, this.layer);
    this.player.body.velocity.x = 0;

    if (previousYvelocity != 0 && this.player.body.onFloor()){
      this.player.animations.play('land');
    }

    if (this.forward.isDown) {
      this.player.body.velocity.x = +250;
    }
    
    if (this.backward.isDown) {
      this.player.body.velocity.x = -250;
    }

    if (this.player.body.velocity.x > 0 ){
    	if (!this.player.animations.getAnimation('jump').isPlaying && !this.player.animations.getAnimation('land').isPlaying && this.player.body.onFloor()){
    		this.player.animations.play('walk');
    	} 
      this.player.scale.x = 1;
    }

    if (this.player.body.velocity.x < 0 ){
    	if (!this.player.animations.getAnimation('jump').isPlaying && !this.player.animations.getAnimation('land').isPlaying && this.player.body.onFloor()){
    		this.player.animations.play('walk');
    	}    	
      this.player.scale.x = -1;
    }

    if (!this.player.animations.getAnimation('jump').isPlaying && !this.player.animations.getAnimation('land').isPlaying && this.player.body.velocity.x == 0){
      this.player.animations.play('idle');
    }

    if (this.jump.isDown && this.player.body.onFloor()){
    	this.player.animations.play('jump').onComplete.add(function(){
    		this.player.body.velocity.y = -650;
        	jumpTimer = this.game.time.now + 750;
    	}, this);
    }

    previousYvelocity = this.player.body.velocity.y;
  },
};