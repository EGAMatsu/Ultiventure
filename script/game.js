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
            displayString(0,0,"This is a test...", 4);
            displayString(4,4,"Text!!\nWith Rows?", 8);
            displayString(20,0,"Vertical Time", 9, 1)
            renderWorld();
        }
    }, 1000 / 5); // 5 frames per second
}

function displayString(x, y, string, color, maxlength) {
    let currentX = x;
    let currentY = y;
    for (let i = 0; i < string.length; i++) {
        if (string[i] != '\n') {
            let charValue = charToValue(string[i]);
            characterMap[currentY][currentX] = charValue;
            charColorMap[currentY][currentX] = color;
            currentX++;
        } else {
            currentY++;
            currentX = x;
        }
        if (currentX - x >= maxlength) {
            currentX = x;
            currentY++;
        }
    }
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
window.displayString = displayString;