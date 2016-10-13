 window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload () {

            game.load.spritesheet('rej', 'ressources/images/tiger-sprites.png', 256, 128, 92);

        }

        function create () {

            var rej = game.add.sprite(0, 0, 'rej');
           	var walk = rej.animations.add('walk');
           	rej.animations.play('walk', 24, true);

        }

        function update() {

        }

    };