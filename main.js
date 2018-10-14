var n = 3;
var wh = 600;
var tileSize = wh/n;
var xchar = String.fromCodePoint(0x2715);
var ochar = String.fromCodePoint(0x25ef);
var playerSym = 1;
let radio;
let board = [];
let alternate = false;
let xsel, osel, symsel;

// 0: empty  1: x  2: o

function setup(){
	createCanvas(600, 600);
	let c = document.getElementById("defaultCanvas0");
	let d = document.getElementById("disp");
	d.appendChild(c);
	d.style.margin = 10;
	background(200);
	textSize(70);
	textAlign(CENTER);
	noLoop();
	tileSize = wh/n;
	for(var i = 0; i <n; i++){
		let a = [];
		for(var j = 0; j < n; j++){
			a.push({state: 0});
		}
		board.push(a);
	}
	stroke(0);
	strokeWeight(2);
	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			rect(i*tileSize, j*tileSize, tileSize, tileSize);
		}
	}
	symsel = document.querySelector('#symbolselect');
	symsel.onchange = (event)=>{
		playerSym = +event.srcElement.value;
	};
	let a = document.querySelector('#alternate');
	a.onclick = (event)=>{
		alternate = event.srcElement.checked;
	};
	xsel = document.querySelector('#xselect');
	osel = document.querySelector('#oselect');
	let b = document.querySelector('#clear');
	b.onclick = ()=>{
		for(var i = 0; i < n; i++){
			for(var j = 0; j < n; j++){
				board[i][j].state = 0;
			}
		}
		display();
	};
}


function printTile(x, y, state){
	if(state === 0){
		rect(x*tileSize, y*tileSize, tileSize, tileSize);
	}
	else if(state === 1){
		text(xchar, x*tileSize+(tileSize*0.5), y*tileSize+(tileSize*0.6));
	}else if(state === 2){
		text(ochar, x*tileSize+(tileSize*0.5), y*tileSize+(tileSize*0.6));
	}
	
}

function display(){
	for(var i = 0; i <n; i++){
		for(var j = 0; j <n; j++){
				printTile(i, j, board[i][j].state);
			}
		}
}

function mouseTile(x, y){
	let i = Math.floor(x/tileSize);
	let j = Math.floor(y/tileSize);
	if(i >= 0 && j >= 0 && i < n && j < n)
		return board[i][j];
	else return null;
}

function mousePressed(){
	let t = mouseTile(mouseX, mouseY);
	if(t){
		switch(t.state){
			case 0:
			t.state = playerSym;
			break;
			case 1:
			if(playerSym == 1){t.state = 0;}
			break;
			case 2:
			if(playerSym == 2){t.state = 0;}
		}
		if(alternate){
			if(xsel.checked){osel.checked = true; playerSym = 2;}
			else{xsel.checked = true; playerSym = 1;}
			
		}
		display();
	}
	
}

