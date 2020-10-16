function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 3;
	this.radius = 5;
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.fillStyle = "#000000";
	context.fill();
};

Ball.prototype.update = function(paddle1, paddle2) {
	this.x += this.x_speed;
	this.y += this.y_speed;
	var top_x = this.x - 5;
	var top_y = this.y - 5;
	var bottom_x = this.x + 5;
	var bottom_y = this.y + 5;

	if(this.x - 5 < 0) { // hitting the left wall
		this.x = 5;
		this.x_speed = -this.x_speed;
	} else if(this.x + 5 > 400) { // hitting the right wall
		this.x = 395;
		this.x_speed = -this.x_speed;
	}

	if(this.y < 0) { // player scores
		player.score += 1;
		this.x_speed = 0;
		this.y_speed = 3;
		this.x = 200;
		this.y = 300;
		document.getElementById('player-score').innerHTML = player.score;
	}

	if(this.y > 600) { // computer scores
		computer.score += 1;
		this.x_speed = 0;
		this.y_speed = 3;
		this.x = 200;
		this.y = 300;
		document.getElementById('computer-score').innerHTML = computer.score;
	}

	if(top_y > 300) {
		if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
			// hit the player's paddle
			this.y_speed = -(this.y_speed + 0.1);
			this.x_speed += (paddle1.x_speed / 2);
			this.y += this.y_speed;
		}
	} else {
		if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
			// hit the computer's paddle
			this.y_speed = -(this.y_speed - 0.1);
			this.x_speed += (paddle2.x_speed / 2);
			this.y += this.y_speed;
		}
	}
	document.getElementById('x-speed').innerHTML = this.x_speed;
	document.getElementById('y-speed').innerHTML = this.y_speed;
};