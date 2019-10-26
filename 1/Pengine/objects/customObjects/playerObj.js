    class Player extends gameObject2D {

    constructor(startX, startY, width, height, isActive, speed, texture = undefined, type = 'player'){
        super(startX, startY, width, height, isActive, speed, texture, type)

        this.projectilesStartPoints = [{x: this.x + Math.round(this.width / 2), y: this.y - 20}];
        this.stepRight = speed / 5;
        this.stepDown = -this.speed / 5;

        this.playerBullets = [];
    }

    // shoot(){
    //     var newObject = gameObject2D({x: object.x + Math.round(object.width / 2), y: object.y - 10, width: 3, height: 3},true)
    //         if(newObject !== null){
    //             makeMeBullet(newObject);
    //         }
    // }

}