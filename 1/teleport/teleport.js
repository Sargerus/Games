const TELEPORT_WIDTH = playerModelWidth * 2;
const TELEPORT_HEIGHT = playerModelHeight * 4;

var teleports = [];

var teleportImage = 0;

$(document).ready(() => {



});

function spawnTeleport(cords){


    var teleport = makeMeTeleport(gameObject2D({
        x: cords.x,
        y: cords.y,
        width: TELEPORT_WIDTH,
        height: TELEPORT_HEIGHT
    }, true));



}