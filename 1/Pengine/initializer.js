var coollision;
var gameObjects;
var texture;
var canvas;

function initializeGameEngine(){ 

    //load default collision library
    collision = loadCollisionLibrary(context);
                
    //load default engine object support
    gameObjects = loadGameObjectLibrary();

    //ladoad default engine texture support
    texture = loadTextureLibrary();

    //load canvas2D
    canvas = loadCanvas2D();
}