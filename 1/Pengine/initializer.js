var coollision;
var gameObjects;
var texture;
var canvas;
var control;

function initializeGameEngine(){ 

    //load canvas2D
    canvas = loadCanvas2D();

    //load default collision library
    collision = loadCollisionLibrary(canvas);
                
    //load default engine object support
    gameObjects = loadGameObjectLibrary();

    //load default engine texture support
    texture = loadTextureLibrary();

    //load default control settings
    control = loadControlLibrary();

    $(document).keydown((event) => {
        control.mapKey(event);
    });

    $(document).keyup((event) => {
        control.mapKey(event);
    });

}