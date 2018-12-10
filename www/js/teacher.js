class Teacher{
    constructor(game,x,y,teachColl){
        this._sprite = game.add.sprite(x,y, 'teacher');
        game.physics.p2.enable(this._sprite);
        this._sprite.body.static = true;
        this._sprite.body.clearShapes();
        this._sprite.body.loadPolygon('physicsDataTeacher','Teacher graphic');
        this._sprite.alpha = 1;
        this._sprite.body.setCollisionGroup(teachColl);
        this._sprite.body.collides(ballCollisionGroup);
        this._sprite.body.collides(ballCollisionGroup,this.teacherHit,this);







        //teacher hand animations
///////////////////////////// teacher hit
        ////////////// teacher x 465 teacher y 112

    }
    walk(){
        this._sprite.animations.add('walk');
        this._sprite.animations.play('walk',3,true);

    }

    pauseAnimation(){
        this._sprite.animations.paused = true
    }
    
    teacherHit(){
        game.physics.arcade.collide(ball,teacher,this.screenshake(),null,this)
    }

}