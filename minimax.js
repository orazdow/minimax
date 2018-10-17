
// position heuristic 
function evaluatePos(board, x, y, player){
	let same_intersections = 0;
	let diff_intersections = 0;

	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			let tile = board[toIndex(i,j)].state;
			if(tile && (!(i == x && j == y) && (i == x || j == y || Math.abs(i-x) == Math.abs(j-y)))){
				if(tile == player)
					same_intersections++;
				else 
					diff_intersections++;
			}
		}
	}

	return same_intersections - diff_intersections;
}

// non terminal board heuristic
function evaluateBoard(board, player){
	let value = 0;
	for(var j = 0; j <n; j++){
		for(var i = 0; i < n; i++){
			//console.log(board[toIndex(i,j)].state);
			//console.log(i, j, evaluatePos(board, i, j, player));
			if(board[toIndex(i,j)].state == player){ 
				value += evaluatePos(board, i, j, player);
			}

		}
	}
	return value;
}


function getfreeSpaces(board){
	let spaces = [];
	for(var j = 0; j < n; j++){
		for(var i = 0; i < n; i++){
			if(board[toIndex(i,j)].state == 0)
				spaces.push({x:i, y:j});
		}
	}
	return spaces;
}


// return cloned child state
function childState(board, moveX, moveY, player){
	let a = [];
	for(var i = 0; i < board.length; i++){
		a.push({state:board[i].state})
	}
	a[toIndex(moveX, moveY)].state = player;
	return a;
}


function check3(i1,i2,i3, board){
	let p = board[i1].state;
	if(p && p == board[i2].state && p == board[i3].state)
		return p;
	else return 0;
}

// hard-coded for 3x3
function isTerminal(board){
	// win 
	let a = (check3(0,1,2, board) ||
	check3(3,4,5, board) ||
	check3(6,7,8, board) ||
	check3(0,3,6, board) ||
	check3(1,4,7, board) ||
	check3(2,5,8, board) ||
	check3(0,4,8, board) ||
	check3(2,4,6, board));
	if(!a){
		let n = 0;
		for(var i = 0; i < board.length; i++){
			if(board[i].state)
				n++;
		} 
		// draw
		if(n == board.length){
			return 1;
		}else return 0; // non terminal
	}else return a + 1;
}

function choose(depth, player){
	let spaces = getfreeSpaces(board);
	let maxiPlayer = player;
	let miniPlayer = player == 1 ? 2 : 1;
	let str = player == 1 ? "X:\n" : "O:\n";
	spaces.forEach((pos, i)=>{
		let child = childState(board, pos.x, pos.y, player);
		let v = minimax(child, depth, true, maxiPlayer, miniPlayer);
		console.log(pos.x, pos.y, v);
		str += "("+pos.x+", "+pos.y+"): "+v+'\n';
		
	});
	document.getElementById("readout").innerHTML = str;
}

function minimax(state, depth, isMaximizing, maxiPlayer, miniPlayer){
	let t = isTerminal(state); 
    let rtn = false;
	if(t){
		if(t == 1){ // draw
			return 0;
		}else return (t-1 == maxiPlayer) ? 99999 : -99999;
	}else if(depth == 0) return evaluateBoard(state, maxiPlayer);

	let spaces = getfreeSpaces(board);
	depth--;
	if(isMaximizing){
		let value = -99999;
		spaces.forEach((pos)=>{
			let child = childState(state, pos.x, pos.y, miniPlayer);
			let m = minimax(child, depth, false, maxiPlayer, miniPlayer);
			value = Math.max(value, m);
		});
		return value;
	}else{
		let value = 99999;
		spaces.forEach((pos)=>{
			let child = childState(state, pos.x, pos.y, maxiPlayer);
			let m = minimax(child, depth, true, maxiPlayer, miniPlayer);
			value = Math.min(value, m); 
		});
		return value;
	}
}


function printChilds(player){
		let spaces = getfreeSpaces(board);
		spaces.forEach((pos)=>{
			let child = childState(board, pos.x, pos.y, player);
			printState(child);
	});
}

/*
function checkDuplicates(arr, x, y){
	for(var i = 0; i < arr.length; i++){
		if(arr[i].x === x && arr[i].y === y)
			return true;
	}
	return false;
}

function getNeighbors(board, x, y, player){
	let neighbors = [];
	for(var j = -1; j <=1; j++){
		for(var i = -1; i <=1; i++){
			let _x = x+i, _y = y+j;
			if(_x >= 0 && _y >= 0 && _x < n && _y < n && !(_x == x && _y == y))
				if(board[toIndex(_x,_y)].state == player)
					if(!checkDuplicates(neighbors, _x, _y))
						neighbors.push({x:_x, y:_y});
		}
	}
	return neighbors;	
}
*/

// function isTerminal(board, x, y, last, lasty, dirx, diry, depth, player){

// }

// function isTerminal(board, depth,  x, y, lastx, lasty, player){
// 	let rtn = false;
// 	if(depth == n-1) return true;
// 	for(var j = -1; j <=1; j++){
// 		for(var i = -1; i <=1; i++){
// 			let _x = x+i, _y = y+j;
// 			if(_x >= 0 && _y >= 0 && _x < n && _y < n && !(_x == x && _y == y))	
//             	if(board[toIndex(_x,_y)].state == player)
//             		if(_x != lastx && _y != lasty){ console.log('y');
//             		 rtn = rtn || isTerminal(board, depth, _x, _y, x, y, player);
//             		}
// 		}
//       }
//       return rtn;
// }

