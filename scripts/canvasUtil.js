window.utils = {};
window.utils.captureMouse = function(element){
	var mouse = {x:0,y:0};
	element.addEventListener('mousedown',function(event){
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
function Arrow(){
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.color = '#ffff00';
}
Arrow.prototype.draw = function(context){
    context.save();
    context.translate(this.x , this.y); //将坐标原点移到this.x 和 this.y
    context.rotate(this.rotation); //设置旋转角度
    context.lineWidth = 5;  //设置线宽
    context.fillStyle = this.color; //设置填充色
    context.beginPath();  //路径开始
    context.moveTo(-50,-25);
    context.lineTo(0,-25);
    context.lineTo(0,-50);
    context.lineTo(50,0);
    context.lineTo(0,50);
    context.lineTo(0,25);
    context.lineTo(-50,25);
    context.closePath(); //路径闭合
    context.stroke(); //描边
    context.fill(); //填充
    context.restore();
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


function Line(x1, y1, x2, y2){
    this.x = 0;
    this.y = 0;
    this.x1 = (x1 === undefined) ? 0 : x1;
    this.y1 = (y1 === undefined) ? 0 : y1;
    this.x2 = (x2 === undefined) ? 0 : x2;
    this.y2 = (y2 === undefined) ? 0 : y2;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
}
Line.prototype.draw = function(context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.closePath();
    context.stroke();
    context.restore();
}
Line.prototype.getBounds = function(){
    if(this.rotation === 0){
        var minX = Math.min(this.x1, this.x2),
            minY = Math.min(this.y1, this.y2),
            maxX = Math.max(this.x1, this.x2),
            maxY = Math.max(this.y1, this.y2);
        
        return {
            x: this.x + minX,
            y: this.y + minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }else{
        var sin = Math.sin(this.rotation),
            cos = Math.cos(this.rotation),
            x1r = cos*this.x1 + sin*this.y1,
            x2r = cos*this.x2 + sin*this.y2,
            y1r = cos*this.y1 + sin*this.x1,
            y2r = cos*this.y2 + sin*this.x2;
        
        return {
            x: this.x + Math.min(x1r, x2r),
            y: this.y + Math.min(y1r, y2r),
            width: Math.max(x1r, x2r) - Math.min(x1r, x2r),
            height: Math.max(y1r, y2r) - Math.min(y1r, y2r)
        }; 
    }
}
