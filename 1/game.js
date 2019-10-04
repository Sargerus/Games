$(document).ready(() => {

const stepRight = 2;
const stepDown = -2;
const FPS = 30;

player = makeMePlayer(gameObject2D({
              x: Math.round(CANVAS_WIDTH / 2),
              y: Math.round(CANVAS_HEIGHT / 2),
              width: 100,
              height: 100
              },true));

    $(document).keypress(function( event ){
        if(event.keyCode == player.left) {
            move(player,{x: -stepRight,
                         y: 0 });
        }
        if(event.keyCode == player.right) {
            move(player, {x: stepRight, 
                          y: 0});
        }
        if(event.keyCode == player.down) {
            move(player, {x: 0,
                          y: -stepDown});
        }
        if(event.keyCode == player.up) {
            move(player, {x: 0, 
                          y: stepDown});
        }
        if(event.keyCode == player.fire) {
            player.shoot();
        }
    }
    );

function update(){

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








