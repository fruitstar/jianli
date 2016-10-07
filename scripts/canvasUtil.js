window.utils = {};
window.utils.captureMouse = function(element){
	var mouse = {x:0,y:0};
	element.addEventListener('mousemove',function(event){
		var x,y;
		if(event.pageX||event.pageY){
			x = event.pageX;
			y = event.pageY;
		}else{
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + documnet.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;
		mouse.x = x;
		mouse.y = y;
	},false);
	return mouse;
};
window.utils.captureTouch = function (element) {
      var touch = {
                  x: null,
                    y: null,
                    isPressed: false,
                    event: null
                    };
      var body_scrollLeft = document.body.scrollLeft,
          element_scrollLeft = document.documentElement.scrollLeft,
          body_scrollTop = document.body.scrollTop,
          element_scrollTop = document.documentElement.scrollTop,
          offsetLeft = element.offsetLeft,
          offsetTop = element.offsetTop;
          
     // 绑定touchstart事件
      element.addEventListener('touchstart', function (event) {
        touch.isPressed = true;
        touch.event = event;
      }, false);
      
     // 绑定touchend事件
      element.addEventListener('touchend', function (event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
      }, false);
      
     //绑定touchmove事件
      element.addEventListener('touchmove', function (event) {
        var x, y,
            touch_event = event.touches[0]; //第一次touch

        if (touch_event.pageX || touch_event.pageY) {
          x = touch_event.pageX;
          y = touch_event.pageY;
        } else {
          x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
          y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        //减去偏移量
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
      }, false);
      //返回touch对象
      return touch;
};
//动画循环
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                  });
}

//动画循环取消
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}

function Ball(radius,color){
    if(radius === undefined) {radius = 40;}
    if(color === undefined){color = '#00ff00';}
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.rotation = 0;
    this.mass = 1;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = color;
    this.lineWidth = 1;

}
Ball.prototype.draw = function(context){
    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX,this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(0,0,this.radius,0,Math.PI*2,false);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}