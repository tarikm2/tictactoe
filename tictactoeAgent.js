
var Agent = function () { };     //creating an agent object

//the select method uses minMax to recursively find a solution
Agent.prototype.selectMove = function (board) {
    return minMax(board, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY).move;
}

function minMax(board, max, min) {

    //if the game is over, return the value of the game
    if (board.gameOver() !== 0) {
        return { utility: utility(board) }
    }
    
    var freeCells = getFreeCells(board);
    var result = board.playerOne ? { utility: max } : { utility: min };

    for (var cell = 0; cell < freeCells.length; cell++) {  //for each possible free move
        var copy = board.clone();       //make a simulated game board and
        copy.move(freeCells[cell]);     //make the free move
        var temp = minMax(copy, max, min);  //send this choice down to the next layer in the game

        if (board.playerOne)   //maximize value
        {
            if (temp.utility > max) {   //if this choice gives us more utility than previous options
                max = temp.utility; //update our best winning result
                result = { utility: temp.utility, move: freeCells[cell] }; //set this result to our choice

                if (temp.utility == 1) return result;   //if we can win return result
            }       
        }
        else       //minimize utility
        {
            if (min > temp.utility) {  //if this choice gives us a new minimum utility
                min = temp.utility;     //update our best min utility
                result = { utility: temp.utility, move: freeCells[cell] };  //choose this as our best choice

                if (temp.utility == -1) return result;  //if we can force their loss, do it
            }
        }
    }
   return result;  //return the best choice for this layer in the game
}

//this determines the utility of a given game result
function utility(board) {
    if (board.gameOver() == 1) {   //x won
        return 1;
    }
    else if (board.gameOver() == 2) {  //o won
        return -1;
    }
    else if (board.gameOver() == 3) { // tie game
        return 0;
    }
}

function getFreeCells(board) {
    var freeCells = [];
    for (var cell = 1; cell < 10; cell++) {
        if (board.cellFree(cell)) freeCells.push(cell);
    }
    return freeCells;
}
