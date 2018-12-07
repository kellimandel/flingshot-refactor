const WALL_Z = 300;
const WALL_FLOOR = 260;

class Ball{

    constructor(game, x, y, ballColl, teachColl, studentColl){
        this._sprite = game.add.sprite(x, y, 'sprite');
        game.physics.p2.enable(this._sprite);
        this._sprite.scale.setTo(0.15,0.15);
        this._sprite.anchor.setTo(0.5, 0.5);
        this._sprite.body.setCircle(30); //for collision
        this._sprite.body.static = true;
        this._sprite.body.setCollisionGroup(ballColl);
        this._sprite.body.collides(teachColl);
        this._sprite.body.collides(studentColl);
        this._sprite.body.z =0;
        this._sprite.body.velocity.z = 0;
        this._sprite.hitFloor = false;
        this._sprite.floor = -1000;
        this._sprite.timesHitFloor =0;
    }

    setFloor(floor){
        this._sprite.floor = floor;
    }

    getFloor(){
        return this._sprite.floor;
    }

    setHitFloor(hitFloor){
        this._sprite.hitFloor = hitFloor;
    }

    getHitFloor(){
        return this._sprite.hitFloor;
    }

    incrTimesHitFloor(){
        this.timesHitFloor+=1;
    }

    getTimesHitFloor(){
        return this._sprite.timesHitFloor;
    }

    setBodyStatic(bool){
        this._sprite.body.static = bool;
    }

    getXVelocity(){
        return this._sprite.body.velocity.x;
    }

    getYVelocity(){
        return this._sprite.body.velocity.y;
    }

    getZVelocity(){
        return this._sprite.body.velocity.z;
    }

    setXVelocity(x){
        this._sprite.body.velocity.x = x;
    }

    setYVelocity(y){
        this._sprite.body.velocity.y = y;
    }

    setZVelocity(z){
        this._sprite.body.velocity.z = z;
    }

    kill(){
        this._sprite.kill();
    }

    getX(){
        return this._sprite.body.x;
    }

    getY(){
        return this._sprite.body.y;
    }

    getZ(){
        return this._sprite.body.z;
    }

    moveZ(){
        this._sprite.body.z += this._sprite.body.velocity.z;
    }

    setScale(size){
        this._sprite.scale.setTo(size,size);
    }

    setCollisionGroup(collGroup){
        this._sprite.sprite.body.setCollisionGroup(collGroup);
    }

    destroy(){
        this._sprite.destroy();
    }

    getSprite(){
        return this._sprite;
    }

    updateSize(){
        if(!this.getHitFloor()){
            if (this.getZ() >= WALL_Z){ //sprite hits back wall
                this.setXVelocity(0);
                this.setFloor(WALL_FLOOR);
            }else{ //update sprite size based on z-position
                this.moveZ();
                var size = 0.15/(1 + this.getZ()*0.003);
                this.setScale(size,size);
                this.setFloor((window.screenheight + 300) / (1 + this.getZ() * 0.01));
            }
        }
        if(this.getY() >= this.getFloor()){
            this.bounceOffFloor();
        }
    }

    bounceOffFloor(){
        this.setYVelocity(-this.getYVelocity()/2.5);
        this.setXVelocity(this.getXVelocity()/1.5);
        this.setFloor(this.getY());
        this.incrTimesHitFloor();
        this.setHitFloor(true);
    }

}

export default Ball;