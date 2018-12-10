const studentXs = [320,610,915,175,1095];
const studentYs = [280,280,280,525,525];


class Student{

    constructor(studentNum, audios, collGroup){
        this.studentNum = studentNum;
        this.audio = audios[studentNum];
        this.addStudent('student'+(studentNum+1), studentXs[studentNum], studentYs[studentNum]);
        this._sprite.body.clearShapes();
        this._sprite.body.loadPolygon('physicsData'+(studentNum+1), 'student'+(studentNum+1)+'-active');
        this._sprite.body.setCollisionGroup(collGroup);

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

    collides(collGroup, ballHit, state){
        this._sprite.body.collides(collGroup,ballHit,state);

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
        return this._sprite.loadTexture('student'+(this.studentNum+1),0);
    }

}

export default Student;