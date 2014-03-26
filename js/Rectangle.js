/**
*	Creates a new Rectangle object:
*	@constructor
*	@param {HTMLCanvasElement} canvas A reference to a canvas element
*/
function Rectangle(canvas) {
	// check if canvas context is available:
	if( !(canvas && canvas.getContext) ) {
		throw new Error('Canvas context is unavailable');
	}
	
	// saving references to canvas and is context:
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	
	// setting fill color to black:
	this.ctx.fillStyle = "#000";
	
	// initializinig coordinates and speed:
	this.speedX = 0;
	this.speedY = 0;
	this.X = 0;
	this.Y = 0;
	
	// rectangle size:
	this.size = 50;
	
	// initializing animation timer ID:
	this.timerID = null;
	
	// saving reference to this (Rectangle instance) for
	// referencing in the event handler:
	var self = this;
	
	document.addEventListener('keydown', function(e) {
		switch(e.keyCode) {
			case 38:
				// down key was pressed:
				self.speedY -= 1;
				break;
			case 40:
				// up key was pressed:
				self.speedY += 1;
				break;
			case 37:
				// left key was pressed:
				self.speedX -= 1;
				break;
			case 39:
				// right key was pressed:
				self.speedX += 1;
				break;
		}
	}, false);
};

/**
*	Sets initial positiona and speed and begins animation loop
*/
Rectangle.prototype.start = function() {
	// saving reference to this for
	// referencing in requestAnimFrame callback:
	var self = this;
	
	// initial speed and zero:
	this.speedX = 0;
	this.speedY = 0;
	// initial coordinates are at the canvas' center:
	this.X = parseInt( (this.canvas.width - this.size) / 2, 10 );
	this.Y = parseInt( (this.canvas.height - this.size) / 2, 10 );

	// just a shorthand:
	var ctx = this.ctx;
	
	(function animationLoop(){
		self.timerID = requestAnimFrame(animationLoop);
		self.clearCanvas();
		
		// planned coordinate at the next step:
		var nextX = self.X + self.speedX;
		var nextY = self.Y + self.speedY;
		
		// flags to set true on the canvas edges:
		var isLeftEgdeReached = (nextX < 0) && (self.speedX < 0);
		var isRightEgdeReached = ( (nextX + self.size) > self.canvas.width );
		var isTopEdgeReached = (nextY < 0) && (self.speedY < 0);
		var isBottomEdgeReached = ( (nextY + self.size) > self.canvas.height );
		
		if( isLeftEgdeReached || isRightEgdeReached ) {
			// reflect from vertical edge:
			self.speedX = -self.speedX;
		}
		
		if( isTopEdgeReached || isBottomEdgeReached ) {
			// reflect from horizontal edge:
			self.speedY = -self.speedY;
		}
		
		// set new coordinates:
		self.X += self.speedX;
		self.Y += self.speedY;
		
		ctx.fillRect(self.X, self.Y, self.size, self.size);
	})();
};

Rectangle.prototype.stop = function() {
	// stopping animation:
	cancelAnimFrame(this.timerID);
	this.timerID = null;
	
	this.clearCanvas();
};


Rectangle.prototype.clearCanvas = function() {
	this.ctx.save();
	// Use the identity matrix while clearing the canvas
	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	// Restore the transform
	this.ctx.restore();
};
