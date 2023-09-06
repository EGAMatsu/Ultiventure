var tileset = document.getElementById('tileset');
var img = new Image();
var tileData;
var tileColor = 'white';
var tileIndex = 0;

function getTileIndex(column, row) {
    return row * 16 + column;
}

function getCol16(index) {
    var c64Palette = [0x000000, 0x626262, 0x898989, 0xadadad, 0xffffff, 0x9f4e44,
        0xcb7e75, 0x6d5412, 0xa1683c, 0xc9d487, 0x9ae29b, 0x5cab5e,
        0x6abfc6, 0x887ecb, 0x50459b, 0xa057a3];
    return c64Palette[index % 16];
}

img.src = 'images/tileset.gif';
img.flags = 0
img.onload = function() {
    plotTiles();
}

var tiles = {};

function plotTiles() {
    tileset.innerHTML = '';
    for (var y = 0; y < 200 / 8; y++) {
        for (var x = 0; x < 320 / 8; x++) {
            placeTile(x, y, getCol16(0), 32);
        }
    }
    placeTile(0, 0, getCol16(4), 0);
}

function placeTile(x, y, color, index) {
    tileColor = '#' + color.toString(16);
    tileColor = padStart(tileColor,7,'0');
    tileIndex = index;
    var tileX = (tileIndex % 16) * 8;
    var tileY = Math.floor(tileIndex / 16) * 8;

    // Automatically offset the tile position to be on an 8x8 grid
    x *= 8;
    y *= 8;

    // Check if the tile position is within the boundaries of the canvas
    if (x < 0 || x >= 320 || y < 0 || y >= 240) {
        throw new Error('Tile position is outside of the canvas boundaries');
    }

    // Check if a tile already exists at the given position
    var existingTile = tiles[x + ',' + y];
    
    if (existingTile) {
        // Update the existing tile's properties
        existingTile.style.backgroundPosition = '-' + tileX + 'px -' + tileY + 'px';
        
        existingTile.style.backgroundColor = tileColor;
        if ('CSS' in window && CSS.supports('mix-blend-mode', 'multiply')) {
            existingTile.style.mixBlendMode = 'multiply';
            //tile.style.imageRendering = 'pixelated'; // Add this line
        }
        

    } else {
        // Create a new tile
        var tile = document.createElement('div');
        tile.className = 'tile';
        tile.setAttribute('data-x', x);
        tile.setAttribute('data-y', y);
        tile.style.left = x + 'px';
        tile.style.top = y + 'px';
        tile.style.backgroundImage = 'url(images/tileset.gif)';
        tile.style.backgroundPosition = '-' + tileX + 'px -' + tileY + 'px';
        tile.style.backgroundColor = tileColor;
        
        if ('CSS' in window && CSS.supports('mix-blend-mode', 'multiply')) {
            tile.style.mixBlendMode = 'multiply';
            tile.style.imageRendering = 'pixelated'; // Add this line
        }
        
        tiles[x + ',' + y] = tile;
        
        tileset.appendChild(tile);
    }
}


window.getTileIndex = getTileIndex;
window.getCol16 = getCol16;
window.plotTiles = plotTiles;
window.placeTile = placeTile;