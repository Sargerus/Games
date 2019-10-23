var textures = {
    texturePack: new Set(),
    addNewTexture: (name, texture) => { this.texturePack.add(createObjectOfTexture(name,texture)); },//{ this.texturePack[texturePack.length + 1] = texture; },
    getTexture: (name) => {
        for( let item of texturePack.values()) { if(item.name === name) return item; }
    }
};

function createObjectOfTexture(name, texture){

    return {
        name: name,
        numberOfCurrentUses: 0,
        creationTimestamp: Date.now(),
        defaultWidth: texture.width,
        defaultHeight: texture.height,
        texture: texture
    }

}

$(document).ready(()=>{
    textures.texturePack[0] = new Image();
    textures.texturePack[0].src = "./images/enemyTank.png";
})

function loadTexturePackages(){

    wallTexture = new Image();
    wallTexture.src = "./images/enemyTank.png";

    textures.addNewTexture(name, wallTexture);

//     wallTexture.onload = () => {
//         wallTextureLoaded = true;
//    }

    


    
    //TODO wait for all resources loaded

    return true;
}