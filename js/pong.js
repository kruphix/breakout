const canvas = document.getElementById('pong');
const width = canvas.width;
const height = canvas.height;
const context = canvas.getContext('2d');

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);
var keysDown = {};

window.onload = function() {
	document.getElementById('player-score').innerHTML = 0;
	document.getElementById('computer-score').innerHTML = 0;
	animate(step);
};

window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
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
	update();
	render();
	animate(step);
};

var update = function() {
	player.update();
	computer.update(ball);
	ball.update(player.paddle, computer.paddle);
};

var render = function() {
	context.fillStyle = "#FF00FF";
	context.fillRect(0, 0, width, height);
	player.render();
	computer.render();
	ball.render();
};