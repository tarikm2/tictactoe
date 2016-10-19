
var Agent = function () {


} //creating an agent object

//the select method uses minMax to recursively find a solution
Agent.prototype.selectMove = function (board) {


    var result = minMax(board).move;
    return result;

}

function minMax(board) {

    //if the game is over, return the apparent value of the game
    var gameResult = board.gameOver();
    if (gameResult != 0) {
        if (board.playerOne) {
            if (gameResult == 1) return { score: 1, move: null }; //board.X[board.X.length - 1] };
            else if (gameResult == 2) return { score: -1, move: null}; //board.X[board.X.length - 1] };
            else if (gameResult == 3) return { score: 0, move: null}; //board.X[board.X.length - 1] };
        } else {
            if (gameResult == 1) return { score: -1, move: null}; //board.O[board.O.length - 1] };
            else if (gameResult == 2) return { score: 1, move: null};//board.O[board.O.length - 1] };
            else if (gameResult == 3) return { score: 0, move: null};//board.O[board.O.length - 1] };
        }
    }

    gameScores = [];
    gameMoves = [];
    //for every free move we can make on the board
    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)) {
            board.move(i);

            //recursive section, for every move store the result and move number
            var res = minMax(board);
            gameScores.push(res.score);
            gameMoves.push(i);
            
        }
    }

    //console.log(" Game Moves : " + gameMoves + "  GameScores : " + gameScores);
    if (board.playerOne) {
        var maxScore = -1;
        var maxMove = -1;
        for (var i = 0; i < gameScores.length; i++) {
            if (gameScores[i] > maxScore) {
                maxScore = gameScores[i];
                maxMove = gameMoves[i];
                
            }
        }
        //console.log("the max game move was : " + maxMove);
        return { score: maxScore, move: maxMove };

    } else {
        var minScore = 1;
        var minMove = -1;
        for (var i = 0; i < gameScores.length; i++) {
            if (gameScores[i] < minScore) {
                minScore = gameScores[i];
                minMove = gameMoves[i];
            }
        }
        return { score: minScore, move: minMove };
    }
}












var AgentTwo = function () {


} //creating an agent object

//the select method uses minMax to recursively find a solution
AgentTwo.prototype.selectMove = function (board) {


    var choices = [];

    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)) choices.push(i);
    }

    return choices[Math.floor(Math.random() * choices.length)];;

}
