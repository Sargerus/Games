var coollision;
var gameObjects;
var texture;
var context;

function initializeGameEngine(){
    
    context = loadWorkArea2D();    

    //load default collision library
    collision = loadCollisionLibrary(context);
                
    //load default engine object support
    gameObjects = loadGameObjectLibrary();

    //ladoad default engine texture support
    texture = loadTextureLibrary();
}