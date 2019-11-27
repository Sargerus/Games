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

    $(document).keydown((event) => {
        this.mapKey(event, object);
    });

    $(document).keyup((event) => {
        this.mapKey(event, object);
    });
}    

mapKey(event, object){
    this.mapKeys[event.which] = event.type == 'keydown';
    this.checkKeys();
    // this.controlSettings.forEach(key => {
    //     if(this.mapKeys[key.which] == true){
    //         key.action();
    //     }
    // })
}

checkKeys(){
    var actions = [];
    this.controlSettings.forEach(key => {
        if(this.mapKeys[key.which] == true){
            actions.push(key.action);
            // key.action();
        }
    })
    actions.forEach((action) => action());
}

}

function loadControlLibrary() {
    return new Control();
}