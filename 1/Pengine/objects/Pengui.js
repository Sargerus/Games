class PenguiCl {

    constructor(){
        this.lengthTick = 30; //FPS
    }

    renderMap = new Map();
    updateSet = new Set();
    is2DSet = false;

    plsRememberToRenderMe(object){
        if(!this.renderMap.has(object.collisionId))
        {
            this.renderMap.set(object.collisionId, object);
        }
    }

    plsRememberToUpdateMe(obj){
        if(!this.updateSet.has(obj)){
            this.updateSet.add(obj);
        }
    }

    update(){
       this.updateSet.forEach((obj) => { obj.update();  }); //this.updateSet.delete(obj);
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

            this.renderMap.forEach( (obj) => { func(obj); } )
    }
}