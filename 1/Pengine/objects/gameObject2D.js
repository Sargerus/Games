var gameObjects2D = {
    // object2DTypes = {
    //     player:             { collisionId:  'player',               defaultTexture: textures.getTexture('default') },
    //     enemy:              { collisionId:  'enemy',                defaultTexture: textures.getTexture('default') },
    //     projectile:         { collisionId:  'projectile',           defaultTexture: textures.getTexture('default') },
    //     bound:              { collisionId:  'bound',                defaultTexture: textures.getTexture('default') },
    //     teleportStartPoint: { collisionId:  'teleportStartPoint',   defaultTexture: textures.getTexture('default') },
    //     teleportEndPoint:   { collisionId:  'teleportEndPoint',     defaultTexture: textures.getTexture('default') },
    // },
    collisionGroups: (new Set())(),
    objects2D: [],
    add: function(){
        var newGameObject2D = new Object();

        newGameObject2D.x        = sizeAndCords.x;
        newGameObject2D.y        = sizeAndCords.y;
        newGameObject2D.width    = sizeAndCords.width;
        newGameObject2D.height   = sizeAndCords.height;
        newGameObject2D.isActive = active;
        newGameObject2D.speed    = speed;
        newGameObject2D.defaultTexture  = textures.getTexture('default');
        this.objects2D.push(newGameObject2D);
        return newGameObject2D;
    },
    get,
    makeMeEnemy = function (gameObject2D){

        // gameObject2D.type = 'enemy';
        gameObject2D.collisionId = object2DTypes.enemy.collisionId + Math.random();
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
}
var objects2D = [];

function clearGarbage2D(){
    objects2D = objects2D.filter((object2D) => {
        return object2D.isActive == true;
    })
}

// function gameObject2D(sizeAndCords, active){
//     var newGameObject2D = new Object();

//     newGameObject2D.x        = sizeAndCords.x;
//     newGameObject2D.y        = sizeAndCords.y;
//     newGameObject2D.width    = sizeAndCords.width;
//     newGameObject2D.height   = sizeAndCords.height;
//     newGameObject2D.isActive = active;
//     newGameObject2D.speed    = speed;

//     objects2D.push(newGameObject2D);

//     // if(checkBounds(newGameObject2D) < 2){
//     // objects2D.push(newGameObject2D);
//     // } else {
//     //     newGameObject2D = null;
//     // }

//     return newGameObject2D;
// }

function spawnEnemy(object){

return  makeMeEnemy(gameObject2D({
        x: object.x,
        y: object.y,
        width: playerModelWidth,
        height: playerModelHeight,
        speed: object.speed
        },object.isActive));

}

// function makeMeEnemy(gameObject2D){

//     // gameObject2D.type = 'enemy';
//     gameObject2D.collisionId = object2DTypes.enemy.collisionId + Math.random();
//     gameObject2D.image = new Image();
//     gameObject2D.image.src = './images/enemyTank.png';
//     gameObject2D.isActive = true;
//     gameObject2D.projectilesStartPoints = [{x: gameObject2D.x + Math.round(gameObject2D.width / 2), y: gameObject2D.y - 20}];
  
//     // gameObject2D.color = "#00FF00";
//     gameObject2D.xVelocity = 0
//     gameObject2D.yVelocity = 2;
    
  
//     gameObject2D.update = function() {
//         if(gameObject2D.isActive = true){
//             updateCanvas(gameObject2D);
//             fillCollision(gameObject2D);    
//         }
//     };

//     fillCollision(gameObject2D);
  
//     return gameObject2D;
// }

function makeMePlayer(object){

    // object.type = 'player';
    object.collisionId = object2DTypes.player.collisionId + Math.random();
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
    gameObject2D.collisionId = gameObject2D.projectile.collisionId + Math.random();
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

function makeMeTeleport(startPoint, endPoint){

    var teleport = new Object();

    teleport.startPoint = startPoint;
    teleport.endPoint = endPoint;

    startPoint.collisionId = object2DTypes.teleportStartPoint.collisionId + Math.random();
    endPoint.collisionId = object2DTypes.teleportEndPoint.collisionId + Math.random();

    startPoint.image = new Image();
    endPoint.image = new Image();

    startPoint.image.src = './images/teleportStartPoint.png';
    endPoint.image.src = './images/teleportEndPoint.png';

    startPoint.isActive = startPoint.isActive;
    endPoint.isActive = endPoint.isActive;

    teleport.update = function() {
        if(teleport.startPoint.isActive = true){
            updateCanvas(startPoint);
            fillCollision(startPoint);    
        }

        if(teleport.endPoint.isActive = true){
            updateCanvas(endPoint);
            fillCollision(endPoint);    
        }
        
    };

    startPoint.actWith = function(object, actionBeforeAct = null){

    };

    endPoint.actWith = function(object, actionBeforeAct = null){

    };

    fillCollision({ x: startPoint.x, 
                    y: startPoint.y + Math.round(startPoint.height / 2), 
                    width: playerModelWidth,
                    height: playerModelHeight * 2 })
    fillCollision({ x: endPoint.x, 
                    y: endPoint.y + Math.round(endPoint.height / 2), 
                    width: playerModelWidth,
                    height: playerModelHeight * 2 });

    return teleport;
}