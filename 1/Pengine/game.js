//collision
//gameObjects
//texture
//context
//utility
$(document).ready(() => {
    initializeGameEngine();
    var player = Pengui.gameObjects.createNewObject(new Player(50,50,50,50,true,1));
    player.setTexture(Pengui.texture.getTextureByName('default').texture);
});

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

        update(numTicks);
        render(tFrame);
    }

    function update(numTicks){

        for(i=0;i<numTicks;i++){
            globalVariables.lastTick += Pengui.lengthTick;
            Pengui.update();
            console.log("update:", Pengui.lastTick);
        }
    }

    function render(numTicks){
        Pengui.render();
        console.log("render:",numTicks);
    }

    globalVariables.lastTick = performance.now();
    globalVariables.lastRender = globalVariables.lastTick;

    //"main" calls infinite game loop
    main(performance.now());

