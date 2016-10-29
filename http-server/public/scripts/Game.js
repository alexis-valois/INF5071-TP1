/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/
var Rej = Rej || {};
Rej.Game = function(){};

var jumpTimer = 0;
var previousYvelocity;
var map;
var cafes;
var tileSize = 32;
var nbCafes = 0;
var playerSpeed = 250;

Rej.Game.prototype = {
  create: function() {
    this.stage.backgroundColor = '#55B4FF';
    map = this.add.tilemap('world1-1');
    map.addTilesetImage('GenericPlateformer', 'GenericPlateformer');
    this.sky = map.createLayer('Sky');
    this.sky.scrollFactorX = 0.1;
    this.sky.alpha = 0.5;

    this.middle = map.createLayer('25D');  
    this.middle.scrollFactorX = 0.2;
    this.middle.alpha = 0.75;

    this.background = map.createLayer('Background');

    this.player = this.game.add.sprite(150, 500, 'rej');
    this.player.animations.add('idle', _.range(0,29), 24, true);
    this.player.animations.add('walk', _.range(30,62), 40, true);
    this.player.animations.add('jump', _.range(63,78), 60, false);
    this.player.animations.add('land', _.range(79,91), 60, false);
  	this.playerScore = 0;
    this.game.physics.arcade.enable(this.player);
    this.player.body.setSize(26,74,115,50)
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
    
    cafes = this.game.add.physicsGroup();
    map.createFromObjects('Collectables', 'Cafe1', 'tasse', 0, true, false, cafes, Phaser.Sprite, false);
    cafes.callAll('animations.add', 'animations', 'idle', _.range(0,38), 24, true);
    cafes.callAll('animations.play', 'animations', 'idle');
    cafes.setAll('body.allowGravity', false);

  },

  update: function() {
  	this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, cafes, collectCafe, null, this);
    this.player.body.velocity.x = 0;

    if (previousYvelocity != 0 && this.player.body.onFloor()){
      this.player.animations.play('land');
    }

    if (this.forward.isDown) {
      this.player.body.velocity.x = +playerSpeed;
    }
    
    if (this.backward.isDown) {
      this.player.body.velocity.x = -playerSpeed;
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

function reset(){
  jumpTimer = 0;
  nbCafes = 0;
  playerSpeed = 250;
}

function checkBounds(rej){
      if(rej.player.x < 100){
        rej.player.x = 100;
      }
      if (!rej.player.inCamera){
        reset()
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

function collectCafe(player, cafe) {
    playerSpeed += 50;
    cafe.kill();
    var newCafe = this.game.add.sprite(10, 10, 'tasse');
    newCafe.frame = 4;
    newCafe.x += 16 + (nbCafes * 48);
    newCafe.height = 48;
    newCafe.width = 48;
    newCafe.fixedToCamera = true;
    nbCafes += 1;
}