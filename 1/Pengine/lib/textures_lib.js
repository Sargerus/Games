var textures = {
    texturePack: (() => { return new Set();})(),
    add: function([...textures]) { 
        for (let texture of textures) {
            this.texturePack.add(createObjectOfTexture(texture));
            }
    },
    getTextureByName: function(name) {
        for( let item of this.texturePack.values()) { 
            if(item.name === name) { 
                item.numberOfCurrentUses++; 
                    return item; 
            } 
        }
    }
};

function createObjectOfTexture(texture){
    return {
        name: texture.name,
        numberOfCurrentUses: 0,
        creationTimestamp: Date.now(),
        // defaultWidth: texture.data.width,
        // defaultHeight: texture.data.height,
        texture: loadTexture(texture.path)
    }
}

function loadTexture(path){
    var newImage = new Image();
    newImage.src = path;
    return newImage;
}

function loadTextureLibrary(){
    //default texture at 0 position
    textures.add([
        { name: 'default',  path: "./Pengine/images/enemyTank.png" }
    ]);
    //TODO wait for all resources loaded
    return textures;
}