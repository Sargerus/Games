$(document).ready(() => {

const stepRight = 2;
const stepDown = -2;
const FPS = 30;

var enemyX = 100;
var enemyY = 100;

  console.log(CANVAS_HEIGHT)
  console.log(CANVAS_WIDTH)

  var enemies = [];

  for(let i = 0; i < 3; i++) {
    enemies.push(Enemy(enemyX, enemyY));
    enemyX += 100;
    enemyY += 100; 
}
    player = new Object();
    player = Player;
    fillColission(player);

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
  player.update();
  enemies.forEach(function(enemy) {
      enemy.update();
    });    
  enemies = enemies.filter(function(enemy) {
        return enemy.isActive;
  });

};

setInterval(() => {
   update();
}, 1000/FPS);

})








