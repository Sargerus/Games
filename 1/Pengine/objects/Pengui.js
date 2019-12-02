class PenguiCl {

    constructor(){
        //in milliseconds
        this.lengthTick = 8;//32ms ~ 30 FPS, 16ms ~ 60 FPS
        
        this.renderSet = new Set();
        this.updateMap = new Map();
        this.is2DSet = false;
        this.keyBoardObjectSet = new Set();
    }

    setKeyBoardEvent(object){
        if(!this.keyBoardObjectSet.has(object))
        {
            this.keyBoardObjectSet.add(object);
        }
    }

    deleteKeyBoardEvent(object){
        this.keyBoardObjectSet.delete(object);
    }

    plsRememberToRenderMe(object){
        if(!this.renderSet.has(object))
        {
            this.renderSet.add(object, object.collisionId );
        }
    }

    plsRememberToUpdateMe(obj){
        //if object is in map already, need to replace it with more recent version
        if(this.updateMap.has(obj.collisionId)){
           this.updateMap.delete(obj.collisionId);
        }
        this.updateMap.set(obj.collisionId, obj);
    }

    //check keyboard
    //update
    //clear updateMap, because in next tick it must be empty
    update(){
        this.keyBoardObjectSet.forEach(obj => {
            this.control.checkKeys(obj);
        });

        this.updateMap.forEach((obj,key) => 
        { 
            obj.update();
            this.plsRememberToRenderMe(obj);
        });

        this.updateMap.clear();
    }

    render(){
        var func;

        if(this.is2DSet)
        {
            func = (obj) => { obj.render(); }
        } else if(this.is3DSet)
            {
            //----
            }
            this.renderSet.forEach( (obj) => { func(obj); } )
            this.renderSet.clear();
    }
}