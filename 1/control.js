var controlSettings = []
var mapKeys = [];

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
    console.log('event.which = ' + event.which);
    mapKeys[event.which] = event.type == 'keydown';
}

function checkKeys(){

    controlSettings.forEach(key => {
        if(mapKeys[key.which] == true){
            key.action();
        }

    });
}