initializeGameEngine();

setInterval(() => {
        checkKeys();
        canvas.clearRect(0, 0, collision.CANVAS_WIDTH, collision.CANVAS_HEIGHT);
        // generateDefaultEnvironment(collision.CANVAS_WIDTH, collision.CANVAS_HEIGHT, playerModelWidth, playerModelHeight);
        gameObjects.objects2D.forEach(object2D => {
              object2D.update();
        });
}, 1000 / 30);