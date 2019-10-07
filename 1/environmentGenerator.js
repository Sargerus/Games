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
    //TODO change this algorithm to spawning objects with collision
    for(let i = 0; i < CANVAS_HEIGHT; i += CANVAS_HEIGHT / playerModelHeight + playerModelHeight / 3){
        canvas.drawImage(wallTexture, 0, i, playerModelHeight / 2, playerModelHeight / 2);
        canvas.drawImage(wallTexture, CANVAS_WIDTH - 22, i, playerModelWidth / 2, playerModelWidth / 2);
    }

    for(let i = 0; i < CANVAS_WIDTH; i += CANVAS_WIDTH / playerModelWidth + playerModelWidth / 3){
        canvas.drawImage(wallTexture, i, CANVAS_HEIGHT - 23, playerModelWidth / 2, playerModelWidth / 2);
    }
}