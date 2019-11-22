class Pengui {

    renderMap = new Map();
    is2DSet = false;

    plsRememberToRenderMe(object){
        if(!this.renderMap.has(object.collistionId))
        {
            this.renderMap.set(object.collistionId, object);
        }
    }

    render(){
        var func;

        if(this.is2DSet)
        {
            func = (obj) => { Utility2D.render(obj); }
        } else if(this.is3DSet)
            {
            //----
            }

            this.renderMap.forEach( (obj) => { func(obj); } )
    }
}