class Control{

//players current key seettings
controlSettings = []
//to remember current pressed button
mapKeys = [];
//need to define moving direction
direction = '00';

objectsWithControlSettings = new Set();


//default player settings
//TODO change hardcoded which!!!
setControls(object) {
    var newObj = {object: object, mySteps: new Set(), mapKeys: []};
    
    newObj.controlSettings = [
    {text: 'playerLeftMoveButton', which: 65, action: (x, y) => { return { x: x - object.stepRight, y: y  }}},//{Utility2D.move(object,{x: -object.stepRight, y: 0 })}},
    {text: 'playerRightMoveButton', which: 68, action: (x, y) => {return { x: x + object.stepRight, y: y}}},//{Utility2D.move(object, {x: object.stepRight, y: 0})}},
    {text: 'playerUpMoveButton', which: 87, action: (x, y) => {return { x: x , y: y + object.stepDown}}},//{Utility2D.move(object, {x: 0, y: object.stepDown})}},
    {text: 'playerDownMoveButton', which: 83, action: (x, y) => {return { x: x , y: y - object.stepDown}}},//{Utility2D.move(object, {x: 0, y: -object.stepDown})}},
    {text: 'playerShoot', which: 32, action: () => {object.shoot()}}
    ];

    $(document).keydown((event) => {
        newObj.mapKeys[event.which] = event.type == 'keydown';
        Pengui.setKeyBoardEvent(object);
    });

    $(document).keyup((event) => {
        newObj.mapKeys[event.which] = event.type == 'keydown';
    });

    this.objectsWithControlSettings.add(newObj);
}    

invokeControls(object){

    this.objectsWithControlSettings.forEach((entry => {
        if(entry.object.collisionId == object.collisionId){
            var step = {x: 0, y: 0};
            entry.controlSettings.forEach((setting) => {
                if(entry.mapKeys[setting.which] == true){
                    step = setting.action(step.x, step.y);
                }
            });
        }
        Utility2D.move(object,{x: step.x, y: step.y });//update here
    }))
    
}

checkKeys(obj){

    this.objectsWithControlSettings.forEach((entry) =>{
        if(entry.object.collisionId == obj.collisionId){

            var pressedButtons = entry.controlSettings.filter((setting)=>{ return entry.mapKeys[setting.which] === true });

            if(pressedButtons.length == 0){
                Pengui.deleteKeyBoardEvent(obj);
            } else {
                this.invokeControls(obj);
            }
        }
    })
}
}

function loadControlLibrary() {
    return new Control();
}