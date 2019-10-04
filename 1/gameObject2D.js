var objects2D = [];

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

    if(checkBounds(newGameObject2D) < 2){
    objects2D.push(newGameObject2D);
    } else {
        newGameObject2D = null;
    }

    return newGameObject2D;
}

function makeMeEnemy(gameObject2D){

    gameObject2D.type = 'enemy';
    gameObject2D.collisionId = gameObject2D.type + Math.random();
  
    gameObject2D.isActive = true;
  
    gameObject2D.color = "#00FF00";
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

    object.type = 'player';
    object.collisionId = object.type + Math.random();
    object.color = "#FF0000";
    object.left = 97;
    object.right = 100;
    object.up = 119;
    object.down = 115;
    object.fire = 102;
    object.update = function(){
        if(object.isActive = true){
        updateCanvas(object);
        fillCollision(object);
    }
    },

    object.actWith = function(object){
       
    }
    object.shoot = function(){

            var newObject = gameObject2D({x: object.x + Math.round(object.width / 2), y: object.y - 5, width: 3, height: 3},true)
            if(newObject !== null){
                makeMeBullet(newObject);
            }
    }

    gameObject2D.actWith = function(object){
        if(object.type === 'bound'){
        }
    if(object.type === 'enemy'){
        }
    },

    gameObject2D.playerBullets = [];

        return object;
}

function makeMeBullet(gameObject2D){
    
    gameObject2D.speed = 5;
    gameObject2D.type = 'bullet';
    gameObject2D.collisionId = gameObject2D.type + Math.random();
    gameObject2D.xVelocity = 0;
    gameObject2D.yVelocity = -gameObject2D.speed;
    gameObject2D.isMoving = true;
  
    gameObject2D.update = function() {
        if(gameObject2D.isActive == true){
    updateCanvas(gameObject2D);
    fillCollision(gameObject2D);
    if(gameObject2D.isMoving == true){
        move(gameObject2D,{x: gameObject2D.xVelocity, y: gameObject2D.yVelocity})
    }

    gameObject2D.actWith = function(object){
        if(object.type === 'bound'){
            destroy(gameObject2D);
            }
        if(object.type === 'enemy'){
            destroy(gameObject2D);
            destroy(object);
            }
        };
    }
};  

  fillCollision(gameObject2D);

    return gameObject2D;
}