function Computer() {
	this.paddle = new Paddle(175, 10, 50, 10);
	this.score = 0;
}

Computer.prototype.render = function() {
	this.paddle.render();
};

Computer.prototype.update = function(ball) {
	var x_pos = ball.x;
	var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
	if(diff < 0 && diff < -4) { // max speed left
		diff = -5;
	} else if(diff > 0 && diff > 4) { // max speed right
		diff = 5;
	}
	this.paddle.move(diff, 0);
};