class Control{

//players current key seettings
controlSettings = []
//to remember current pressed button
mapKeys = [];
//need to define moving direction
direction = '00';

//default player settings
//TODO change hardcoded which!!!
setControls(object) {
    this.controlSettings = [
    {text: 'playerLeftMoveButton', which: 65, action: () => {Utility2D.move(object,{x: -object.stepRight, y: 0 })}},
    {text: 'playerRightMoveButton', which: 68, action: () => {Utility2D.move(object, {x: object.stepRight, y: 0})}},
    {text: 'playerUpMoveButton', which: 87, action: () => {Utility2D.move(object, {x: 0, y: object.stepDown})}},
    {text: 'playerDownMoveButton', which: 83, action: () => {Utility2D.move(object, {x: 0, y: -object.stepDown})}},
    {text: 'playerShoot', which: 32, action: () => {object.shoot()}}
    ];
}    

mapKey(event){
    this.mapKeys[event.which] = event.type == 'keydown';
}

checkKeys(){
    this.controlSettings.forEach(key => {
        if(this.mapKeys[key.which] == true){
            key.action();
        }
    })
}
}

function loadControlLibrary() {
    return new Control();
}