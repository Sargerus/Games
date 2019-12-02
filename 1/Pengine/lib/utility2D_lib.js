class Utility2D{

static updateObjectCoordinates(object,step)
{
    if(object.x != step.x || object.y != step.y)
    {
        Pengui.collision.moveCollision(object, step);
        Utility2D.clearNonShiftedAreas(object,step);
        Utility2D.moveObjectToDirection(object, step);
        Pengui.plsRememberToUpdateMe(object);
    }
}

//don't know how to implement
static clearNonShiftedAreas(object, step) 
{
    //time-being
    Pengui.canvas.context2D.clearRect(object.x, object.y, object.width, object.height);
}

static moveObjectToDirection(object, step)
{
    //because here is only 2D moving is simple
    object.x += step.x;
    object.y += step.y;
}

static destroy(object)
{
    object.isActive = false;
    object.isMoving = false;
    collision.eraseCollision(object);
}

static move(object, step) //step = { x: , y: }
{ 
    //get all objects that object will "touch" after step
    var collisionObjectsAndCords = Pengui.collision.getCollisionObjAndCords({
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
    
    if(collisionObjectsAndCords.length != 0)
    {
        collisionObjectsAndCords.forEach((obj) => {
            object.actWith(obj, () => { Utility2D.updateObjectCoordinates(object, step)});
        });
    } else {
        Utility2D.updateObjectCoordinates(object,step);
    }
}

static compareCords(a,b)
{
    var compare = 0;
    if((a.x == b.x) && (a.y == b.y))
    {
        compare = 0;
    } else compare = 1;

    return compare;
}

static updateObject(object) 
{
    if(object.isActive)
    {
        canvas.updateCanvas(object);
        collision.fillCollision(object);    
    }
}
}