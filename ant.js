var board;
var antX;
var antY;
var dir = "up";

var timer;
var timerActive = false;

var rules = "LR";

var rects = 100;

//secret :)
$("#secret").on('click', function(){
	
	document.getElementById("secret").innerHTML = "what are ants?";
	
})

$("#rules").on('input', function(){
	
	clearInterval(timer);
	timerActive = false;
	
	rules = document.getElementById("rules").value;
	document.getElementById("run").innerHTML = "Run";
	
	console.log(rules);
	
})

function prepareBoard(){
	
	timerActive = false;
	clearInterval(timer);
	document.getElementById("run").innerHTML = "Run";
	
	var c = document.getElementById("board");
	var ctx = c.getContext("2d");
	
	var w = c.width/rects;
	
	antX = Math.floor(rects/2);
	antY = Math.floor(rects/2);
	
	board = new Array(rects);
	for(let i = 0; i < rects; i++){
		
		board[i] = new Array(rects);
		
	}
	
	ctx.strokeStyle = "#222";
	ctx.lineWidth = "1";
	
	for(let i = 0; i < rects; i++){
		
		for(let j = 0; j < rects; j++){
			
			ctx.beginPath();
			
			if(j == antY && i == antX){
			
				ctx.fillStyle = "rgba(71, 127, 70, 0.8)";
			
			} else {
				
				ctx.fillStyle = "#000";
				
			}
			
			//console.log("rgb(" + color + "," + color + "," + color + ")");
			
			ctx.rect(i*w, j*w, w, w);
			
			ctx.fill();
			ctx.stroke();
			
			board[i][j] = 0;
		
		}
		
	}
	
}

function drawBoard(){
		
	var c = document.getElementById("board");
	var ctx = c.getContext("2d");
		
	var w = c.width/rects;
	
	ctx.strokeStyle = "#222";
	ctx.lineWidth = "1";
	
	for(let i = 0; i < rects; i++){
		
		for(let j = 0; j < rects; j++){
			
			ctx.beginPath();
			
			let current = board[i][j];
			let color = (255 / (rules.length-1)) * current;
			
			if(j == antY && i == antX){
			
				ctx.fillStyle = "rgba(71, 127, 70, 0.8)";
			
			} else {
				
				ctx.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
				
			}
			
			//console.log("rgb(" + color + "," + color + "," + color + ")");
			
			ctx.rect(i*w, j*w, w, w);
			
			ctx.fill();
			ctx.stroke();
		
		}
		
	}
	
}

function antStep(){
	
	var c = document.getElementById("board");
	var ctx = c.getContext("2d");
	
	var w = c.width/rects;
	
	let current = board[antX][antY];
	let nextDir = rules.charAt(current);
	
	board[antX][antY] = (board[antX][antY]+1)%rules.length;
	
	ctx.beginPath();
	
	let color = (255 / (rules.length-1)) * board[antX][antY];
	
	ctx.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
	ctx.rect(antX*w, antY*w, w, w);
	
	ctx.fill();
	ctx.stroke();
	
	switch(dir){
		
		case "up":
		
			if(nextDir == "L" || nextDir == "l"){
				
				dir = "left";
				antX--;
				
			} else {
				
				dir = "right";
				antX++;
				
			}
		
		break;
		
		case "right":
		
			if(nextDir == "L" || nextDir == "l"){
				
				dir = "up";
				antY--;
				
			} else {
				
				dir = "down";
				antY++;
				
			}
		
		break;
		
		case "down":
		
			if(nextDir == "L" || nextDir == "l"){
				
				dir = "right";
				antX++;
				
			} else {
				
				dir = "left";
				antX--;
				
			}
		
		break;
		
		case "left":
		
			if(nextDir == "L" || nextDir == "l"){
				
				dir = "down";
				antY++;
				
			} else {
				
				dir = "up";
				antY--;
				
			}
		
		break;
		
		
	}
	
	
	if(antX >= rects) antX = 0;
	if(antX <= -1) antX = rects-1;
	
	if(antY >= rects) antY = 0;
	if(antY <= -1) antY = rects-1;
	
	ctx.beginPath();
	
	ctx.fillStyle = "rgba(71, 127, 70, 1)";
	ctx.rect(antX*w, antY*w, w, w);
	
	ctx.fill();
	ctx.stroke();
	
}

function run(){
	
	if(timerActive){
		
		clearInterval(timer);
		document.getElementById("run").innerHTML = "Run";
				
	} else {
		
		timer = setInterval(antStep, 10);
		document.getElementById("run").innerHTML = "Stop"
	}
	
	timerActive = !timerActive;
}