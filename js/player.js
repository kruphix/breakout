function Player() {
	this.paddle = new Paddle(175, 580, 50, 10);
	this.score = 0;
}

Player.prototype.render = function() {
	this.paddle.render();
};

Player.prototype.update = function() {
	for(var key in keysDown) {
		var value = Number(key);
		if(value == 37) { // left arrow
			this.paddle.move(-4, 0);
		} else if (value == 39) { // right arrow
			this.paddle.move(4, 0);
		} else {
			this.paddle.move(0, 0);
		}
	}
};