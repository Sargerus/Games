/*************************************************************************************************************** 
 *                                              Collision library                                              *
 * Collision detection is based on collistion table. Collision table has the same dimension as canvas.         *
 * Its two-dimensional table rows of which contains null or object id.                                         *
 * Only object borders are taken into account. This is not necessary to check whole object pixels.             *
***************************************************************************************************************/
function loadCollisionLibrary(context2D){
    return new Collision2D(context2D);
}

class Action{

    actionArgs = {};
    validation = function (){};
    prepareVariables = function (){};
    prepareVariablesCustom = function (){};
    action = function (...args){};

    performAction = function (){
        this.prepareVariables();
        this.prepareVariablesCustom();
        if(this.validation()){
            this.action();
        }
    }
}

class Collision2D {

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

fillCollision(object){

    var actionForBorder = new Action();

    actionForBorder.actionArgs.collisionId = object.collisionId;
    actionForBorder.actionArgs.collisionTable = this.collisionTable;

    actionForBorder.validation = function(){return true;}
    actionForBorder.action = function(){ this.actionArgs.collisionTable[this.x][this.y] = this.actionArgs.collisionId; }

    this.actionsAroundBorders(object, actionForBorder);
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

    var actionForBorder = new Action();

    actionForBorder.actionArgs.collisionTable = this.collisionTable;
    actionForBorder.actionArgs.collisionId = object.collisionId;

    actionForBorder.validation = function() { if(this.actionArgs.collisionTable[this.x][this.y].collisionId !== this.actionArgs.collisionId ){
        if(Utility2D.compareCords(this.actionArgs.collisionTable[this.x][this.y], {x:this.x,y:this.y}) != 0){
            return true;
        }}}
        actionForBorder.prepareVariablesCustom = function() { this.width = object.width; this.height = object.height; }
    actionForBorder.action = function(){ collisionInfo.push(this.actionArgs.collisionTable[this.x][this.y]); }
    this.actionsAroundBorders(object, actionForBorder);

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

moveCollision(object, step){
// x axis
    if(step.x < 0){
        const startValueX = object.x + object.width + step.x + 1;
        for(let i = startValue; i < object.x + object.width; i++){
                this.collisionTable[i, object.y] = undefined;
                this.collisionTable[object.x - (i - startValueX), object.y] = object.collisionId;

                this.collisionTable[i, object.y + object.height] = undefined;
                this.collisionTable[object.x - (i - startValueX), object.y + object.height] = object.collisionId;
        }
        for(let j = object.y + 1; j < object.y + object.height - 1; j++ ){
            this.collisionTable[object.x + object.width, j] = undefined;
            this.collisionTable[object.x + step.x, j] = object.collisionId
        }

    } else if(step.x > 0){
        const endValueX = object.x + step.x - 1;
        for(let i = object.x; i < endValueX; i++){
                this.collisionTable[i, object.y] = undefined;
                this.collisionTable[object.x + object.width + ( object.x + step.x - i ) , object.y] = object.collisionId;

                this.collisionTable[i , object.y + object.height] = undefined;
                this.collisionTable[object.x + object.width + ( object.x + step.x - i ) , object.y + object.height] = object.collisionId;
        }
        for(let j = object.y + 1; j < object.y + object.height - 1; j++ ){
            this.collisionTable[object.x, j] = undefined;
            this.collisionTable[object.x + object.width + step.x, j] = object.collisionId
        }
    }
//y axis
    if(step.y < 0){

    }
}
    // //left bound
    // for(let i = object.y; i <= object.y + object.height; i++){
    //     this.collisionTable[object.x][i] = {x: object.x, y: i};
    // }

    // //upper bound
    // for(let j = object.x; j <= object.x + object.width; j++){
    //     this.collisionTable[j][object.y] = {x: j, y: object.y};
    // }

    // //right bound
    // for(let i = object.y; i <= object.y + object.height; i++ ){
    //     this.collisionTable[object.x + object.width][i] = {x: object.x + object.width, y: i};
    // }

    // //object bottom bound
    // for(let j = object.x; j <= object.x + object.width; j++){
    //     this.collisionTable[j][object.y + object.height] = {x: j, y: object.y + object.height};
    // }
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
        
        if(actionForUpperBorder === null){
            actionForUpperBorder = actionForLeftBorder;
            actionForRightBorder = actionForLeftBorder;
            actionForBottomBorder = actionForLeftBorder;
        }

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
            actionForLeftBorder.prepareVariables = function() { this.x = object.x; this.y = i; }
            actionForLeftBorder.performAction();
        }

        //object upper bound
        for(let j = object.x; j < object.x + object.width && j >= 0; j++){
            actionForUpperBorder.prepareVariables = function() { this.x = j; this.y = object.y; }
            actionForUpperBorder.performAction();
        }

        //object right bound
        for(let i = object.y; i < object.y + object.height && i >= 0; i++ ){
            actionForRightBorder.prepareVariables = function() { this.x = object.x + object.width; this.y = i; }
            actionForRightBorder.performAction();
        }

        //object bottom bound 
        for(let j = object.x; j < object.x + object.width && j >= 0; j++){
            actionForBottomBorder.prepareVariables = function() { this.x = j; this.y = object.y + object.height; }
            actionForBottomBorder.performAction();
        }
    }

}



