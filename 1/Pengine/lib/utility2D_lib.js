class utility2D{

updateObjectCoordinates(object,step){
    collision.eraseCollision(object);
    moveObjectToDirection(object, step);
    collision.fillCollision(object);
}

moveObjectToDirection(object, step){
    //because here is only 2d moving is simple
    object.x += step.x;
    object.y += step.y;
}

static destroy(object){
    object.isActive = false;
    object.isMoving = false;
    collision.eraseCollision(object);
}

static move(object, step){
        var collisionObjectsAndCords = collision.getCollisionObjAndCords({
            x: object.x + step.x,
            y: object.y + step.y,
            width: object.width,
            height: object.height,
            collisionId: object.collisionId
        });
    
        collisionObjectsAndCords = collisionObjectsAndCords.filter((item, pos) => {
            return collisionObjectsAndCords.indexOf(item) == pos;
        });
    
        collisionObjectsAndCords = collisionObjectsAndCords.filter((item, pos) => {
            return item !== object.collisionId;
        });
    
         if(collisionObjectsAndCords.length != 0){
                collisionObjectsAndCords.forEach((obj) => {
                    object.actWith(obj, () => { this.updateObjectCoordinates(object, step)});
            });
         } else {
            this.updateObjectCoordinates(object,step);
         }
}

static updateObject(object) {
    if(object.isActive){
        context.updateCanvas(object);
        collision.fillCollision(object);    
    }
}
}