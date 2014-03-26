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

  window.rect = new Rectangle(canvas);

  document.getElementById('btn-start').addEventListener('click', function(){
    if(!rect.timerID) {
      rect.start();
      this.textContent = 'Stop animating';
    }
    else {
      rect.stop();
      this.textContent = 'Start animating';
    }
  }, false);
}