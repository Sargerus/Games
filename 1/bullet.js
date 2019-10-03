function Bullet(bullet) {

    bullet.collisionId = "bullet" + Math.random();
    bullet.isActive = true;
    bullet.type = 'bullet';

    bullet.xVelocity = 0;
    bullet.yVelocity = -bullet.speed;
    bullet.width = 3;
    bullet.height = 3;
    bullet.color = "#000";
  
    bullet.inBounds = function() {
      return bullet.x >= 0 && bullet.x <= CANVAS_WIDTH &&
        bullet.y >= 0 && bullet.y <= CANVAS_HEIGHT;
    };
  
    bullet.update = function() {
    
    updateCanvas(this);
    fillColission(this);
    move(bullet,{x: bullet.xVelocity, y: bullet.yVelocity})

    bullet.isActive = bullet.isActive && bullet.inBounds();
    
};  

  fillColission(bullet);
    return bullet;
  }