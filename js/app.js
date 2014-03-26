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

  window.rect = new Rectangle(canvas);

  document.getElementById('btn-start-stop').addEventListener('click', function(){
    if(!rect.timerID) {
      rect.start();
      hint.textContent = "Use arrow keys to change horizontal and vertical speed";
      this.textContent = 'Stop animating';
    }
    else {
      rect.stop();
      this.textContent = 'Start animating';
      hint.textContent = "Click \"Start animating\" button";
    }
  }, false);
}