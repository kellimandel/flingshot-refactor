window.game;

import bootState from './boot.js';
import loadState from './load.js';
import menuState from './menu.js';
import playState from './play.js';
import winState from './win.js';
import loseState from './lose.js';
import instructionsState from './instructions.js';

//...

window.screenwidth=1280;
window.screenheight=720;

window.app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        window.addEventListener('orientationchange', function() {
           console.log(screen.orientation.lock('landscape'));
        });
        return window.game;},

    onDeviceReady: function() {
        // NEW GAME OBJECT
        window.game = new Phaser.Game(screenwidth, screenheight, Phaser.CANVAS, 'gameDiv');

        //states
        window.game.state.add('boot', bootState);
        window.game.state.add('load', loadState);
        window.game.state.add('menu', menuState);
        window.game.state.add('instructions', instructionsState);
        window.game.state.add('play', playState);
        window.game.state.add('win', winState);
        window.game.state.add('lose', loseState);

        window.game.state.start('boot');


    },
};

app.initialize();

// export default game;