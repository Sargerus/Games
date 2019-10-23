function generateDefaultEnvironment(areaWidth, areaHeight, width, height){
    //width and height of main object on map

    borderWidth = Math.round(width / 2);
    borderHeight = Math.round(height / 2);
    for(let i = 0; i < areaHeight - height; i += height){ 
        canvas.drawImage(wallTexture, 0, i, borderWidth, borderHeight);
        canvas.drawImage(wallTexture, areaWidth - width / 2, i, borderWidth, borderHeight);
    }

    for(let i = 0; i < areaHeight - height; i += height / 2){ 
        collisionTable[borderWidth][i] = object2DTypes.bound;
        collisionTable[areaWidth - borderWidth][i] = object2DTypes.bound;
    }

    for(let i = width; i < areaWidth - width; i += width){ 
        canvas.drawImage(wallTexture, i, areaHeight - borderHeight, borderWidth, borderHeight);
    }

    for(let i = width; i < areaWidth - width; i += width / 2){
        collisionTable[i][areaHeight - borderHeight] = object2DTypes.bound;
     }
}