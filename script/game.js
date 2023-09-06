var width = 40;
var height = 25;
var isRunning = true;

//Axis
var horizontal = 0;
var vertical = 0;
var fire = false;

//Keyboard stuffs
document.onkeydown = function(event) {
    var key = String.fromCharCode(event.keyCode);
    //console.log(key)
    switch(key) {
        case("W"):
            vertical = -1;
            break;

        case("S"):
            vertical = 1;
            break;

        case("A"):
            horizontal = -1;
            break;
        case("D"):
            horizontal = 1;
            break;

        case(String.fromCharCode(13)):
            fire = true;
            break;
    }
};

document.onkeyup = function(event) {
    var key = String.fromCharCode(event.keyCode);
    switch(key) {
        case("W"):
            vertical = 0;
            break;

        case("S"):
            vertical = 0;
            break;

        case("A"):
            horizontal = 0;
            break;
        case("D"):
            horizontal = 0;
            break;

        case(String.fromCharCode(13)):
            fire = false;
            break;
    }
};

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
    var player1 = new Player(16, 16, 100);

    var intervalId = setInterval(function() {
        if (!isRunning) {
            clearInterval(intervalId);
        } else {
            wipeMetaTileMap();
            displayString(0,0,"This is a test...", 4);
            displayString(4,4,"Text!!\nWith Rows?", 8);
            displayString(20,0,"Vertical Time", 9, 1)

            player1.update(horizontal, vertical, fire);
            characterMap[player1.y][player1.x] = 2;
            charColorMap[player1.y][player1.x] = 4;

            renderWorld();
        }
    }, 1000 / 10); // 5 frames per second
}

function displayString(x, y, string, color, maxlength) {
    var currentX = x;
    var currentY = y;
    for (var i = 0; i < string.length; i++) {
        if (string[i] != '\n') {
            var charValue = charToValue(string[i]);
            characterMap[currentY][currentX] = charValue;
            charColorMap[currentY][currentX] = color;
            currentX++;
        } else { //New line
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
            characterMap[i][j] = getRandomInt(249,253); //This is a placeholder to verify that the tiles are working
        }
    }    

    for (var i = 0; i < charColorMap.length; i++) { //Color cells

        for (var j = 0; j < charColorMap[i].length; j++) {
            charColorMap[i][j] = ((getRandomInt(0,14) >= 8) ? 10 : 11); //Ditto as above
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