var n = 3;
var wh = 600;
var tileSize = wh/n;
var xchar = String.fromCodePoint(0x2715);
var ochar = String.fromCodePoint(0x25ef);
var playerSym = 1;
let radio;
let board = [];
let alternate = false;
let oai = false;
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
	stroke(0);
	strokeWeight(2);

	for(var i = 0; i <n*n; i++){
		board.push({state:0});
	}

	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			rect(i*tileSize, j*tileSize, tileSize, tileSize);
		}
	}

	symsel = document.querySelector('#symbolselect');
	symsel.onchange = (event)=>{
		playerSym = +event.srcElement.value;
		if(playerSym == 2 && oai){
			compMove();
		}
	};
	let a = document.querySelector('#alternate');
	a.onclick = (event)=>{
		alternate = event.srcElement.checked;
	};
	xsel = document.querySelector('#xselect');
	osel = document.querySelector('#oselect');
	let b = document.querySelector('#clear');
	b.onclick = ()=>{

		for(var i = 0; i < n*n; i++){
				board[i].state = 0;
		}
		display();
	};

	let aix = document.querySelector('#aix');
	let aio = document.querySelector('#aio');
	aix.onclick = ()=>{
		choose(2, 1);
	};
	aio.onclick = ()=>{
		choose(2, 2);
	};
}


function toIndex(x, y){
	return y*n+x;
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
				//printTile(i, j, board[i][j].state);
			printTile(i, j, board[toIndex(i,j)].state);
			}
		}
}

function tileCoords(x, y){
	let i = Math.floor(x/tileSize);
	let j = Math.floor(y/tileSize);
	if(i >= 0 && j >= 0 && i < n && j < n)
		return {x: i, y: j};
	else return null;		
}

function mouseTile(x, y){
	let i = Math.floor(x/tileSize);
	let j = Math.floor(y/tileSize);
	if(i >= 0 && j >= 0 && i < n && j < n)
		return board[toIndex(i,j)];
		// return board[i][j];
	else return null;
}

function printValue(x, y, player){
	let v = evaluateBoard(board, player);
	console.log(v);
}

function keyPressed(event){
	if(event.key == "x"){
		console.log(value(board, 1));
	}else if(event.key == "o"){
		console.log(value(board, 2));
	}
}

function printState(board){	
	let str = "+---+---+---+\n";
	for(var j = 0; j < n; j++){
		str += "|";
		for(var i = 0; i < n; i++){
			let s = board[toIndex(i,j)].state;
			let p = ' ';
			if(s == 1){
				p = 'x';
			}else if(s == 2){ p = 'o'; } 
			let r = " "+p+" |";
			str += r;
		}
		str += "\n+---+---+---+\n";
	}
	console.log(str);
}

function mousePressed(){
	let t = tileCoords(mouseX, mouseY);
	// let t = mouseTile(mouseX, mouseY);
	if(t){
		let p = board[toIndex(t.x, t.y)];
		//printValue(t.x, t.y, playerSym);
		
		switch(p.state){
			case 0:
			p.state = playerSym;
			break;
			case 1:
			if(playerSym == 1){p.state = 0;}
			break;
			case 2:
			if(playerSym == 2){p.state = 0;}
		}
		if(alternate){
			if(xsel.checked){
				osel.checked = true; playerSym = 2; choose(2, 2);
			}
			else if(osel.checked){xsel.checked = true; playerSym = 1; choose(2, 1);}
			
		} //console.log(getNeighbors(board, t.x, t.y, playerSym));
		//console.log(isTerminal(board));
		display();
	}
	
}
