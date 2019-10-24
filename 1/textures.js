var textures = {
    texturePack: new Set(),
    addNewTexture: (name, texture) => { this.texturePack.add(createObjectOfTexture(name,texture)); },//{ this.texturePack[texturePack.length + 1] = texture; },
    getTexture: (name) => {
        for( let item of texturePack.values()) { if(item.name === name) { item.numberOfCurrentUses++; return item; } }
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

    //default texture at 0 position
    var texture = new Image();
    texture.src = "./images/enemyTank.png";

    textures.addNewTexture('default', texture);

})

function loadTexturePackages(){

//     wallTexture.onload = () => {
//         wallTextureLoaded = true;
//    }

    //TODO wait for all resources loaded

    return true;
}