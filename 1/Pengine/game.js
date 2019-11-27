//collision
//gameObjects
//texture
//context
//utility



$(document).ready(() => {
    initializeGameEngine();
    var player = Pengui.gameObjects.createNewObject(new Player(50,50,50,50,true,1));
    //control.setControls(player);
    player.setTexture(Pengui.texture.getTextureByName('default').texture);

    startGameLoop();

    // setInterval( ()=> {
    //     Pengui.render();
    // }, 1000 / Pengui.lengthTick);

    // startGameLoop();

//     setInterval(() => {
//         control.checkKeys();
//         // canvas.context2D.clearRect(0, 0, canvas.CANVAS_WIDTH, canvas.CANVAS_HEIGHT);
//         gameObjects.objects2D.forEach(object2D => {
//             Utility2D.updateObject(object2D);
//         });
// }, 1000 / 60);

});



startGameLoop = function(){

globalVariables = new Object;
globalVariables.lastTick = 0;

    function main( tFrame ){
        globalVariables.stopGameLoopToken = window.requestAnimationFrame( main );
        var nextTick = globalVariables.lastTick + Pengui.lengthTick;
        var numTicks = 0;

        if(tFrame > nextTick){
            numTicks = Math.floor( ( tFrame - nextTick ) / Pengui.lengthTick );
        } else if(tFrame === nextTick){
            numTicks = 1;
        } else {
            numTicks = 0;
        }

        queueUpdates(numTicks);
        render(tFrame);
    }

    function queueUpdates(numTicks){

        // Pengui.control.checkKeys();

        for(i=0;i<numTicks;i++){
            Pengui.update();
            globalVariables.lastTick += Pengui.lengthTick;
            //control.checkKeys();
            //gameObjects.objects2D.forEach(object2D => {
              //  P.updateObject(object2D);
            //});
        }
    
    }

    function render(numTicks){
        Pengui.render();
    }

    globalVariables.lastTick = performance.now();
    globalVariables.lastRender = globalVariables.lastTick;

    main(performance.now());
};

