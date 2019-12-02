    class Player extends gameObject2D {

    constructor(startX, startY, width, height, isActive, speed, texture = undefined, type = 'player'){
        super(startX, startY, width, height, isActive, speed, texture, type)

        this.projectilesStartPoints = [{x: this.x + Math.round(this.width / 2), y: this.y - 20}];
        this.stepRight = speed;
        this.stepDown = -this.speed;

        this.playerBullets = [];

        
        Pengui.control.setControls(this);
        Pengui.collision.fillCollision(this);
    }

    update(){
        // Pengui.control.invokeControls(this);
        // Pengui.control.checkKeys();
    }

    render(){
        
        Pengui.canvas.context2D.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }

    // shoot(){
    //     var newObject = gameObject2D({x: object.x + Math.round(object.width / 2), y: object.y - 10, width: 3, height: 3},true)
    //         if(newObject !== null){
    //             makeMeBullet(newObject);
    //         }
    // }

}