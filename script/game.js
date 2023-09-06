var width = 40;
var height = 25;
var isRunning = true;

//Create the character/tile map
var characterMap = new Array(height);
for (var i = 0; i < height; i++) {
    characterMap[i] = new Array(width);
}

//Create the old ver of the tilemap
var charMapOld = new Array(height);
for (var i = 0; i < height; i++) {
    charMapOld[i] = new Array(width);
}


//...Now its corresponding color map.
var charColorMap = new Array(height);
for (var i = 0; i < height; i++) {
    charColorMap[i] = new Array(width);
}

width = 20;
height = 12;
//Create the metatile map
var metaTileMap = new Array(height);
for (var i = 0; i < height; i++) {
    metaTileMap[i] = new Array(width);
}

function game() {
    wipeMetaTileMap();

    var intervalId = setInterval(function() {
        if (!isRunning) {
            clearInterval(intervalId);
        } else {
            wipeMetaTileMap();
            renderWorld();
        }
    }, 1000 / 120); // 60 frames per second
}

function wipeMetaTileMap() {
    for (var i = 0; i < charMapOld.length; i++) { //8x8 tiles
        for (var j = 0; j < charMapOld[i].length; j++) {
            charMapOld[i][j] = 0;
        }
    }    
    
    for (var i = 0; i < characterMap.length; i++) { //8x8 tiles
        for (var j = 0; j < characterMap[i].length; j++) {
            characterMap[i][j] = getRandomInt(250,252);
        }
    }    

    for (var i = 0; i < charColorMap.length; i++) { //Color cells
        for (var j = 0; j < charColorMap[i].length; j++) {
            charColorMap[i][j] = ((getRandomInt(0,14) >= 8) ? 10 : 11);
        }
    }   

    for (var i = 0; i < metaTileMap.length; i++) { //16x metatiles.
        for (var j = 0; j < metaTileMap[i].length; j++) {
            metaTileMap[i][j] = 0;
        }
    }   
}

function renderWorld() {
    for (var i = 0; i < characterMap.length; i++) { //8x8 tiles
        for (var j = 0; j < characterMap[i].length; j++) {
            if (charMapOld[i][j] != characterMap[i][j]) {
                window.placeTile(j,i,window.getCol16(charColorMap[i][j]),characterMap[i][j]);
                charMapOld[i][j] = characterMap[i][j];
            }
        }
    }   
}

window.game = game;