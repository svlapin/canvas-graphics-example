/**
* Creates a new Rectangle object:
* @constructor
* @param {HTMLCanvasElement} canvas A reference to a canvas element
* @param {Function} afterSpeedChange A function called each time speed was modified
*/
function Rectangle(canvas, afterSpeedChange) {
  // check if canvas context is available:
  if( !(canvas && canvas.getContext) ) {
    throw new Error('Canvas context is unavailable');
  }
  
  // saving references to canvas and is context:
  this._canvas = canvas;
  this._ctx = canvas.getContext('2d');

  // register callback:
  if(typeof afterSpeedChange === 'function')
    this.afterSpeedChange = afterSpeedChange;
  
  // initializinig coordinates and speed:
  this._speedX = 0;
  this._speedY = 0;
  this._X = 0;
  this._Y = 0;
  
  // rectangle size:
  this._size = 50;
  
  // initializing animation timer ID:
  this.timerID = null;

  // setting fill color to black:
  this._ctx.fillStyle = "#000";

};

/**
* Sets initial positiona and speed and begins animation loop
*/
Rectangle.prototype.start = function() {
  // saving reference to this for
  // referencing in requestAnimFrame callback:
  var self = this;
  
  // initial speed and zero:
  this._speedX = 0;
  this._speedY = 0;
  this.afterSpeedChange && this.afterSpeedChange.call(this);
  // initial coordinates are at the canvas' center:
  this._X = parseInt( (this._canvas.width - this._size) / 2, 10 );
  this._Y = parseInt( (this._canvas.height - this._size) / 2, 10 );

  // just a shorthand:
  var ctx = this._ctx;
  
  (function animationLoop(){
    self.timerID = requestAnimFrame(animationLoop);
    self.clearCanvas();
    
    // planned coordinate at the next step:
    var nextX = self._X + self._speedX;
    var nextY = self._Y + self._speedY;
    
    // flags to set true on the canvas edges:
    var isLeftEgdeReached = (nextX < 0) && (self._speedX < 0);
    var isRightEgdeReached = ( (nextX + self._size) > self._canvas.width );
    var isTopEdgeReached = (nextY < 0) && (self._speedY < 0);
    var isBottomEdgeReached = ( (nextY + self._size) > self._canvas.height );
    
    if( isLeftEgdeReached || isRightEgdeReached ) {
      // reflect from vertical edge:
      self._speedX = -self._speedX;
      self.afterSpeedChange && self.afterSpeedChange.call(self);
    }
    
    if( isTopEdgeReached || isBottomEdgeReached ) {
      // reflect from horizontal edge:
      self._speedY = -self._speedY;
      self.afterSpeedChange && self.afterSpeedChange.call(self);
    }
    
    // set new coordinates:
    self._X += self._speedX;
    self._Y += self._speedY;
    
    ctx.fillRect(self._X, self._Y, self._size, self._size);
  })();
};

Rectangle.prototype.modifyXSpeed = function(delta){
  this._speedX += delta;
  this.afterSpeedChange && this.afterSpeedChange.call(this);
};

Rectangle.prototype.modifyYSpeed = function(delta){
  this._speedY += delta;
  this.afterSpeedChange && this.afterSpeedChange.call(this);
};

Rectangle.prototype.stop = function() {
  // stopping animation:
  cancelAnimFrame(this.timerID);
  this.timerID = null;
  
  this.clearCanvas();
};

Rectangle.prototype.clearCanvas = function() {
  this._ctx.save();
  // Use the identity matrix while clearing the canvas
  this._ctx.setTransform(1, 0, 0, 1, 0, 0);
  this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  // Restore the transform
  this._ctx.restore();
};

Rectangle.prototype.getSpeedX = function(){
  return this._speedX;
};

Rectangle.prototype.getSpeedY = function(){
  return this._speedY;
};
