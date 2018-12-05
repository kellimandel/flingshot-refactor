var game;

import bootState from './boot.js';
import loadState from './load.js';

//...

var screenwidth=1280;
var screenheight=720;

window.app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        window.addEventListener('orientationchange', function() {
           console.log(screen.orientation.lock('landscape'));
        });
        return game;},

    onDeviceReady: function() {
        // NEW GAME OBJECT
        game = new Phaser.Game(screenwidth, screenheight, Phaser.CANVAS, 'gameDiv');

        //states
        game.state.add('boot', bootState);
        game.state.add('load', loadState);
        game.state.add('menu', menuState);
        game.state.add('instructions', instructionsState);
        game.state.add('play', window.playState);
        game.state.add('win', winState);
        game.state.add('lose', loseState);

        game.state.start('boot');


    },
};

app.initialize();
