function Player(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.inventory = [];
}

Player.prototype.addItem = function(item) {
    this.inventory.push(item);
}

Player.prototype.update = function(horzSpeed, vertSpeed, isInteracting) {
    this.x += horzSpeed;
    this.y += vertSpeed;
}

window.Player = Player;
