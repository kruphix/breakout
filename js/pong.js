const canvas = document.getElementById('pong');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const context = canvas.getContext('2d');
const canvasBackground = "#FF00FF";

var player = new Player();
var ball = new Ball(200, 300);
var keysDown = {};
let isPaused = false;
var tiles = [];
var win = false;

window.onload = function() {
	document.getElementById('player-score').innerHTML = 5;
	setupTiles();
	animate(step);
};

window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
	checkPaused();
	checkStartNew();
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

var setupTiles = function() {
	for (let i = 100; i <= 240; i = i + 20) {
		for (let j = 20; j <= 290; j = j + 90) {
			tiles.push(new Tile(i, i + 10, j, j + 80));
		}
	}
}

var step = function() {
	if (!isPaused && !win) {
		update();
		render();
	}
	animate(step);
};

var update = function() {
	player.update();
	ball.update(player.paddle);
};

var render = function() {
	context.fillStyle = canvasBackground;
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	player.render();
	ball.render();
	tiles.forEach(function(tile) {
		if (tile.show) {
			ball.updateTile(tile);
			tile.render();
		}
	})
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

var checkStartNew = function() {
	if (win && keysDown[78]) { // N button
		win = false;
		// start new game
	}
}

var winGame = function() {
	context.font = "30px Comic Sans MS";
	context.fillStyle = "yellow";
	context.textAlign = "center";
	context.fillText("WINNER", canvas.width/2, canvas.height/2);
}
