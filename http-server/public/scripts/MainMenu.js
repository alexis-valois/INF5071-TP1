/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/

Rej.MainMenu = function(){};
 
Rej.MainMenu.prototype = {
  create: function() {

  	this.stage.backgroundColor = '#000000';

    //start game text
    var text = "World 1-1";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);
 
    //highest score
    text = "Clic pour débuter";
    style = { font: "15px Arial", fill: "#fff", align: "center" };
  
    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      //this.game.state.start('Game');
      this.game.stateTransition.to('Game');
    }
  }
};