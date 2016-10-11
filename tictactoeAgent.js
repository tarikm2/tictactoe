// Tic Tac Toe
var Agent = function () { //creating an agent object

}

/*Agent.prototype.selectMove = function(board) {
    var freeCells = [];
	//loop through all boards in the board and store all free ones in the freecells list
    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)) freeCells.push(i);
    }
	//return a random feee spot
	var returnNumber = freeCells[Math.floor(Math.random() * freeCells.length)];
	
	/*if (board.playerOne)
		console.log("Player one played X at " + returnNumber);
	else
		console.log("Player two played O at " + returnNumber);
    return returnNumber;
}*/

Agent.prototype.selectMove = function(board) {
    var freeCells = [];
	//loop through all boards in the board and store all free ones in the freecells list
    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)) freeCells.push(i);
    }
	if (board.cellFree(5))
		return 5;
	
	//call a defendMethod
	var mode = block(board);
	if (mode > 0) {
		//console.log("Blocked play");
		return mode;
	} else {
		
		mode = attack(board);
		if (mode > 0) {
			return mode;
		}
		else {
			mode = setUp(board);
			return mode;
		}
	}
}

function setUp(board) {
	 var freeCells = [];
	//loop through all boards in the board and store all free ones in the freecells list
    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)) freeCells.push(i);
    }
	if (freeCells.length == 1)
		return freeCells[0];
	
	var xValues = board.X, yValues = board.Y;
	var keys = [], frequency = [];
	
	var array = [];
	if (board.playerOne)
		array = board.X;
	else
		array = board.O;
	
	for (var i = 0; i < freeCells.length-1; i++) {
		for (var j = i+1; j < freeCells.length; j++) {
			var point1 = freeCells[i];
			var point2 = freeCells[j];
			var point3 = 15 - (point1 + point2);
			
			if (point3 < 10 && point3 > 0 && point3 != point1 && point3 != point2 && (board.cellFree(point3) || contains(array, point3))){
				//put point 1 in map;
				if (keys[point1] == point1)
					frequency[point1] = frequency[point1] + 1; 
				else{
					keys[point1] = point1;
					frequency[point1] = 1;
				}
				//put point 2 in map
				if (keys[point2] == point2)
					frequency[point2]= frequency[point2] + 1;
				else{
					keys[point2] = point2;
					frequency[point2] = 1;
				}
				//put point 3 in map
				if (keys[point3] == point3)
					frequency[point3] = frequency[point3] + 1;
				else{
					keys[point3] = point3;
					frequency[point3] = 1;
				}
			}
		}
	}
	//var max = frequency[frequency.length - 1];
	for (var i = 1; i < frequency.length; i++) {
		if (frequency[i] > frequency[max])
			max = i;
	}
	return keys[max];
}

function contains(array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value)
			return true;
	}
	return false;
}

function attack(board){
	var array = [];
	if (board.playerOne)
		array = board.X;
	else
		array = board.O;
	
	for (var i = 0; i < array.length; i++) {
		for (var j = 1; j < array.length; j++) {
			var spot = 15 - (array[i] + array[j]);
			if (spot > 0 && spot < 10 && board.cellFree(spot)) {
				return spot;
			}
		}
	}
	return -1;
}

function block(board){
	var array = [];
	
	if (board.playerOne)
		array = board.O;
	else 
		array = board.X;
	
	var b = array.length-1;
	var value = array[b];
	
	for(var i = 0; i < array.length;i++){
		 var k = 15 - (value + array[i]);
		if(k < 10 && k > 0 && board.cellFree(k)){
			return k;
		}
	}
	return -1;
}