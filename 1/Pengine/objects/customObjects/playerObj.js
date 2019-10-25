    class player extends gameObject2D {

    constructor(startX, startY, width, height, isActive, speed, texture = undefined, type = 'player'){
        super(startX, startY, width, height, isActive, speed, texture, type)

        this.projectilesStartPoints = [{x: object.x + Math.round(object.width / 2), y: object.y - 20}];
        this.stepRight = speed / 5;
        this.stepDown = -object.speed / 5;

        this.playerBullets = [];
    }
    
    update(){
        super.update();
    }

    shoot(){
        var newObject = gameObject2D({x: object.x + Math.round(object.width / 2), y: object.y - 10, width: 3, height: 3},true)
            if(newObject !== null){
                makeMeBullet(newObject);
            }
    }

}