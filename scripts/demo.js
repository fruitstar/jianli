$(window).load(function() {
   $("#loading").fadeOut(500);
}) 

window.onload=function(){
	var mask=document.getElementById("mask");
	var lis = document.getElementById("notice").getElementsByTagName("li");
	var divs = document.getElementById("hidebg").getElementsByTagName("div");
	for(var i = 0;i<lis.length;i++){
		lis[i].id = i;
		lis[i].onclick = function(){
			var bh = $("body").height(); 
			var bw = $("body").width(); 
		$("#mask").css({ 
		height:bh, 
		width:bw,});
		for(var j=0;j<lis.length;j++){
		divs[j].id="mod";
		}
		divs[this.id].id = "hide"; 
		$("#mask").fadeIn(); 
		$(".close").fadeIn(); 
		$("#hide").slideToggle();
	}
	mask.onclick=function(){
		hideBg();
		return false;
	}
}
};

$(function () { 
	$(function () { 
		$(window).scroll(function () { 
			if ($(window).scrollTop() > 20) { 
				$("#navbar").fadeIn(200); 
			} 
			else { 
				$("#navbar").fadeOut(200); 
			} 
		}); 
	}); 
});

function show(){
	var box = document.getElementById("bounceIn");
	box.style.display = "block";
}
setTimeout("show()",3000);


function hideBg() { 
$("#hide").slideToggle(); 
$(".close").fadeOut(); 
$("#mask").fadeOut(); 
} 
/*
var bh = $("body").height(); 
		var bw = $("body").width(); 
		$("#mask").css({ 
		height:bh, 
		width:bw, 
		});
		$("#mask").fadeIn(); 
		$("#hidebg div:eq(0)").slideToggle(); 
function showBg() { 
var bh = $("body").height(); 
var bw = $("body").width(); 
$("#mask").css({ 
height:bh, 
width:bw, 
});
$("#mask").fadeIn(); 
$("#hide").slideToggle(); 
} 
//关闭灰色 jQuery 遮罩 
function hideBg() { 
$("#hide").slideToggle(); 
$("#mask").fadeOut(); 
}
window.onload=function(){
	var mask=document.getElementById("mask");
	mask.onclick=function(){
		hideBg();
		return false;
	}
}
*/