var currentMousePos = {};
var playerModelWidth = 25;
var playerModelHeight = 25;
var speed = playerModelWidth / 5;

$(document).ready(() => {

const FPS = 30;

player = makeMePlayer(gameObject2D({
              x: Math.round(CANVAS_WIDTH / 2),
              y: Math.round(CANVAS_HEIGHT / 2),
              width: playerModelWidth,
              height: playerModelHeight,
              speed: speed
              },true));

loadTexturePackages();
InitializeDefaultControlSettingsOf(player);
// generateDefaultEnvironment();

$(document).mousemove(function(e) {
  currentMousePos.x = e.pageX;
  currentMousePos.y = e.pageY;
});

function update(){
    checkKeys();
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    generateDefaultEnvironment();
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








