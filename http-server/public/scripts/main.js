/*
Code adapté du tutoriel suivant : https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
*/
var Rej = Rej || {};

Rej.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
 
Rej.game.state.add('Boot', Rej.Boot);
Rej.game.state.add('Preload', Rej.Preload);
Rej.game.state.add('MainMenu', Rej.MainMenu);
Rej.game.state.add('Game', Rej.Game);
 
Rej.game.state.start('Boot');