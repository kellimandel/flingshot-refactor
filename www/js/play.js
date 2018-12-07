// import HealthBar from 'phaser-percent-bar';

import Ball from './ball.js';
import Arrow from './arrow.js';


let timerColor = "#00ff00";
let scoreColor = "rgba(255,255,255,0.7)";
let levelColor = "#68D81D";
let scoreFont = "Georgia, cursive";
let scoreBarColor = "be011f";
let scoreBarOutlineColor = 0xFFFFFF;
let timerBarColor = '#00cc00';
let scoreBar;
let scoreBarRectangle;
let spriteScore;
let timerBarRectangle;
let spriteTime;
let finalWarningOn = true;
let playMusic = true;
let gamePaused;
let slingshotX;
let slingshotY;
let slingshotHeight;
let ballinitx;
let ballinity;
let ballsInMotion;
let buttonXPos;
let buttonYPos;
let currentLevel;
let score;
let levelGoalIncrement;
let levelGoal;
let levelsGoals;
let wrongHitPoints;
let rightHitPoints;
let bground;
let studentCollisionGroup;
let ballCollisionGroup;
let teacherCollisionGroup;
let inactiveCollisionGroup;
let teacher;
let backgroundMusic;
let classroom;
let collisionSound;
let ticTok;
let pain1male;
let pain2male;
let pain3fem;
let pain4fem;
let pain5male;
let schoolbell;
let timerLevelDisplay;
let scoreDisplay;
let levelFont;
let emitter;
let studentXs;
let studentYs;
let arrayStudents;
let slingshot;
let arrow;
let pauseButton;
let levelupPopup;
let playButton;
let restartButton;
let group;
let scoreBarOutline;
let timerBarOutline;
let ballInSlingshot;
let timer; //timer for levels
let timerConstant; //each level is 30 seconds long
let timerEvent; //a timer for each level
let timeToChangeTarget;
let ballsTimer; //timer to create depth effects
let timerLevel; //timer for levels
let timerLevelConstant; //each break between levels is 3 seconds long
let timerLevelEvent; //a timer for each level
let randomIndex;
let randomStudent;
let ballCollided;
let studentNumber;
let studentnum;
let balballInSlingshot;
let studNum;


let playState = {


    create : function(){

        gamePaused = false;

        slingshotX = 450;
        slingshotY = 400;
        slingshotHeight = 340;
        ballinitx=slingshotX+100;
        ballinity=slingshotY+65;
        ballsInMotion = [];
        buttonXPos = 1100;
        buttonYPos = 115;
//    Scoring for game and levels
        currentLevel = 1;
        score = 0;
        levelGoalIncrement=[80,130,160,180,200,230,230,500];
        levelsGoals = [80,210,370,550,750,980,1210,1710];
        levelGoal = 80;
        // levelGoalIncrement=[10,130,160,180,200,230,230,260]; //for testing
        // levelsGoals = [10,20,40,80,750,980,1210,1470];  //for testing
        // levelGoal = 10; //for testing
        wrongHitPoints = 5;
        rightHitPoints = 10;

        bground = window.game.add.sprite(0,0,'background');
        bground.alpha = 1.0;
        bground.inputEnabled = true;

        //Collisions Groups
        studentCollisionGroup = window.game.physics.p2.createCollisionGroup();
        ballCollisionGroup = window.game.physics.p2.createCollisionGroup();
        teacherCollisionGroup = window.game.physics.p2.createCollisionGroup();
        inactiveCollisionGroup = window.game.physics.p2.createCollisionGroup();


        teacher =  window.game.add.sprite(465, 112, 'teacher');
        window.game.physics.p2.enable(teacher);
        teacher.body.clearShapes();
        teacher.body.loadPolygon('physicsDataTeacher','Teacher graphic');
        teacher.body.static = true;
        //teacher hand animations
        teacher.alpha = 1;
        let walk = teacher.animations.add('walk');
        teacher.animations.play('walk', 3, true);
        teacher.body.setCollisionGroup(teacherCollisionGroup);
        teacher.body.collides(ballCollisionGroup,this.teacherHit,this);






        // moves from world stage to group as a child
        // create an instance of graphics, then add it to a group

        let table = window.game.add.sprite(475, 135, 'table');
        table.alpha = 1;

        bground.events.onInputDown.add(this.holdBall);
        bground.events.onInputUp.add(this.launchBall);

        //adding sound effects to be used else where
        backgroundMusic = window.game.add.audio('background');
        classroom = window.game.add.audio('classroom');
        collisionSound = window.game.add.audio('collisionSound');
        ticTok = window.game.add.audio('tic');
        pain1male = window.game.add.audio('pain1male');
        pain2male = window.game.add.audio('pain2male');
        pain3fem = window.game.add.audio('pain3fem');
        pain4fem = window.game.add.audio('pain4fem');
        pain5male = window.game.add.audio('pain5male');
        schoolbell = window.game.add.audio('schoolbell');

        //This loads in fonts to be used later
        this.game.load.bitmapFont('myfont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        this.game.load.bitmapFont('LF','assets/fonts/level.png','assets/fonts/level.fnt');
        this.game.load.bitmapFont('WHF','assets/fonts/wrong.png','assets/fonts/wrong.fnt');




        timerLevelDisplay = window.game.add.text(500,450,'',{fill: '#ffffff' , fontSize: 50, stroke: '#ffffff', strokeThickness: 2});

        //Displays score with the myfont font
        scoreDisplay = window.game.add.bitmapText(650,16,'myfont','0',50);
        //Displays the level in the LF font
        levelFont = window.game.add.bitmapText(995,20,'LF','Level:',50);



        //adds spit particles to collisions with students
        emitter = window.game.add.emitter(0,0,100);
        emitter.makeParticles('bluecircle');
        emitter.minParticleScale = 0.018;
        emitter.maxParticleScale = 0.020;
        let spitGrouping = 500;
        emitter.minParticleSpeed = { x: -spitGrouping/2, y: -spitGrouping/2 };
        emitter.maxParticleSpeed = { x:  spitGrouping/4, y:  spitGrouping };
        emitter.gravity = 1000;



        //Students locations on the canvas
        studentXs = [320,610,915,175,1095];
        studentYs = [280,280,280,525,525];
        arrayStudents = [];

        for (let i=0; i<5; i++){
            let student = this.addStudent('student'+(i+1), studentXs[i], studentYs[i]);
            arrayStudents.push(student);
            student.body.clearShapes();
            student.body.loadPolygon('physicsData'+(i+1), 'student'+(i+1)+'-active');
            student.body.setCollisionGroup(studentCollisionGroup);
            student.body.collides(ballCollisionGroup,this.ballHit,this);
        }

        slingshot = window.game.add.sprite(slingshotX,slingshotY,'slingshot');
        slingshot.height = slingshotHeight;

        //the control arrow


        pauseButton = window.game.add.button(buttonXPos, buttonYPos, 'pauseButton', this.pause , this, 2, 1, 0);
        pauseButton.scale.setTo(0.19,0.19);

        levelupPopup = window.game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'pausePopup');
        levelupPopup.alpha = 0;
        levelupPopup.anchor.set(0.5,0.5);
        levelupPopup.inputEnabled = true;
        levelupPopup.input.enabled=false;




        playButton = window.game.add.sprite(game.world.centerX-200,game.world.centerY+40, 'MenuButton');
        playButton.anchor.set(0.5,0.5);
        playButton.scale.setTo(0.1,0.1);
        playButton.alpha=0;
        playButton.inputEnabled = true;
        playButton.input.enabled=false;
        playButton.events.onInputDown.add(this.play,this);

        restartButton = window.game.add.sprite(game.world.centerX+120, game.world.centerY-10,'resetButton');
        restartButton.scale.setTo(0.1,0.1);
        restartButton.inputEnabled  = true;
        restartButton.input.enabled = false;
        restartButton.alpha =0;
        restartButton.events.onInputDown.add(this.restart,this);

        //Creates the ScoreBar rectangle for us to later change the width of
        scoreBarRectangle= window.game.add.bitmapData(700 ,128);
        scoreBarRectangle.ctx.beginPath();
        scoreBarRectangle.ctx.rect(0,0,700,25);
        scoreBarRectangle.ctx.fillStyle = '#f10127';
        scoreBarRectangle.ctx.fill();
        //Turns our bitmap rectangle into a sprite
        spriteScore = window.game.add.sprite(300, 646, scoreBarRectangle);
        // Creates outlines to both the scoreBar along with the timerbar
        group = this.add.group();
        scoreBarOutline = this.game.add.graphics();
        timerBarOutline = this.game.add.graphics();
        timerBarOutline.beginFill(0x000000,.3);
        timerBarOutline.drawRect(300,675, 700,24);
        timerBarOutline.endFill();
        group.add(timerBarOutline);




        //Score Bar Outline
        scoreBarOutline.beginFill(0x000000,.3);
        scoreBarOutline.drawRect(300, 646, 700, 25);
        scoreBarOutline.endFill();
        group.add(scoreBarOutline);

        //Creates the rectangle for us to later change the width of
        timerBarRectangle = window.game.add.bitmapData(700,128);
        timerBarRectangle.ctx.beginPath();
        timerBarRectangle.ctx.rect(0,0,700,25);
        timerBarRectangle.ctx.fillStyle = timerBarColor;
        timerBarRectangle.ctx.fill();
        //Turns our bitmap rectangle into a sprite
        spriteTime = window.game.add.sprite(300,676,timerBarRectangle);


        randomIndex = Math.floor(Math.random() * 5);
        randomStudent = arrayStudents[randomIndex];
        let studentNumber = randomIndex+1;
        randomStudent.loadTexture('student'+studentNumber+'-active', 0);
        for( let i=0; i< arrayStudents.length; i++)
        {
            arrayStudents[i].alpha = 0.25;
        }
        randomStudent.alpha = 1;


        ballInSlingshot = new Ball(window.game, ballinitx, ballinity, ballCollisionGroup, teacherCollisionGroup, studentCollisionGroup);
        //Timer Instance
        timer = window.game.time.create(); //timer for levels
        timerConstant = 30; //each level is 30 seconds long
        timerEvent = timer.add(Phaser.Timer.SECOND * timerConstant, this.checkLevelGoal); //a timer for each level
        timeToChangeTarget = game.time.now + 4000;
        ballsTimer = window.game.time.events.loop(50, this.updateBalls, this); //timer to create depth effects

        timerLevel = window.game.time.create(); //timer for levels
        timerLevelConstant = 3; //each break between levels is 3 seconds long
        timerLevelEvent = timerLevel.add(Phaser.Timer.SECOND * timerLevelConstant, this.levelUpResume); //a timer for each level

        arrow = new Arrow();


        this.initiateTimer();
        this.initiateTimerLevel();

        playState.play();

    },

    spitBurst: function(ballX, ballY){
        emitter.x = ballX;
        emitter.y = ballY;
        emitter.start(true,350,null,10);
    },

    initiateTimer: function(){
        timer = window.game.time.create();
        timerEvent = timer.add(Phaser.Timer.SECOND * timerConstant, playState.checkLevelGoal);
        timer.start();
        playState.updateTimeToChangeTarget();

    },
//Timer color
    reinitiateTimer: function(){
        timer.stop();
        timer.destroy();
        playState.initiateTimer();
        finalWarningOn = true;

    },

    initiateTimerLevel: function(){
        timerLevel = window.game.time.create();
        timerLevelEvent = timerLevel.add(Phaser.Timer.SECOND * timerLevelConstant, this.levelUpResume);
        timerLevel.pause();
        timerLevelDisplay.visible = false;
    },

    destroyTimerLevel: function(){
        timerLevel.stop();
        timerLevel.destroy();
        playState.initiateTimerLevel();
    },

updateLevelUp: function(){
        levelFont.text = "Level: "+currentLevel;

    },
    //Gives you additional time for the final level
    updateBonusTime: function(){
        let secs = 0;
        if(score === 1300){
            timer.pause();
        }
        else if (score === 1330){
            timer.resume();
        }

    },
    updateScoreBar : function(){ //updates width of the ScoreBarRectangle so that it reflects progress through the level
        spriteScore.width = score*8.75;
        if (score<0){
            spriteScore.width =0}
        if (score === 80){
            spriteScore.width = 0;
        }
        else if (score> 80){
            spriteScore.width = (score-80) * 5.384} // Math for width = (score - previous Level goal) * 700/point goal increment
        if (score === 210){
            spriteScore.width =0 }
        else if (score > 210){
            spriteScore.width = (score-210)*4.375}
        if (score === 370){
            spriteScore.width =0}
        else if(score > 370){
            spriteScore.width = (score-370)* 3.888889}
        if (score === 550){
            spriteScore.width =0}
        else if(score > 550){
            spriteScore.width = (score -550)* 3.5}
        if (score === 750){
            spriteScore.width = 0}
        else if (score > 750){
            spriteScore.width = (score - 750) *3.04347826087 }
        if (score === 980){
            spriteScore.width =0}
        else if (score > 980){
            spriteScore.width = (score-980)*3.04347826087}
        if (score === 1210){
            spriteScore.width = 0}
        else if (score>1210){
            spriteScore.width = (score-1210)*.71428571428}
        if (score === 1710){
            spriteScore.width = 700}

    },
    updateTimerBar : function(){ //Changes the width of the timerBarRectangle to match the timer
        spriteTime.width = (timer.ms/30000)*700;
        let endTime = 10;
        let timerOver = 29.9;
        if(timer.ms/1000 > timerConstant - endTime && timer.ms/1000 < (timerConstant - endTime + .01)   && finalWarningOn ){
            finalWarningOn = false;
            ticTok.play();
        }
    },
    updateMusic : function(){
        let startMusic = 0.1;
        if(currentLevel === 1 && timer.ms/1000 < startMusic){
            backgroundMusic.loopFull();
            classroom.loopFull();
        }
        if(gamePaused === true){
            backgroundMusic.pause();
            classroom.pause();
        }
        if(gamePaused === false && classroom.pause){
            classroom.resume();
            backgroundMusic.resume();
        }
    },


    addStudent : function(image, x, y){
        let student = window.game.add.sprite(x,y, image);
        window.game.physics.p2.enable(student);
        student.anchor.set(0.5,0.5);
        student.body.static = true;
        return(student);
    },

    holdBall : function() {
        arrow.show();
        ballInSlingshot.setBodyStatic(true);
    },



    launchBall : function () {
        let arrowLengthX = arrow.getArrowX() - arrow.getOriginX();
        let arrowLengthY = arrow.getArrowY() - arrow.getOriginY();
        if(Math.abs(arrowLengthY) > 3){
            ballInSlingshot.setBodyStatic(false);
            let XVector = (arrowLengthX) *13;
            let YVector = (arrowLengthY) *13;
            ballInSlingshot.setXVelocity(XVector);
            ballInSlingshot.setYVelocity(YVector);
            ballInSlingshot.setZVelocity( - arrowLengthY / 10);
            ballsInMotion.push(ballInSlingshot);
            ballInSlingshot = new Ball(window.game, ballinitx, ballinity, ballCollisionGroup, teacherCollisionGroup, studentCollisionGroup);
        }
        arrow.hide();
    },

    updateBalls : function () {
        for (let i=0; i< ballsInMotion.length ; i++){
            if (ballsInMotion[i].getTimesHitFloor() > 4){
                ballsInMotion[i].kill();
                ballsInMotion.splice(i, 1);
            } else{
                ballsInMotion[i].updateSize();
            }
        }
    },

    ballHit : function(student, ball) {
        ballCollided = true;
        if (student.x === randomStudent.x && student.y === randomStudent.y){
            playState.studentHit(ball.x, ball.y);
            studentnum = randomIndex+1;
            window.game.time.events.add(Phaser.Timer.SECOND * 10000, randomStudent.loadTexture('student'+studentnum, 0), this);
            playState.chooseStudent();
            score += rightHitPoints;
        }
        else{
            playState.showScoreTween("lose", ball.x, ball.y);
            score -= wrongHitPoints;
        }
        ball.setCollisionGroup(inactiveCollisionGroup); //
    },

//Points flashing after a hit
    showScoreTween : function (action, x, y){
        let text;
        let deltaScore;
        if (action === "add"){
//      var text = game.add.text(x,y,'+'+ rightHitPoints,{fill: '#00ff00', fontWeight: 'bold' , fontSize: 60});
            text = window.game.add.bitmapText(x,y,'LF','+' + rightHitPoints,60);
            deltaScore = rightHitPoints;
        } else{
//      var text = game.add.text(x,y,'-'+ wrongHitPoints,{fill: '#ff0000', fontWeight: 'bold' , fontSize: 60});
            text = window.game.add.bitmapText(x,y,'WHF','-'+ wrongHitPoints,60);
            deltaScore= -wrongHitPoints;
        }
        //source: html5gamedevs.com
        window.game.time.events.add(
            300,
            function() {
                window.game.add.tween(text).to({x: 550, y: 16}, 600, Phaser.Easing.Linear.None, true); //text moves to x,y positions
                window.game.add.tween(text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);//text disappears
            });
        window.game.time.events.add(1000, function(){
            text.destroy();
        });

    },

    pause :  function (){
        pauseButton.alpha =0;
        playState.pausedState();
        playButton.alpha=1;
        playButton.input.enabled=true;

        restartButton.alpha = 1;
        restartButton.input.enabled = true;
        ticTok.pause();

    },

    pausedState: function(){
        window.game.physics.p2.pause();
        window.game.time.events.pause([ballsTimer]);
        timer.pause();
        teacher.animations.paused = true;
        bground.inputEnabled = false;
        gamePaused = true;

    },

    displayInvisible: function(){
        pauseButton.alpha = 0;

        timerBarOutline.alpha = 0;
        scoreBarOutline.alpha = 0;
        spriteScore.alpha = 0;
        spriteTime.alpha = 0;
    },

    displayVisible: function(){
        pauseButton.alpha = 1;
        timerBarOutline.alpha = 1;
        scoreBarOutline.alpha = 1;
        spriteScore.alpha = 1;
        spriteTime.alpha = 1;
    },


    changeState: function(){
        window.game.input.enabled = false; //Allows us to pause physics and keep the running feel going
        playState.displayInvisible();
        // game.physics.p2.pause();
        // game.time.events.pause([ballsTimer]);
        timer.pause();
        // teacher.animations.paused = true;
        bground.inputEnabled = false;
        gamePaused = true;
        randomStudent.alpha = 0.25
    },

    play :  function(){
        pauseButton.alpha = 1;
        window.game.physics.p2.resume();
        bground.inputEnabled = true;
        window.game.time.events.resume([ballsTimer]);
        timer.resume();
        playButton.alpha=0;
        playButton.input.enabled=false;
        restartButton.alpha =0;
        restartButton.input.enabled = false;
        playState.updateTimeToChangeTarget();
        teacher.animations.paused = false;
        gamePaused = false;
        ticTok.resume();

    },





    checkLevelGoal : function(level){
        if (score<levelGoal)
        {
            ticTok.pause();
            classroom.pause();
            backgroundMusic.pause();
            schoolbell.play();
            emitter.destroy();

            window.game.state.start('lose');
        }
        else
        {
            if(currentLevel === 7){
                window.game.input.enabled = false;
                window.game.state.start('win');
                ticTok.pause();
                backgroundMusic.pause();
                classroom.pause();
            }
            playState.changeState();
            ticTok.pause();
            levelupPopup.alpha=1;
            levelupPopup.input.enabled=true;
            pauseButton.inputEnabled = false;
            arrow.hide();

            timerLevel.start()
        }
    },


    levelUpResume: function(){
        levelGoal = levelsGoals[currentLevel];


        playState.destroyTimerLevel();
        playState.reinitiateTimer();
        currentLevel=currentLevel+1;

        pauseButton.inputEnabled = true;

        levelupPopup.alpha=0;
        levelupPopup.input.enabled=false;
        bground.inputEnabled = true;

        for(let i = 0; i<ballsInMotion.length; i++){
            ballsInMotion[i].destroy();
        }
        ballsInMotion = [];
        balballInSlingshot =  new Ball(window.game, ballinitx, ballinity, ballCollisionGroup, teacherCollisionGroup, studentCollisionGroup);

        //reset students graphics
        for(let i = 0; i<3; i++)
        {
            studNum = i+1;
            arrayStudents[i].loadTexture('student'+studNum,0);
        }
        randomStudent.alpha = 1;

        window.game.physics.p2.resume();
        window.game.input.enabled = true;
        window.game.time.events.resume();
        playState.displayVisible();
        gamePaused = false;
        teacher.animations.paused = false;
    },


    chooseStudent : function (){
        randomStudent.alpha = 0.25;
        studentnum = randomIndex+1;
        window.game.time.events.add(Phaser.Timer.SECOND * 10000, randomStudent.loadTexture('student'+studentnum, 0), this);
        let num = Math.floor((Math.random() * 5));
        while(num===randomIndex)
        {
            num = Math.floor((Math.random() * 5));
        }
        randomIndex=num;
        randomStudent = arrayStudents[randomIndex];
        studentNumber = randomIndex+1;
        randomStudent.loadTexture('student'+studentNumber+'-active', 0);
        randomStudent.alpha = 1;
        playState.updateTimeToChangeTarget();
    },

    studentHit: function (ballX, ballY){
        studentnum = randomIndex+1;
        if (studentnum===1){
            pain1male.play();
        }
        else if (studentnum===2){
            pain2male.play();
        }
        else if(studentnum===3){
            pain3fem.play();
        }
        else if(studentnum===4){
            pain4fem.play();
        }
        else if(studentnum===5){
            pain5male.play();
        }
        //collisionSound.play();
        randomStudent.alpha = 0.25;
        playState.spitBurst(ballX,ballY);
        playState.showScoreTween("add", ballX, ballY);
    },

    teacherHit: function(ball){
        window.game.physics.arcade.collide(ball, teacher, this.screenshake(), null, this);

    },

    screenshake: function(){
        this.camera.shake(0.01, 1000, true, Phaser.Camera.SHAKE_BOTH, true);
    },

    render :  function () {
        scoreDisplay.text = score ;
        timerLevelDisplay.text= this.formatTime(Math.round((timerLevelEvent.delay - timerLevel.ms) / 1000));


    },

    formatTime :  function(s) {
        let minutes = "0" + Math.floor(s / 60);
        let seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },


    update :  function () {
        arrow.update();
        this.updateMusic();
        this.updateBonusTime();

        this.updateScoreBar();
        this.updateTimerBar();


        this.updateLevelProgressBar();

        if (score>=levelGoal){
            this.checkLevelGoal();
        }

        this.updateTargetStudent();
        this.updateLevelUp();
    },

    updateLevelProgressBar: function() {
        let levelScore;
        let goal = levelGoalIncrement[currentLevel-1] ;
        if (currentLevel === 1){
            levelScore = score;
        }else{
            levelScore = score - levelsGoals[currentLevel-2];
        }


    },


    updateTargetStudent: function() {
        if (!gamePaused && window.game.time.now >= timeToChangeTarget){
            playState.chooseStudent();
        }
    },


    updateTimeToChangeTarget: function(){
        let factor;
        if(currentLevel < 7){
            factor = currentLevel;
        }
        else
        {
        factor = 7;
        }
//        var changeFactor = Array( factor+3, factor+2, factor+3, factor+1, factor+1, factor, factor,factor,factor,factor)[Math.floor(Math.random()*10)];
        let deltaTime = 4000 - 3600*(factor*1.45)/10; //shorten interval with higher level. level 10 at 0.8s
        timeToChangeTarget = window.game.time.now + deltaTime;

    },

    getCurrentScore: function(){
        return score;
    },
    restart : function() {
        window.game.state.start('play');
    }
    // Trying to put in a progress bar

};

export default playState;