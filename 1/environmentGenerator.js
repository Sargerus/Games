var wallTexture;

function loadTexturePackages(){

    var wallTextureLoaded = false;
    wallTexture = new Image();

    wallTexture.onload = () => {
        wallTextureLoaded = true;
   }

    wallTexture.src = "./images/enemyTank.png";
    
    //TODO wait for all resources loaded

    return true;
}

function generateDefaultEnvironment(){

    borderWidth = Math.round(playerModelWidth / 2);
    borderHeight = Math.round(playerModelHeight / 2);
    for(let i = 0; i < CANVAS_HEIGHT - playerModelHeight; i += playerModelHeight){ 
        canvas.drawImage(wallTexture, 0, i, borderWidth, borderHeight);
        canvas.drawImage(wallTexture, CANVAS_WIDTH - playerModelWidth / 2, i, borderWidth, borderHeight);
    }

    for(let i = 0; i < CANVAS_HEIGHT - playerModelHeight; i += playerModelHeight){ 
        collisionTable[borderWidth][i] = object2DTypes.bound;
        collisionTable[CANVAS_WIDTH - borderWidth][i] = object2DTypes.bound;
    }

    for(let i = playerModelWidth; i < CANVAS_WIDTH - playerModelWidth; i += playerModelWidth){ 
        canvas.drawImage(wallTexture, i, CANVAS_HEIGHT - borderHeight, borderWidth, borderHeight);
    }

    for(let i = playerModelWidth; i < CANVAS_WIDTH - playerModelWidth; i += playerModelWidth){
        collisionTable[i][CANVAS_HEIGHT - borderHeight] = object2DTypes.bound;
     }
}