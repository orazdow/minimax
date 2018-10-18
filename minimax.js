
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
		for(var i = 0; i < board.length; i++)
			if(board[i].state)
				n++;
		
		// draw
		if(n == board.length){
			return 1;
		}else return 0; // non terminal
	}else return a + 1;
}

// choose best move
function choose(depth, player){

	let moves =  evaluateMoves(depth, player);
	if(!moves.length) return;
	let index = 0;
	let val = -9999;
	let leastdepth = 9999;
	let str = player == 1 ? "X:\n" : "O:\n";

	// choose highest value with least depth
	moves.forEach((m, i)=>{
		if(m.value > val){
			val = m.value;
			leastdepth = m.depth;
			index = i;
		}else if(m.value == val && m.depth < leastdepth){
			leastdepth = m.depth;
			index = i
		}
		str += "("+m.x+", "+m.y+"): "+m.value+', '+m.depth+'\n';
	});
	str += 'best: ('+moves[index].x+', '+moves[index].y+')\n';
	readout.innerHTML = str;

	return {x: moves[index].x, y: moves[index].y};
}

// initiate minimax
function evaluateMoves(maxdepth, player){
	let spaces = getfreeSpaces(board);
	let maxiPlayer = player;
	let miniPlayer = player == 1 ? 2 : 1;
	let moves = [];
	spaces.forEach((pos, i)=>{
		let child = childState(board, pos.x, pos.y, player);
		let m = minimax(child, maxdepth, false, maxiPlayer, miniPlayer);
		moves.push({x: pos.x, y: pos.y, value: m.value, depth: maxdepth-m.depth});
	});
	return moves;
}

function minimax(state, depth, isMaximizing, maxiPlayer, miniPlayer){
	let t = isTerminal(state); 
	if(t){
		if(t == 1){
			return {value: 0, depth: depth}; // draw
		}else{ //printState(state);
			return {value: t-1 == maxiPlayer ? 99 : -99, depth: depth}; // win/loss
		}
	}else if(depth == 0){ 
		return {value: evaluateBoard(state, maxiPlayer), depth: depth}; // depth limit
	}

	let spaces = getfreeSpaces(state);
	depth--;

	if(isMaximizing){ 
		let value = -99999;
		spaces.forEach((pos)=>{
			let child = childState(state, pos.x, pos.y, maxiPlayer);
			let m = minimax(child, depth, false, maxiPlayer, miniPlayer);
			value = Math.max(value, m.value);
		});
		return {value: value, depth: depth};
	}else{
		let value = 99999;
		spaces.forEach((pos)=>{
			let child = childState(state, pos.x, pos.y, miniPlayer);
			let m = minimax(child, depth, true, maxiPlayer, miniPlayer);
			value = Math.min(value, m.value); 
		});
		return {value: value, depth: depth};
	}
}


function printChilds(player){
		let spaces = getfreeSpaces(board);
		spaces.forEach((pos)=>{
			let child = childState(board, pos.x, pos.y, player);
			printState(child);
	});
}

