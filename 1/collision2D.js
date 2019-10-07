var CANVAS_HEIGHT = 0;
var CANVAS_WIDTH = 0;

var canvas;
var collisionTable;
 
$(document).ready(() => {

    CANVAS_HEIGHT = $(window).height() - 25;
    CANVAS_WIDTH = $(window).width() - 15;

    const canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                            "' height='" + CANVAS_HEIGHT + "'></canvas>");

    canvas = canvasElement.get(0).getContext("2d");

    canvasElement.appendTo("body");

    collisionTable = new Array(CANVAS_WIDTH);
        for(let i = 0; i < collisionTable.length; i++){
    collisionTable[i] = new Array(CANVAS_HEIGHT);
}

for(let i = 0; i < CANVAS_WIDTH; i++){
    for(let j = 0; j < CANVAS_HEIGHT; j++){
        collisionTable[i][j] = {x:i, y:j};
    }
}

})

function updateCanvas(object){
    if(object.image.complete){
        canvas.drawImage(object.image, object.x, object.y, object.width, object.height);
    } else {
        object.image.onload = () => {
            canvas.drawImage(object.image, object.x, object.y, object.width, object.height);
        }
    }
    
    // canvas.fillStyle = object.color;
    // canvas.fillRect(object.x, object.y, object.width, object.height);
}

function destroy(object){
    eraseCollision(object);
    canvas.clearRect(object.x, object.y, object.x + object.width, object.y + object.height);
    object.isActive = false;
    object.isMoving = false;
}

function move(object, step){

    var collisionObjectsAndCords = getCollisionObjAndCords({
        x: object.x + step.x,
        y: object.y + step.y,
        width: object.width,
        height: object.height,
        collisionId: object.collisionId
    });

    collisionObjectsAndCords = collisionObjectsAndCords.filter((item, pos) => {
        return collisionObjectsAndCords.indexOf(item) == pos;
    })

    collisionObjectsAndCords = collisionObjectsAndCords.filter((item, pos) => {
        return item !== object.collisionId;
    })

     if(collisionObjectsAndCords.length != 0){
        collisionObjectsAndCords.forEach((obj) => {
            object.actWith(obj);
        })
     } else {
         updateObjectCoordinates(object,step);
     }
}

function updateObjectCoordinates(object,step){
    eraseCollision(object);
    moveObjectToDirection(object, step);
    fillCollision(object);
}

function moveObjectToDirection(object, step){
    //because here is only 2d moving is simple
    object.x += step.x;
    object.y += step.y;
}

function fillCollision(object){

    //left bound
    for(let i = object.y; i < object.y + object.height; i++){
            collisionTable[object.x][i] = object.collisionId;
    }

    //upper bound
    for(let j = object.x; j < object.x + object.width; j++){
        collisionTable[j][object.y] = object.collisionId;
    }

    //right bound
    for(let i = object.y; i < object.y + object.height; i++ ){
        collisionTable[object.x + object.width][i] = object.collisionId;
    }

    //object bottom bound
    for(let j = object.x; j < object.x + object.width; j++){
        collisionTable[j][object.y + object.height] = object.collisionId;
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
} else {

//object left bound
if(object.y >= 0){
for(let i = object.y; i < object.y + object.height && i >= 0; i++ ){
    if(collisionTable[object.x][i].collisionId !== object.collisionId ){
                    if(compareCords(collisionTable[object.x][i], {x:object.x,y:i}) != 0){
                    collisionInfo.push(collisionTable[object.x][i]); 
                    }
                }
}
}

    //object upper bound
    if(object.x >= 0){
    for(let j = object.x; j < object.x + object.width && j >= 0; j++){
            if(collisionTable[j][object.y].collisionId !== object.collisionId ){
                if(compareCords(collisionTable[j][object.y], {x:j,y:object.y}) != 0){
                collisionInfo.push(collisionTable[j][object.y]); 
                }
            }
        }
    }

    //object right bound
    if(object.y >= 0){
    for(let i = object.y; i < object.y + object.height && i >= 0; i++ ){
        if(collisionTable[object.x + object.width][i].collisionId !== object.collisionId ){
            if(compareCords(collisionTable[object.x + object.width][i], {x:object.x + object.width,y:i}) != 0){
            collisionInfo.push(collisionTable[object.x + object.width][i]); 
            }
        }
    }
    }

    //object bottom bound
    if(object.x >= 0){
    for(let j = object.x; j < object.x + object.width && j >= 0; j++){
        if(collisionTable[j][object.y + object.height].collisionId !== object.collisionId ){
            if(compareCords(collisionTable[j][object.y + object.height], {x:j,y:object.y + object.height}) != 0){
            collisionInfo.push(collisionTable[j][object.y + object.height]); 
            }
        }
    }
}

    // for(let i = object.y; i < object.y + object.height; i++){
    
    // for(let j = object.x; j < object.x + object.width; j++ ){

    //         if(collisionTable[i][j].collisionId !== object.collisionId ){
    //             if(compareCords(collisionTable[i][j], {x:i,y:j}) != 0){
    //             collisionInfo.push(collisionTable[i][j]); 
    //             }
    //         }
    //     }
    // }
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

    //left bound
    for(let i = object.y; i < object.y + object.height; i++){
        collisionTable[object.x][i] = {x: object.x, y: i};
    }

    //upper bound
    for(let j = object.x; j < object.x + object.width; j++){
        collisionTable[j][object.y] = {x: j, y: object.y};
    }

    //right bound
    for(let i = object.y; i < object.y + object.height; i++ ){
        collisionTable[object.x + object.width][i] = {x: object.x + object.width, y: i};
    }

    //object bottom bound
    for(let j = object.x; j < object.x + object.width; j++){
        collisionTable[j][object.y + object.height] = {x: j, y: object.y + object.height};
    }
//     for(let i = object.y; i < object.y + object.height; i++){
//         for(let j = object.x; j < object.x + object.width; j++){
//             collisionTable[i][j] = {x: i, y: j};
//         }
// }
}

function checkBounds(object){
    //0 - less than bounds
    //1 - equal to bounds 
    //2 - out of bounds
    var equalityArray = [];
    var outOfBounds = false;
    var comparingResult = 0;

    //object left bound
for(let i = object.y; i < object.y + object.height; i++ ){
    comparingResult = compareCordsWithBounds({x: object.x, y: i});
    if(comparingResult == 2){
            outOfBounds = true;
    }
    equalityArray.push(comparingResult);
}

if(outOfBounds == false){
    //object upper bound
    for(let j = object.x; j < object.x + object.width; j++){
        comparingResult = compareCordsWithBounds({x: j, y: object.y});
        if(comparingResult == 2){
            outOfBounds = true;
        }
        equalityArray.push(comparingResult);
    }
}

if(outOfBounds == false){
    //object right bound
    for(let i = object.y; i < object.y + object.height; i++ ){
        comparingResult = compareCordsWithBounds({x: object.x + object.width, y: i});
        if(comparingResult == 2){
            outOfBounds = true;
        }
        equalityArray.push(comparingResult);
    }
}

if(outOfBounds == false){
    //object bottom bound
    for(let j = object.x; j < object.x + object.width; j++){
        comparingResult = compareCordsWithBounds({x: j, y: object.y + object.height});
        if(comparingResult == 2){
            outOfBounds = true;
        }
        equalityArray.push(comparingResult);
    }
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

function rotateImage(degree, objectId) {
	$('#' + objectId).animate({  transform: degree }, {
    step: function(now,fx) {
        $(this).css({
            '-webkit-transform':'rotate('+now+'deg)', 
            '-moz-transform':'rotate('+now+'deg)',
            'transform':'rotate('+now+'deg)'
        });
    }
    });
}