var canvasWidth = canvasHeight = 600,
	startLoc = null,
	lineWidth = 16,
	strokeStyle="black";

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

canvas.height = canvasHeight
canvas.width = canvasWidth
// 获取鼠标点击在 canvas 的 x,y 坐标
function windowToCanvas(x, y){
	var tCanvas = canvas.getBoundingClientRect()
	return {
		x: Math.round(x - tCanvas.left), 
		y: Math.round(y - tCanvas.top)
	}
}
// 鼠标按下开始准备绘画
canvas.onmousedown = function(e){
	e.preventDefault();
	// 上一次鼠标点击的x,y坐标
	startLoc = windowToCanvas(e.clientX, e.clientY)  

	// 鼠标移动开始绘画
	canvas.onmousemove = function(e){
		e.preventDefault();
		// 获取当前x,y坐标,对象
		var newLoc = windowToCanvas(e.clientX, e.clientY);  
		// 开画
		ctx.beginPath()
		ctx.moveTo(startLoc.x, startLoc.y);
		ctx.lineTo(newLoc.x, newLoc.y);
		ctx.closePath()
		ctx.strokeStyle = strokeStyle
		ctx.lineWidth = lineWidth
		ctx.lineCap = "round"
		ctx.lineJoin = "round"
		ctx.stroke();
		startLoc = newLoc;
	}

	// 鼠标移入 canvas 继续绘画
	canvas.onmouseover = function(e){
		e.preventDefault();
	}
}
// 鼠标移出 canvas 停止绘画
canvas.onmouseout = function(e){
	e.preventDefault();
}
// 鼠标抬起停止绘画
document.onmouseup = function(e){
	e.preventDefault();
	canvas.onmousemove = null
	canvas.onmouseover = null
}

drawGrid()
function drawGrid(){
	// ctx.save()和ctx.restore()保证后面的操作不会影响田字格
	ctx.save()
	ctx.strokeStyle = "#795e26"
	
	// 田字格四边
	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(canvasHeight, 0)
	ctx.lineTo(canvasHeight, canvasWidth)
	ctx.lineTo(0, canvasWidth)
	ctx.closePath()
	ctx.lineWidth = 4
	ctx.stroke()
	// 对角线中间线
	ctx.setLineDash([10])
	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(canvasHeight, canvasWidth)
	ctx.moveTo(canvasHeight, 0)
	ctx.lineTo(0, canvasWidth)
	ctx.moveTo(0, canvasHeight/2)
	ctx.lineTo(canvasWidth, canvasHeight/2)
	ctx.moveTo(canvasWidth/2, 0)
	ctx.lineTo(canvasWidth/2, canvasHeight)
	// 中间线条
	ctx.lineWidth = 1
	ctx.stroke()
	ctx.restore()
}  

$('.font-size li').click(function(){
	$(this).addClass('size-active').siblings().removeClass('size-active');
	lineWidth = $(this).attr("key")
})
$('.font-color li').click(function(){
	$(this).addClass('color-active').siblings().removeClass('color-active');
	strokeStyle = $(this).attr("key")
})

$(".btn-clear").click(function(){
	ctx.clearRect(0, 0, canvasHeight, canvasWidth)
	drawGrid()
})