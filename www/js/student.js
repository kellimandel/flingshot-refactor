const studentXs = [320,610,915,175,1095];
const studentYs = [280,280,280,525,525];

class Student{
    constructor(studentNum){
        this.studentNum = studentNum;
        this.audio = this.setUpAudio()[studentNum];
        this.addStudent('student'+(studentNum+1), studentXs[studentNum], studentYs[studentNum]);
        this._sprite.body.clearShapes();
        this._sprite.body.loadPolygon('physicsData'+(studentNum+1), 'student'+(studentNum+1)+'-active');

    }

    setUpAudio(){
        let pain1male = window.game.add.audio('pain1male');
        let pain2male = window.game.add.audio('pain2male');
        let pain3fem = window.game.add.audio('pain3fem');
        let pain4fem = window.game.add.audio('pain4fem');
        let pain5male = window.game.add.audio('pain5male');
        return [pain1male, pain2male, pain3fem, pain4fem, pain5male];
    }

    addStudent(image, x, y){
        this._sprite = window.game.add.sprite(x,y, image);
        window.game.physics.p2.enable(this._sprite);
        this._sprite.anchor.set(0.5,0.5);
        this._sprite.body.static = true;
    }

    setCollisionGroup(collGroup){
        this._sprite.body.setCollisionGroup(collGroup);
    }

    collides(collGroup, ballHit, playState){
        this._sprite.body.collides(collGroup,ballHit,playState);

    }

    playSound(){
        this.audio.play();
    }

    getX(){
        return studentXs[this.studentNum];
    }

    getY(){
        return studentYs[this.studentNum];
    }

    setAlpha(alpha){
        this._sprite.alpha = alpha;
    }

    resetTexture(){
        this._sprite.loadTexture('student'+(this.studentNum+1),0);
    }

}

export default Student;