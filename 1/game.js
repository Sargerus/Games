$(document).ready(() => {

const FPS = 30;

player = makeMePlayer(gameObject2D({
              x: Math.round(CANVAS_WIDTH / 2),
              y: Math.round(CANVAS_HEIGHT / 2),
              width: 100,
              height: 100
              },true));

InitializeDefaultControlSettingsOf(player);

function update(){
    checkKeys();
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    objects2D.forEach(object2D => {
          object2D.update();
    });

};

setInterval(() => {
   update();
}, 1000/FPS);

setInterval(() => {
  clearGarbage2D();
}, 60000);

})








