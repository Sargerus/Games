/*************************************************************************************************************** 
 *                                              Collision library                                              *
 * Collision detection is based on collistion table. Collision table has the same dimension as canvas.         *
 * Its two-dimensional table rows of which contains null or object id.                                         *
 * Only object borders are taken into account. This is not necessary to check whole object pixels.             *
***************************************************************************************************************/
function loadCollisionLibrary(context2D){
    return new collision2D(context2D);
}

class collision2D {

    constructor(context2D){

        //initialize collision table
        this.collisionTable = new Array(context2D.CANVAS_WIDTH);

        for(let i = 0; i < this.collisionTable.length; i++){
            this.collisionTable[i] = new Array(context2D.CANVAS_HEIGHT);
        }
    
        for(let i = 0; i < context2D.CANVAS_WIDTH; i++){
            for(let j = 0; j < context2D.CANVAS_HEIGHT; j++){
                this.collisionTable[i][j] = {x:i, y:j};
            }
        }
    }
// action = {
//     xstartValue: 0,
//     ystartValue: 0,
//     widthstartValue: 0,
//     heightstartValue: 0,
//     collisionIdstartValue: "",
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//     collisionId: "",
//     validation() {},
//     resetValues() { this.x = this.xstartValue; this.y = this.ystartValue, this.width = this.widthstartValue, 
//                          this.height = this.heightstartValue, this.collisionId = this.collisionIdstartValue; },
//     prepareVariables() {},
//     action(){},
//     performAction() { this.resetValues(); this.prepareVariables(); if(this.validation()) { this.action(); } } 
// }

fillCollision(object){

    //left bound
    for(let i = object.y; i <= object.y + object.height; i++){
            this.collisionTable[object.x][i] = object.collisionId;
    }

    //upper bound
    for(let j = object.x; j <= object.x + object.width; j++){
        this.collisionTable[j][object.y] = object.collisionId;
    }

    //right bound
    for(let i = object.y; i <= object.y + object.height; i++ ){
        this.collisionTable[object.x + object.width][i] = object.collisionId;
    }

    //object bottom bound
    for(let j = object.x; j <= object.x + object.width; j++){
        this.collisionTable[j][object.y + object.height] = object.collisionId;
    }
}

getCollisionObjAndCords(object){

    var collisionInfo = [];

//     var boundsEquality = this.checkBounds({
//         x: object.x,
//         y: object.y,
//         width: object.width,
//         height: object.height
//     });

//     if(boundsEquality == 1 || boundsEquality == 2){
//         collisionInfo.push({
//             x: object.x,
//             y: object.y,
//             type: 'bound'
//     });  
// } else {

    var actionForBorder = action;
    actionForBorder.validation = function() { if(this.collisionTable[this.x][this.y].collisionId !== this.collisionId ){
        if(compareCords(this.collisionTable[this.x][this.y], {x:this.x,y:this.y}) != 0){
            return true;
        }}}

    actionForBorder.action = function(){ collisionInfo.push(this.collisionTable[this.x][this.y]); }
    actionsAroundBorders(object, 
        actionForBorder,
        actionForBorder,
        actionForBorder,
        actionForBorder
    );
    // actionsAroundBorders(( x = undefined, y = undefined, value1 = undefined, value2 = undefined, object1 = null, object2 = null )=>{
    //     if(this.collisionTable[object1.x][y].collisionId !== object1.collisionId ){
    //         if(compareCords(this.collisionTable[object1.x][y], {x:object1.x,y:y}) != 0){
    //             collisionInfo.push(this.collisionTable[object1.x][y]); 
    //         }
    //     }
    // },
    // ( x = undefined, y = undefined, value1 = undefined, value2 = undefined, object1 = null, object2 = null ) => {
    //     if(this.collisionTable[x][object1.y].collisionId !== object1.collisionId ){
    //         if(compareCords(this.collisionTable[x][object1.y], {x:x,y:object1.y}) != 0){
    //             collisionInfo.push(this.collisionTable[x][object1.y]); 
    //             }
    //         }
    //     },
    // ( x = undefined, y = undefined, value1 = undefined, value2 = undefined, object1 = null, object2 = null ) => {
    //     if(this.collisionTable[object1.x + object1.width][y].collisionId !== object1.collisionId ){
    //         if(compareCords(this.collisionTable[object1.x + object1.width][y], {x:object1.x + object1.width,y:y}) != 0){
    //             collisionInfo.push(this.collisionTable[object1.x + object1.width][y]); 
    //         }
    //     }
    // },
    // ( x = undefined, y = undefined, value1 = undefined, value2 = undefined, object1 = null, object2 = null ) => {
    //     if(this.collisionTable[x][object1.y + object1.height].collisionId !== object1.collisionId ){
    //         if(compareCords(this.collisionTable[x][object1.y + object1.height], {x:x,y:object1.y + object1.height}) != 0){
    //             collisionInfo.push(this.collisionTable[x][object1.y + object1.height]); 
    //         }
    //     }
    // }
    // )

//object left bound
// if(object.y >= 0){
// for(let i = object.y; i < object.y + object.height && i >= 0; i++ ){
    // if(this.collisionTable[object.x][i].collisionId !== object.collisionId ){
    //                 if(compareCords(this.collisionTable[object.x][i], {x:object.x,y:i}) != 0){
    //                 collisionInfo.push(this.collisionTable[object.x][i]); 
    //                 }
    //             }
// }
// }

    //object upper bound
    // if(object.x >= 0){
    // for(let j = object.x; j < object.x + object.width && j >= 0; j++){
    //         if(this.collisionTable[j][object.y].collisionId !== object.collisionId ){
    //             if(compareCords(this.collisionTable[j][object.y], {x:j,y:object.y}) != 0){
    //             collisionInfo.push(this.collisionTable[j][object.y]); 
    //             }
    //         }
    //     }
    // }

    //object right bound
    // if(object.y >= 0){
    // for(let i = object.y; i < object.y + object.height && i >= 0; i++ ){
        // if(this.collisionTable[object.x + object.width][i].collisionId !== object.collisionId ){
        //     if(compareCords(this.collisionTable[object.x + object.width][i], {x:object.x + object.width,y:i}) != 0){
        //     collisionInfo.push(this.collisionTable[object.x + object.width][i]); 
        //     }
        // }
    // }
    // }

    //object bottom bound
    // if(object.x >= 0){
    // for(let j = object.x; j < object.x + object.width && j >= 0; j++){
        // if(this.collisionTable[j][object.y + object.height].collisionId !== object.collisionId ){
        //     if(compareCords(this.collisionTable[j][object.y + object.height], {x:j,y:object.y + object.height}) != 0){
        //     collisionInfo.push(this.collisionTable[j][object.y + object.height]); 
        //     }
        // }
//     }
// }
// }
    return collisionInfo;
}

compareCords(a,b){
    var compare = 0;
    if((a.x == b.x) && (a.y == b.y)){
        compare = 0;
    } else compare = 1;

    return compare;
}

eraseCollision(object){

    //left bound
    for(let i = object.y; i <= object.y + object.height; i++){
        this.collisionTable[object.x][i] = {x: object.x, y: i};
    }

    //upper bound
    for(let j = object.x; j <= object.x + object.width; j++){
        this.collisionTable[j][object.y] = {x: j, y: object.y};
    }

    //right bound
    for(let i = object.y; i <= object.y + object.height; i++ ){
        this.collisionTable[object.x + object.width][i] = {x: object.x + object.width, y: i};
    }

    //object bottom bound
    for(let j = object.x; j <= object.x + object.width; j++){
        this.collisionTable[j][object.y + object.height] = {x: j, y: object.y + object.height};
    }
}

checkBounds(object){
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

compareCordsWithBounds(cords){
    var equality = 0;

    if(cords.x < context2D.CANVAS_WIDTH){
        equality = 0;
    }
    if(cords.y < context2D.CANVAS_HEIGHT){
        equality = 0;
    }
    if((cords.x == context2D.CANVAS_WIDTH) || (cords.x == 0)){
        equality = 1;
    }
    if((cords.y == context2D.CANVAS_HEIGHT) || (cords.y == 0)){
        equality = 1;
    }
    if((cords.x > context2D.CANVAS_WIDTH) || (cords.x < 0)){
        equality = 2;
    }
    if((cords.y > context2D.CANVAS_HEIGHT) || (cords.y < 0)){
        equality = 2;
    }
    return equality;
}

rotateImage(degree, objectId) {
	$('#' + objectId).animate({  transform: degree }, {
    step: function(now,fx) {
        $(this).css({
            '-webkit-transform':'rotate('+now+'deg)', 
            '-moz-transform':'rotate('+now+'deg)',
            'transform':'rotate('+now+'deg)'
        });
    }
    })
};

    actionsAroundBorders( object, actionForLeftBorder = null, actionForUpperBorder = null, 
                                   actionForRightBorder = null, actionForBottomBorder = null ){
        actionForLeftBorder.xstartValue = 
        actionForUpperBorder.xstartValue = 
        actionForRightBorder.xstartValue = 
        actionForBottomBorder.xstartValue = object.x;

        actionForLeftBorder.ystartValue = 
        actionForUpperBorder.ystartValue = 
        actionForRightBorder.ystartValue = 
        actionForBottomBorder.ystartValue = object.y;

        actionForLeftBorder.widthstartValue = 
        actionForUpperBorder.widthstartValue = 
        actionForRightBorder.widthstartValue = 
        actionForBottomBorder.widthstartValue = object.width;

        actionForLeftBorder.heightstartValue = 
        actionForUpperBorder.heightstartValue = 
        actionForRightBorder.heightstartValue = 
        actionForBottomBorder.heightstartValue = object.height;

        actionForLeftBorder.collisionIdstartValue = 
        actionForUpperBorder.collisionIdstartValue = 
        actionForRightBorder.collisionIdstartValue = 
        actionForBottomBorder.collisionIdstartValue = object.collisionId;

        //object left bound
        for(let i = object.y; i < object.y + object.height && i >= 0; i++ ){
            actionForLeftBorder.prepareVariables = () => { this.y = i; }
            actionForLeftBorder.performAction();
        }

        //object upper bound
        for(let j = object.x; j < object.x + object.width && j >= 0; j++){
            actionForUpperBorder.prepareVariables = () => { this.x = j; }
            actionForUpperBorder.performAction();
        }

        //object right bound
        for(let i = object.y; i < object.y + object.height && i >= 0; i++ ){
            actionForRightBorder.prepareVariables = () => { this.x = this.x + this.width; this.y = i; }
            actionForRightBorder.performAction();
        }

        //object bottom bound 
        for(let j = object.x; j < object.x + object.width && j >= 0; j++){
            actionForBottomBorder.prepareVariables = () => { this.x = j; this.y = this.y + this.height; }
            actionForBottomBorder.performAction();
        }
    }

}



