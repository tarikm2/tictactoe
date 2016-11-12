
var Agent = function () {


} //creating an agent object

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
    var result = (isPlayerOne(board)) ? { utility: max }
                                       : { utility: min };

    for (var cell = 0; cell < freeCells.length; cell++) {
        var copy = board.clone();
        copy.move(freeCells[cell]);
        var temp = minMax(copy, max, min);

        if (isPlayerOne(board))   //maximize value
        {
            if (max < temp.utility) {
                max = temp.utility;
                result = { utility: temp.utility, move: freeCells[cell] };

                if (temp.utility == 1) return result;
            }       
        }
        else       //minimize utility
        {
            if (min > temp.utility) {
                min = temp.utility;
                result = { utility: temp.utility, move: freeCells[cell] };

                if (temp.utility == -1) return result;
            }
        }
    }
   return result;  
}


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
    return "ERROR, UNDEFINED END GAME STATE";
}

function getFreeCells(board) {
    var freeCells = [];
    for (var cell = 1; cell < 10; cell++) {
        if (board.cellFree(cell)) freeCells.push(cell);
        
    }
    return freeCells;
}

// Checks if current player is player 1(maximizer)
function isPlayerOne(board) {
    var isP1 = getFreeCells(board).length % 2 == 1
    return isP1;
}