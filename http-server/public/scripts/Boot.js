/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/

var Rej = Rej || {};
 
Rej.Boot = function(){};
 
Rej.Boot.prototype = {

  preload: function() {
   //assets we'll use in the loading screen
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },

  create: function() {
   //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';
 
  
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    //physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preload');
  }
};