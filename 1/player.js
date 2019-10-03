var Player = {
    type: 'player',
    collisionId: "player" + Math.random(),
    isActive: true,
    color: "#FF0000",
    x: 200,
    y: 270,
    width: 32,
    height: 32,
    left: 97,
    right: 100,
    up: 119,
    down: 115,
    fire: 102,
    update: function(){
        updateCanvas(this);
        fillColission(this);
        this.playerBullets.forEach((bullet) => {
            bullet.update();
        });
        this.playerBullets = this.playerBullets.filter((bullet) => {
            return bullet.isActive;
        });
    },
    shoot: function(){

        this.playerBullets.push(Bullet({
            speed: 5,
            x: this.x + this.width / 2,
            y: this.y - 5,

            actWith(object){
                if(object.type === 'bound'){
                    destroy(this);
                }
                if(object.type === 'enemy'){
                    destroy(this);
                    destroy(object);
                }
            }
        }))
        },
    actWith: function(object){

    },
    playerBullets: []
}