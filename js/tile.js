function Tile(topY, bottomY, leftX, rightX) {
	this.top_y = topY;
	this.bottom_y = bottomY;
	this.left_x = leftX;
	this.right_x = rightX;
	this.x_speed = 0;
	this.y_speed = 0;
  this.show = true;
}

Tile.prototype.render = function() {
	context.fillStyle = "#0000FF";
  var width = this.right_x - this.left_x;
  var height = this.bottom_y - this.top_y;
	context.fillRect(this.left_x, this.top_y, width, height);
};

Tile.prototype.clear = function() {
  var width = this.right_x - this.left_x;
  var height = this.bottom_y - this.top_y;
  context.clearRect(this.left_x, this.top_y, width, height);
};
