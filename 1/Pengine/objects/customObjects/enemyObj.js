class makeMeEnemy extends gameObject2D{

    constructor(startX, startY, width, height, isActive, speed, texture = undefined, type = 'enemy'){
        super(startX, startY, width, height, isActive, speed, texture, type);

        this.projectilesStartPoints = [{x: this.x + Math.round(this.width / 2), y: this.y - 20}];
        this.xVelocity = 0;
        this.yVelocity = 2;
    }

    update(){
        super.update();
    }
}