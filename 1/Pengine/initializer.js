var coollision;
var gameObjects;
var texture;
var canvas;
var control;

var Pengui = new Object;

function initializeGameEngine(){ 

    //load canvas2D
    Pengui.canvas = loadCanvas2D();
    Pengui.is2DSet = true;

    //load default collision library
    Pengui.collision = loadCollisionLibrary(Pengui.canvas);
                
    //load default engine object support
    Pengui.gameObjects = loadGameObjectLibrary();

    //load default engine texture support
    Pengui.texture = loadTextureLibrary();

    //load default control settings
    Pengui.control = loadControlLibrary();

    $(document).keydown((event) => {
        control.mapKey(event);
    });

    $(document).keyup((event) => {
        control.mapKey(event);
    });

}