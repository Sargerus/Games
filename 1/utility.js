var CANVAS_HEIGHT = 0;
var CANVAS_WIDTH = 0;

var canvas;
var collisionTable;
 
$(document).ready(() => {

    CANVAS_HEIGHT = $(window).width();
    CANVAS_WIDTH = $(window).height();

    const canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                            "' height='" + CANVAS_HEIGHT + "'></canvas>");

    canvas = canvasElement.get(0).getContext("2d");

    canvasElement.appendTo("body");

    collisionTable = new Array(CANVAS_WIDTH);
        for(let i = 0; i < collisionTable.length; i++){
    collisionTable[i] = new Array(CANVAS_HEIGHT);
}

for(let i = 0; i < CANVAS_HEIGHT; i++){
    for(let j = 0; j < CANVAS_WIDTH; j++){
        collisionTable[i][j] = {x:i, y:j};
    }
}  

})

function updateCanvas(object){
    canvas.fillStyle = object.color;
    canvas.fillRect(object.x, object.y, object.width, object.height);
}

function destroy(object){
    eraseCollision(object);
    object.isActive = false;
}

function collides(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }

function move(object, step){

    var collisionObjectsAndCords = getCollisionObjAndCords({
        x: object.x + step.x,
        y: object.y + step.y,
        width: object.width,
        height: object.height,
        collisionId: object.collisionId
    });

        var collisedObjects = collisionObjectsAndCords.filter(function(item, pos) {
            return collisionObjectsAndCords.indexOf(item) == pos;
        })

     if(collisedObjects.length != 0){
        collisedObjects.forEach((obj) => {
            object.actWith(obj);
        })
     } else {
         updateObjectCoordinates(object,step);
     }
}

function updateObjectCoordinates(object,step){
    eraseCollision(object);
    moveObjectToDirection(object, step);
    fillColission(object);
}

function moveObjectToDirection(object, step){
    //because here is only 2d moving is simple
    object.x += step.x;
    object.y += step.y;
}

function fillColission(object){
    for(let i = object.y; i < object.y + object.height; i++){
        for(let j = object.x; j < object.x + object.width; j++){
            collisionTable[i][j] = object;
        }
    }
}

function getCollisionObjAndCords(object){

    var collisionInfo = [];

    var boundsEquality = checkBounds({
        x: object.x,
        y: object.y,
        width: object.width,
        height: object.height
    });

    if(boundsEquality == 1 || boundsEquality == 2){
        collisionInfo.push({
            x: object.x,
            y: object.y,
            type: 'bound'
    });
}

    for(let i = object.y; i < object.y + object.height; i++){
    
    for(let j = object.x; j < object.x + object.width; j++ ){

            if(collisionTable[i][j].collisionId !== object.collisionId ){
                if(compareCords(collisionTable[i][j], {x:i,y:j}) != 0){
                collisionInfo.push(collisionTable[i][j]); 
                }
            }
        }
    }

    return collisionInfo;
}

function compareCords(a,b){
    var compare = 0;
    if((a.x == b.x) && (a.y == b.y)){
        compare = 0;
    } else compare = 1;

    return compare;
}


function eraseCollision(object){
    for(let i = object.y; i < object.y + object.height; i++){
        for(let j = object.x; j < object.x + object.width; j++){
            collisionTable[i][j] = {x: i, y: j};
        }
}
}

function checkBounds(object){
    //0 - less than bounds
    //1 - equal to bounds 
    //2 - out of bounds
    var equalityArray = [];

    //object left bound
    for(let i = object.y; i < object.y + object.height; i++ ){
        equalityArray.push(compareCordsWithBounds({x: object.x, y: i}));
    }

    //object upper bound
    for(let j = object.x; j < object.x + object.width; j++){
        equalityArray.push(compareCordsWithBounds({x: j, y: object.y}));
    }

    //object right bound
    for(let i = object.y; i < object.y + object.height; i++ ){
        equalityArray.push(compareCordsWithBounds({x: object.x + object.width, y: i}));
    }

    //object left bound
    for(let j = object.x; j < object.x + object.width; j++){
        equalityArray.push(compareCordsWithBounds({x: j, y: object.y + object.height}));
    }

    return Math.max(...equalityArray);
}

function compareCordsWithBounds(cords){
    var equality = 0;

    if(cords.x < CANVAS_WIDTH){
        equality = 0;
    }
    if(cords.y < CANVAS_HEIGHT){
        equality = 0;
    }
    if((cords.x == CANVAS_WIDTH) || (cords.x == 0)){
        equality = 1;
    }
    if((cords.y == CANVAS_HEIGHT) || (cords.y == 0)){
        equality = 1;
    }
    if((cords.x > CANVAS_WIDTH) || (cords.x < 0)){
        equality = 2;
    }
    if((cords.y > CANVAS_HEIGHT) || (cords.y < 0)){
        equality = 2;
    }
    return equality;
}