/**
Game snake 2D viet theo function
*/

$(document).ready(function() {
	// Constant and variable in Game

	var canvas = $("#snake")[0];
	var context = canvas.getContext('2d');
	var widthCanvas = $("#snake").width();
	var heightCanvas = $("#snake").height();
	var food = new Object;
	var direction;
	var headX;
	var headY;
	var widthUnit = 15;
	var speed;
	var snake;	
	var score;
	var numPlay = 0;

	/**
	Ham start game
	Khi start game thi can tao food va snake
	*/
	function start(){
		createSnake();
		// Neu cho co loop thi khoi tao loop
		if(typeof loop != "undefined") clearInterval(loop);
		loop = setInterval(paintSnake,100);
		createFood();
		paintCell(food.x,food.y);
	}

	start();
	/**
	Function tao food cho game
	*/

	function createFood(){
		var x = Math.floor(Math.random() * (widthCanvas/widthUnit + 1));
		var y = Math.floor(Math.random() * (heightCanvas/widthUnit + 1));
		food.x = x;
		food.y = y;
		console.log(food);
	}

	/**
	Function paint cell
	*/

	function paintCell(x,y){
		context.fillStyle = "white";
		context.fillRect(x * widthUnit, y * widthUnit, widthUnit, widthUnit);
		context.strokeStyle = "red";
		context.strokeRect(x * widthUnit, y * widthUnit, widthUnit, widthUnit);
	}

	/**
	Function init Snake
	*/
	function createSnake(){
		var snakeLen = 4;
		snake = [];
		for(i = 0; i < snakeLen; i++){
			snake.push({
				x : 0,
				y : 20,
			})
		}
	}

	/**
	Paint gird for game
	*/
	function paintSnake(){
		context.fillStyle = "#3498db";
		context.fillRect(0,0,widthCanvas,heightCanvas);
		
		paintCell(food.x,food.y);
		headX = snake[0].x;
		headY = snake[0].y;
		switch(direction) {
			case "right":
				headX++;
				break;
			case "left":
				headX--;
				break;
			case "up":
				headY--;
				break;
			case "down":
				headY++
				break;
		}
		if(headX == -1 || headX >= widthCanvas/widthUnit || headY == -1 || headY >= heightCanvas/widthUnit){
			start();
			return;
		}

		if(headX == food.x && headY == food.y){
			snake.unshift({
				x : headX,
				y : headY,
			})
			createFood();
			paintCell(food.x,food.y);
		} else {
			var tail = snake.pop();
			snake.unshift({
				x : headX,
				y : headY,
			});			
		}


		for(i = 0; i < snake.length; i++){
			paintCell(snake[i].x,snake[i].y);
		}
	}

	/**
	Xy ly ban phim
	*/
	$(document).keydown(function(event) {
		var code = event.keyCode;
		if(code == 37 && direction != "right") direction = "left";
		else if(code == 38 && direction != "down") direction = "up";
		else if(code == 39 && direction != "left") direction = "right";
		else if(code == 40 && direction != "up") direction = "down";	
	});

});