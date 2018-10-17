var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var mouse = {
	"x": 0,
	"y": 0
};
var maxRadius = 50;
var minRadius = 5;

window.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

function Circle(x, y, r, dx, dy, color){
	this.radius = r;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = color;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function(){
		if( this.x + this.radius > window.innerWidth || this.x - this.radius < 0 )
			this.dx = -this.dx;
		if( this.y + this.radius > window.innerHeight || this.y - this.radius < 0)
			this.dy = -this.dy;

		this.x += this.dx;
		this.y += this.dy;

		if( (this.x - mouse.x) < 50 && (this.x - mouse.x) > -50 
			&& (this.y - mouse.y) < 50 && (this.y - mouse.y) > -50 ){
			if( this.radius < maxRadius )
				this.radius++;
		}else if( this.radius > minRadius)
			this.radius--;

		this.draw();
	}
}

var circles = [];
var colors = [
	"#497CBF",
	"#2F5373",
	"#66C4D9",
	"#F2E6D8",
	"#F2937E"
];

for( var i = 0; i < 600; i++){
	var x = getRandomNumberBetween(0, window.innerWidth);
	var y = getRandomNumberBetween(0, window.innerHeight);
	var dx = getRandomNumberBetween(1, 3);
	var dy = getRandomNumberBetween(1, 3);
	var radius = getRandomNumberBetween(30, 40);
	/*var r = getRandomNumberBetween(0, 255);
	var g = getRandomNumberBetween(0, 255);
	var b = getRandomNumberBetween(0, 255);*/
	var color = colors[getRandomNumberBetween(0, colors.length)];

	if( x < radius || x > (window.innerWidth - radius))
		x = radius;
	if( y < radius || y > (window.innerHeight - radius))
		y = radius;

	circles.push( new Circle(x, y, radius, dx, dy, color));
}

function AnimateCircles(){
	
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for( var i = 0; i < circles.length; i++)
		circles[i].update();

	requestAnimationFrame(AnimateCircles);
}

function getRandomNumberBetween(min, max){
	var randomNumber = Math.floor( Math.random() * max );

	if( randomNumber < min )
		randomNumber += min;

	return randomNumber;
}

AnimateCircles();


/*c.fillRect(100, 100, 100, 100);
c.fillRect(300, 100, 100, 100);
c.fillStyle = "red";
c.fillRect(200, 200, 100, 100);

//Draw Line
c.beginPath();
c.moveTo(50, 50);
c.lineTo(450, 50);
c.lineTo(450, 350);
c.lineTo(50, 350);
c.strokeStyle = "green";
c.lineTo(50, 50);
c.stroke();

for( var i = 0; i < 200; i++){
	var r = Math.random() * 255;
	var g = Math.random() * 255;
	var b = Math.random() * 255;

	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	c.beginPath();
	c.arc(x, y, 10, 0, Math.PI * 2, false);
	c.strokeStyle = "rgba("+ r +", "+ g +", "+ b +", 1)";
	c.stroke();
}*/