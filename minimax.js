
// position heuristic 
function evaluatePos(board, x, y, player){
	let same_intersections = 0;
	let diff_intersections = 0;

	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			let tile = board[toIndex(i,j)].state;
			if(tile && intersects(i, j, x, y)){
				if(tile == player)
					same_intersections++;
				else 
					diff_intersections++;
			}
		}
	}

	return same_intersections - diff_intersections;
}

// non terminal board state heuristic
function evaluateBoard(board, player){
	let value = 0;
	for(var j = 0; j <n; j++){
		for(var i = 0; i < n; i++){
			//console.log(board[toIndex(i,j)].state);
			//console.log(i, j, evaluatePos(board, i, j, player));
			if(!board[toIndex(i,j)].state){ 
				value += evaluatePos(board, i, j, player);
			}

		}
	}
	return value;
}

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

function intersects(x0, y0, x1, y1){
	return (!(x0 == x1 && y0 == y1) && (x0 == x1 || y0 == y1 || Math.abs(x0-x1) == Math.abs(y0-y1)));
}

function to2d(index){
	let x = index%n; 
	let y = Math.floor(index/n);
	if(x >= 0 && y >= 0)
		return {x:x, y:y};
	else return null;
}

function check3(i1,i2,i3, board, player){
	let a = to2d(i1);
	let b = to2d(i2);
	let c = to2d(i3);
	let match = (board[i1].state == player && board[i2].state == player && board[i3].state == player); 
	return match && (intersects(a.x, a.y, b.x, b.y) && intersects(a.x, a.y, c.x, c.y) && intersects(b.x, b.y, c.x, c.y));
}

// here I hard-coded for 3x3, because a function for general boards was too difficult
function isTerminal(board, player){
	let a = 
	(check3(0,1,2, board, player) ||
	check3(3,4,5, board, player) ||
	check3(6,7,8, board, player) ||
	check3(0,3,6, board, player) ||
	check3(1,4,7, board, player) ||
	check3(2,5,8, board, player) ||
	check3(0,4,8, board, player) ||
	check3(2,4,6, board, player));
	return a;
}

function minimax(state, depth, maximizingPlayer){
	
}

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

