//collision
//gameObjects
//texture
//context
//utility

$(document).ready(() => {
    initializeGameEngine();
    var player = gameObjects.createNewObject(new Player(50,50,50,50,true,5));
    player.setTexture(texture.getTextureByName('default').texture);

    setInterval(() => {
        checkKeys();
        canvas.context2D.clearRect(0, 0, canvas.CANVAS_WIDTH, canvas.CANVAS_HEIGHT);
        gameObjects.objects2D.forEach(object2D => {
            utility2D.updateObject(object2D);
        });
}, 1000 / 30);

})