class bullet extends gameObject2D {
    constructor(startX, startY, width, height, isActive, speed = 5, texture = undefined, type = 'bullet'){
        super(startX, startY, width, height, isActive, speed, texture, type);

        this.xVelocity = 0;
        this.yVelocity = -gameObject2D.speed;
        this.isMoving = true;
    }
  
    update() {
        if(this.isActive){
            updateCanvas(this);
        if(this.isMoving){
            move(this,{x: this.xVelocity, y: this.yVelocity})
        }
        }
    }
}