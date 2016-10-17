/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/
var Rej = Rej || {};
Rej.Game = function(){};

var jumpTimer = 0;
var previousYvelocity;
var map;
var tileSize = 32;

Rej.Game.prototype = {
  create: function() {
    this.stage.backgroundColor = '#55B4FF';
    map = this.add.tilemap('world1-1');
    map.addTilesetImage('GenericPlateformer', 'GenericPlateformer');
    this.sky = map.createLayer('Sky');
    this.sky.scrollFactorX = 0.1;
    this.sky.alpha = 0.5;

    this.background = map.createLayer('Background');
    
    this.middle = map.createLayer('25D');  
    this.middle.scrollFactorX = 0.2;
    this.middle.alpha = 0.75;

    this.player = this.game.add.sprite(150, 500, 'rej');
    this.player.animations.add('idle', _.range(0,29), 24, true);
    this.player.animations.add('walk', _.range(30,62), 40, true);
    this.player.animations.add('jump', _.range(63,78), 60, false);
    this.player.animations.add('land', _.range(79,91), 60, false);
  	this.playerScore = 0;
  	this.game.physics.arcade.enable(this.player);
  	this.playerSpeed = 120;
    this.player.body.setSize(86,74,85,50)
    this.player.body.checkCollision.up = false;
    this.player.anchor.setTo(.5, .5);
    this.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.backward = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.ground = map.createLayer('Ground');  
    this.ground.resizeWorld();
    map.setCollisionBetween(1, 1000, true, this.ground);
    this.foreground = map.createLayer('Foreground');

    this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    
  },

  update: function() {
  	this.game.physics.arcade.collide(this.player, this.ground);
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
    checkSteps(this);
    checkBounds(this);
  },
};

function checkBounds(rej){
      if(rej.player.x < 100){
        rej.player.x = 100;
      }
      if (rej.player.y > 1000){
        rej.game.stateTransition.to('Game');
      }
}

/*
Mécanisme de l'escalier inspiré du code suivante : http://www.emanueleferonato.com/2015/05/12/phaser-tutorial-html5-player-movement-as-seen-in-ipad-magick-game-using-mostly-tile-maps/
*/
function checkSteps(rej){
      if(rej.player.body.blocked.right && rej.player.body.velocity.x > 0){
        if((!map.getTileWorldXY(rej.player.x+tileSize,rej.player.y-tileSize,tileSize,tileSize,rej.ground) && !map.getTileWorldXY(rej.player.x,rej.player.y-tileSize,tileSize,tileSize,rej.ground))){
          rej.player.x += tileSize + 1;
          rej.player.y -= tileSize;
        }
      }

      if(rej.player.body.blocked.left && rej.player.body.velocity.x < 0){
        if((!map.getTileWorldXY(rej.player.x-tileSize,rej.player.y-tileSize,tileSize,tileSize,rej.ground) && !map.getTileWorldXY(rej.player.x,rej.player.y-tileSize,tileSize,tileSize,rej.ground))){
          rej.player.x -= tileSize + 1;
          rej.player.y -= tileSize;
        }
      } 
}