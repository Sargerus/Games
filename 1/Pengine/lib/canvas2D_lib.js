class canvas2D {
    constructor(){
        //set default canvas size
        this.CANVAS_HEIGHT = $(window).height();
        this.CANVAS_WIDTH = $(window).width();
            
        this.canvasElement = $("<canvas width='" + this.CANVAS_WIDTH + 
                                    "' height='" + this.CANVAS_HEIGHT + "'></canvas>");
            
        this.context2D = this.canvasElement.get(0).getContext("2d");
            
        this.canvasElement.appendTo("body");
    }

    updateCanvas(object){
        if(object.isActive){
            if(object.texture.complete){ 
                // var image = new Image();
                // image.src = 
                this.context2D.drawImage(object.texture, object.x, object.y, object.width, object.height);
            } else {
                // object.texture.onload = () => {
                    this.context2D.drawImage(object.texture, object.x, object.y, object.width, object.height);
                // }
            }
        } else {
            context2D.clearRect(object.x, object.y, object.x + object.width, object.y + object.height);
        }      
    }
}

function loadCanvas2D(){
    return new canvas2D();
}