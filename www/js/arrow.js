const TAIL_WIDTH = 10;

class Arrow{
    constructor(){
        this.analog = window.game.add.sprite(300, 300, 'analog');
        this.analog.width = TAIL_WIDTH;
        this.analog.anchor.setTo(0.5,0);
        this.analog.rotation = 3.14/2;
        this.analog.alpha =0; //hide sprite

        this.tail = window.game.add.sprite(300, 300, 'tail');
        this.tail.width = TAIL_WIDTH;
        this.tail.anchor.setTo(0.5,1);
        this.tail.rotation = 3.14/2;
        this.tail.alpha = 0;

        this.arrow = window.game.add.sprite(300, 300, 'arrow');
        this.arrow.scale.setTo(0.1,0.1);
        this.arrow.anchor.setTo(0,0.5);
        this.arrow.alpha = 0;

        this.origin = window.game.add.sprite(300,300,'origin');
        this.origin.scale.setTo(0.02,0.02);
        this.origin.anchor.setTo(0.5,0.5);
        this.origin.alpha = 0;
    }

    show() {
        //create arrow where the pointer is
        this.origin.alpha = 1;
        this.arrow.alpha = 1;
        this.tail.alpha = 1;
        this.analog.alpha = 0.5;
        let originX = window.game.input.activePointer.worldX;
        let originY = window.game.input.activePointer.worldY;
        this.origin.x = originX;
        this.origin.y = originY;
        this.arrow.x = originX;
        this.arrow.y = originY;
        this.tail.x = originX;
        this.tail.y = originY;
        this.analog.x = originX;
        this.analog.y = originY;
    }

    hide(){
        this.origin.alpha = 0;
        this.arrow.alpha = 0;
        this.tail.alpha = 0;
        this.analog.alpha = 0;
    }

    update(){
        //source: phaser.io/examples
        if (window.game.input.activePointer.isDown){
            let dist = window.game.physics.arcade.distanceToPointer(this.origin);
            let angle = window.game.physics.arcade.angleToPointer(this.origin);

            if (Math.abs(angle) <= 0.05){
                this.arrow.rotation = 3.14;
            } else{
                this.arrow.rotation =  angle + 3.14;
            }
            this.tail.rotation = angle - 3.14/2;
            this.analog.rotation = angle - 3.14/2;

            this.tail.height = 0.5*dist;
            this.analog.height = dist;
            this.arrow.x = this.origin.x -  0.5*dist*Math.cos(angle);
            this.arrow.y = this.origin.y - 0.5*dist*Math.sin(angle);
        }
    }

    setArrowRotation(rotation){
        this.arrow.rotation = rotation;
    }

    setAnalogRotation(rotation){
        this.analog.rotation = rotation;
    }

    setTailRotation(rotation){
        this.tail.rotation = rotation;
    }

    setAnalogHeight(height){
        this.analog.height = height;
    }

    setTailHeight(height){
        this.tail.height = height;
    }


    getOriginX(){
        return this.origin.x;
    }

    getOriginY(){
        return this.origin.y;
    }

    getArrowX(){
        return this.arrow.x;
    }

    getArrowY(){
        return this.arrow.y;
    }
}

export default Arrow