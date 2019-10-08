var controlSettings = []
var mapKeys = [];
var direction = '00';

function InitializeDefaultControlSettingsOf(object){
    controlSettings = [
    {text: 'playerLeftMoveButton', which: 65, action: () => {move(object,{x: -object.stepRight, y: 0 })}},
    {text: 'playerRightMoveButton', which: 68, action: () => {move(object, {x: object.stepRight, y: 0})}},
    {text: 'playerUpMoveButton', which: 87, action: () => {move(object, {x: 0, y: object.stepDown})}},
    {text: 'playerDownMoveButton', which: 83, action: () => {move(object, {x: 0, y: -object.stepDown})}},
    {text: 'playerShoot', which: 32, action: () => {object.shoot()}}
    ];
}

$(document).ready(() => {
    
    $(document).keydown((event) => {
        mapKey(event);
    });

    $(document).keyup((event) => {
        mapKey(event);
    });

})

function mapKey(event){
    mapKeys[event.which] = event.type == 'keydown';
}

function checkKeys(){

    controlSettings.forEach(key => {
        if(mapKeys[key.which] == true){
            key.action();
        }

    });
    
    // var cords = {};

//     if(mapKeys[controlSettings[3].which] == true && mapKeys[controlSettings[0].which] == true){

//         if(direction.direction !== 'AS'){
//         direction = {direction: 'AS', 
//                      xCenter: player.x - playerModelWidth, 
//                      yCenter: player.y, //+ Math.round(playerModelHeight / 2),
//                      radius: playerModelWidth};
//         }

//         var flag = false;

//         for(let i = player.x - 0.1; i >= direction.xCenter; i -= 0.1 ){ //Math.round(playerModelWidth / (speed * speed - 1))
//             if(flag){break;}
//             for(let j = player.y + 0.1; j <= direction.yCenter + 2 * playerModelHeight; j += 0.1){ //Math.round(playerModelHeight / (speed * speed + 1))
//                 if(circleFormula(direction.xCenter, direction.yCenter, i, j, direction.radius)){
//                     cords = {x: i, y: j};
//                     flag = true;
//                     break;
//                 }
//             }
//         }
    

//     if(cords.x != undefined){
//         move(player,{x:  Math.floor(cords.x - player.x), y: Math.round(cords.y - player.y)});
//     }
// } else {


}
// }

    // function circleFormula(a,b,x,y,r){
    //     let isOk = false;

    //     var result = Math.pow((x - a),2) + Math.pow((y - b),2) - Math.pow(r,2);
    //     if(result >= 0 && result <= 5){
    //         isOk = true;
    //     }

    //     return isOk;
    // }


// }