const canvas = document.getElementById('pong');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const context = canvas.getContext('2d');
const canvasBackground = "#FF00FF";

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);
var keysDown = {};
let isPaused = false;

window.onload = function() {
	document.getElementById('player-score').innerHTML = 0;
	document.getElementById('computer-score').innerHTML = 0;
	animate(step);
};

window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
	checkPaused();
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
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
	computer.update(ball);
	ball.update(player.paddle, computer.paddle);
};

var render = function() {
	context.fillStyle = canvasBackground;
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	player.render();
	computer.render();
	ball.render();
};

var checkPaused = function() {
	if (keysDown[80]) {
		isPaused = !isPaused;
	}

	if (isPaused) {
		context.font = "30px Comic Sans MS";
		context.fillStyle = "green";
		context.textAlign = "center";
		context.fillText("Paused", canvas.width/2, canvas.height/2);
	}
	else {
		context.fillText("");
	}
}