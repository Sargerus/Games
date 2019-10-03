function Enemy(cordX,cordY) {
    var enemy = new Object();
    enemy.collisionId = "enemy" + Math.random();
  
    enemy.isActive = true;
    enemy.age = Math.floor(Math.random() * 128);
  
    enemy.color = "#00FF00";
    enemy.x = cordX;
    enemy.y = cordY;
    enemy.xVelocity = 0
    enemy.yVelocity = 2;
  
    enemy.width = 32;
    enemy.height = 32;
    enemy.type = 'enemy';
    enemy.inBounds = function() {
      return enemy.x >= 0 && enemy.x <= CANVAS_WIDTH &&
        enemy.y >= 0 && enemy.y <= CANVAS_HEIGHT;
    };

    enemy.explode = function() {
      this.active = false;
    };
  
    enemy.update = function() {
    updateCanvas(this);
    fillColission(this);    
  
    enemy.isActive = enemy.isActive && enemy.inBounds();
    };

    fillColission(enemy);
  
    return enemy;
  };