function Ball(startingX, startingY) {
	this.x = startingX;
	this.y = startingY;
	this.x_speed = 0;
	this.y_speed = 2;
	this.radius = 5;
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.fillStyle = "#000000";
	context.fill();
};

Ball.prototype.updatePaddle = function(paddle1) {
	this.x += this.x_speed;
	this.y += this.y_speed;
	var left = this.x - 5;
	var top = this.y - 5;
	var right = this.x + 5;
	var bottom = this.y + 5;

	if(this.x - 5 < 0) { // hitting the left wall
		this.x = 5;
		this.x_speed = -this.x_speed;
	} else if(this.x + 5 > 400) { // hitting the right wall
		this.x = 395;
		this.x_speed = -this.x_speed;
	} else if (this.y < 0) { // hitting top wall
		this.y = 5;
		this.y_speed = -this.y_speed;
	}

	if(this.y > 600) { // lose life
		player.score -= 1;
		this.x_speed = 0;
		this.y_speed = 2;
		this.x = 200;
		this.y = 300;
		tile1.show = true;
		tile2.show = true;
		tile3.show = true;
		tile4.show = true;
		document.getElementById('player-score').innerHTML = player.score;
	}

	if(top > 500) {
		if(top < (paddle1.y + paddle1.height) && bottom > paddle1.y && left < (paddle1.x + paddle1.width) && right > paddle1.x) {
			// hit the player's paddle
			this.y_speed = -(this.y_speed);
			this.x_speed += (paddle1.x_speed / 2);
			this.y += this.y_speed;
		}
	}
	document.getElementById('x-speed').innerHTML = this.x_speed;
	document.getElementById('y-speed').innerHTML = this.y_speed;
};

Ball.prototype.updateTile = function(tile) {
	//this.x += this.x_speed;
	//this.y += this.y_speed;
	var left = this.x - 5;
	var top = this.y - 5;
	var right = this.x + 5;
	var bottom = this.y + 5;

	if (left < tile.right_x && right > tile.left_x && this.y < tile.bottom_y && this.y > tile.top_y) { // collision on tile left or right
		this.x_speed = -this.x_speed;
		//this.x += this.x_speed;
		tile.clear();
		tile.show = false;
	}
	else if (top < tile.bottom_y && bottom > tile.top_y && this.x < tile.right_x && this.x > tile.left_x) { // collision on tile top or bottom
		this.y_speed = -this.y_speed;
		//this.y += this.y_speed;
		tile.clear();
		tile.show = false;
	}

	document.getElementById('x-speed').innerHTML = this.x_speed;
	document.getElementById('y-speed').innerHTML = this.y_speed;
};
