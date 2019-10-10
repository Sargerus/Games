const TELEPORT_WIDTH = playerModelWidth * 2;
const TELEPORT_HEIGHT = playerModelHeight * 4;

var teleports = [];

var teleportImage = 0;

function saveTeleport(teleport){

    if(teleports.lenght >= 3){
        destroy(teleport);
        teleport = null;
    } else {
        teleports.push(gameObject2D);
    }

    return teleport;
}

$(document).ready(() => {



});

function spawnTeleport(cordsStartPoint, cordsEndPoint){

    return saveTeleport(makeMeTeleport(
        gameObject2D({
            x: cordsStartPoint.x,
            y: cordsStartPoint.y,
            width: TELEPORT_WIDTH,
            height: TELEPORT_HEIGHT
    }, 
        gameObject2D({
            x: cordsEndPoint.x,
            y: cordsEndPoint.y,
            width: TELEPORT_WIDTH,
            height: TELEPORT_HEIGHT
    })
    )));

}