// defining cross-browser animating functions:
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            return window.setTimeout(callback, 1000 / 60);
          };
})();
window.cancelAnimFrame = (function(){ 
  return window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      function(timerID) {
        clearInterval(timerID);
      };
})();

document.addEventListener('DOMContentLoaded', function(e) {
  init();
}, false);

function init() {
  var canvas = document.getElementById('canvas');
  var hint = document.getElementById('hint');

  var elSpeedLabels = document.getElementById('speed-labels');
  var elSpeedX = document.getElementById('speedx');
  var elSpeedY = document.getElementById('speedy');

  window.rect = new Rectangle(canvas, refreshSpeedLabels);

  function refreshSpeedLabels(){
    elSpeedX.textContent = this.getSpeedX();
    elSpeedY.textContent = this.getSpeedY();
  }
  
  document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
      case 38:
        // down key was pressed:
        rect.modifyYSpeed(-1);
        break;
      case 40:
        // up key was pressed:
        rect.modifyYSpeed(1);
        break;
      case 37:
        // left key was pressed:
        rect.modifyXSpeed(-1);
        break;
      case 39:
        // right key was pressed:
        rect.modifyXSpeed(+1);
        break;
    }
  }, false);


  document.getElementById('btn-start-stop').addEventListener('click', function(){
    if(!rect.timerID) {
      rect.start();
      hint.textContent = "Use arrow keys to change horizontal and vertical speed";
      this.textContent = 'Stop animating';

      elSpeedLabels.style.display = 'block';
    }
    else {
      rect.stop();
      this.textContent = 'Start animating';
      hint.textContent = "Click \"Start animating\" button";

      elSpeedLabels.style.display = 'none';
    }
  }, false);
}