//initializing of global variables
var currentMousePos = {};
var playerModelWidth = 25;
var playerModelHeight = 25;

//every game object use speed based on this variable
var speed = playerModelWidth / 5;

loadTexturePackages();

$(document).ready(() => {

const FPS = 60;

player = makeMePlayer(gameObject2D({
              x: Math.round(CANVAS_WIDTH / 2),
              y: Math.round(CANVAS_HEIGHT / 2),
              width: playerModelWidth,
              height: playerModelHeight,
              speed: speed
              },true));


InitializeDefaultControlSettingsOf(player);
// generateDefaultEnvironment();

$(document).mousemove(function(e) {
  currentMousePos.x = e.pageX;
  currentMousePos.y = e.pageY;
});

function update(){
    checkKeys();
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    generateDefaultEnvironment(CANVAS_WIDTH, CANVAS_HEIGHT, playerModelWidth, playerModelHeight);
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








