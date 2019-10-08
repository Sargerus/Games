var objects2D = [];

const object2DTypes = {
    player: 'player',
    enemy: 'enemy',
    projectile: 'projectile',
    bound: 'bound'
}

function clearGarbage2D(){
    objects2D = objects2D.filter((object2D) => {
                    return object2D.isActive == true;
                        })
}

function gameObject2D(sizeAndCords, active){
    var newGameObject2D = new Object();

    newGameObject2D.x        = sizeAndCords.x;
    newGameObject2D.y        = sizeAndCords.y;
    newGameObject2D.width    = sizeAndCords.width;
    newGameObject2D.height   = sizeAndCords.height;
    newGameObject2D.isActive = active;
    newGameObject2D.speed = speed;

    objects2D.push(newGameObject2D);

    // if(checkBounds(newGameObject2D) < 2){
    // objects2D.push(newGameObject2D);
    // } else {
    //     newGameObject2D = null;
    // }

    return newGameObject2D;
}

function spawnEnemy(object){

return  makeMeEnemy(gameObject2D({
        x: object.x,
        y: object.y,
        width: playerModelWidth,
        height: playerModelHeight,
        speed: object.speed
        },object.isActive));

}

function makeMeEnemy(gameObject2D){

    // gameObject2D.type = 'enemy';
    gameObject2D.collisionId = object2DTypes.enemy + Math.random();
    gameObject2D.image = new Image();
    gameObject2D.image.src = './images/enemyTank.png';
    gameObject2D.isActive = true;
    gameObject2D.projectilesStartPoints = [{x: gameObject2D.x + Math.round(gameObject2D.width / 2), y: gameObject2D.y - 20}];
  
    // gameObject2D.color = "#00FF00";
    gameObject2D.xVelocity = 0
    gameObject2D.yVelocity = 2;
    
  
    gameObject2D.update = function() {
        if(gameObject2D.isActive = true){
            updateCanvas(gameObject2D);
            fillCollision(gameObject2D);    
        }
    };

    fillCollision(gameObject2D);
  
    return gameObject2D;
}

function makeMePlayer(object){

    // object.type = 'player';
    object.collisionId = object2DTypes.player + Math.random();
    object.image = new Image();
    object.image.src = './images/playerTank.png';
    object.image.id = 'xui';
    object.projectilesStartPoints = [{x: object.x + Math.round(object.width / 2), y: object.y - 20}];
    // object.color = "#FF0000";
    object.stepRight = object.speed / 5;
    object.stepDown = -object.speed / 5;
    object.update = function(){
        if(object.isActive = true){
        
        updateCanvas(object);
        // rotateImage(180, object.image.id);
        fillCollision(object);
        
    }
    },

    object.actWith = function(object){
       
    }
    object.shoot = function(){

            var newObject = gameObject2D({x: object.x + Math.round(object.width / 2), y: object.y - 10, width: 3, height: 3},true)
            if(newObject !== null){
                makeMeBullet(newObject);
            }
    }

    gameObject2D.actWith = function(object){
        if(object.type === object2DTypes.bound){
        }
    if(object.type === object2DTypes.enemy){
        }
    },

    gameObject2D.playerBullets = [];

        return object;
}

function makeMeBullet(gameObject2D){
    
    gameObject2D.speed = 5;
    gameObject2D.type = object2DTypes.projectile;
    gameObject2D.collisionId = gameObject2D.type + Math.random();
    gameObject2D.xVelocity = 0;
    gameObject2D.yVelocity = -gameObject2D.speed;
    gameObject2D.isMoving = true;
    gameObject2D.image = new Image();
    gameObject2D.image.src = './images/playerTank.png';
  
    gameObject2D.update = function() {
        if(gameObject2D.isActive == true){
            updateCanvas(gameObject2D);
           // fillCollision(gameObject2D);
    if(gameObject2D.isMoving == true){
        move(gameObject2D,{x: gameObject2D.xVelocity, y: gameObject2D.yVelocity})
    }
    }
};

gameObject2D.actWith = function(object, actionBeforeAct){
    if(object.type === object2DTypes.bound){
        destroy(gameObject2D);
        }
    if(object.type === object2DTypes.enemy){
        destroy(gameObject2D);
        destroy(object);
        }
    if(object.type === object2DTypes.projectile){
        actionBeforeAct();
        }
    };

  fillCollision(gameObject2D);

    return gameObject2D;
}