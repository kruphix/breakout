const canvas = document.getElementById('pong');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const context = canvas.getContext('2d');
const canvasBackground = "#FF00FF";

var player = new Player();
var ball = new Ball(200, 300);
var keysDown = {};
let isPaused = false;

var tile1 = new Tile(150, 250, 50, 150);
var tile2 = new Tile(150, 250, 250, 350);
var tile3 = new Tile(350, 450, 50, 150);
var tile4 = new Tile(350, 450, 250, 350);

window.onload = function() {
	document.getElementById('player-score').innerHTML = 5;
	animate(step);
};

window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
	checkPaused();
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
});

document.getElementById("reset").addEventListener("click", function() {
	player.score = 5;
	document.getElementById('player-score').innerHTML = player.score;
});

var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) { window.setTimeout(callback, 1000/60)
};

var step = function() {
	if (!isPaused) {
		update();
		render();
	}
	animate(step);
};

var update = function() {
	player.update();
	ball.updatePaddle(player.paddle);
	if (tile1.show) {
		ball.updateTile(tile1);
	}
	if (tile2.show) {
		ball.updateTile(tile2);
	}
	if (tile3.show) {
		ball.updateTile(tile3);
	}
	if (tile4.show) {
		ball.updateTile(tile4);
	}

};

var render = function() {
	context.fillStyle = canvasBackground;
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	player.render();
	ball.render();
	if (tile1.show) {
		tile1.render();
	}
	if (tile2.show) {
		tile2.render();
	}
	if (tile3.show) {
		tile3.render();
	}
	if (tile4.show) {
		tile4.render();
	}
};

var checkPaused = function() {
	if (keysDown[80]) { // P button
		isPaused = !isPaused;
	}

	if (isPaused) {
		context.font = "30px Comic Sans MS";
		context.fillStyle = "green";
		context.textAlign = "center";
		context.fillText("Paused", canvas.width/2, canvas.height/2);
	}
	else {
		context.fillText("", 0, 0);
	}
}
