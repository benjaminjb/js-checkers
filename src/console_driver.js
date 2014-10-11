var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    console.log(numToChar[i] + " |" + board[i].join(" "));
  }
};

$(document).on('boardChange', function() {
  displayBoard();
});

$(document).on('pieceTaken', function(e,currentPlayer,row,col) {
  alert("The " + currentPlayer + " player lost a piece at " + numToChar[row] + "" + col);

});

$(document).on('invalidMove', function(e, error_message) {
  alert(error_message);
});

$(document).on('updateRound', function(e, round) {
  console.log('The round is ' + round);
});

$(document).on('winnerNamed', function(e, winner) {
  alert(winner +' won');
  endGame();
});

// var play = function() {
//   resetBoard();
//   while (winner===null) {
//     getMove();
//   }
// };

var getMove = function() {
  var starting = prompt(currentPlayer + ", what piece would you like to move? Row, column (e.g., A2).").trim();
  quit(starting);
  var startingParsed = parseAnswer(starting);
  var ending = prompt(currentPlayer + ", to what spot would you like to move? Row, column (e.g., A2).").trim();
  quit(ending);
  var endingParsed = parseAnswer(ending);
  var move_object = {
    startingRow: startingParsed[0],
    startingCol: startingParsed[1],
    endingRow: endingParsed[0],
    endingCol: endingParsed[1]
  }
  return move_object;
}

var quit = function(string) {
  if (string[0] === 'q') {
      endGame();
    }
};

var endGame = function() {
  alert('Thanks for playing');
  play();
};

var parseAnswer = function(string) {
  answer = []
  if (string.length===2) {
    answer.push(charToNum[string[0].toLowerCase()]);
    answer.push(parseInt(string[1]));
  } else {
    alert("Invalid entry for start point");
    getMove();
  }
  return answer;
};

var play = function() {
  resetBoard();
  displayBoard();
  var move
  while (winner===null) {
    move = getMove();
    attemptMove(move.startingRow,move.startingCol,move.endingRow,move.endingCol);
  }
};

// $(document).on('ready', function(){
//   play();
// });

  // starting = prompt(currentPlayer + ", what piece would you like to move? Row, column (e.g., A 2).")
  // startingRow = (/(\w)/.exec(starting)[0].toUpperCase().charCodeAt(0) - 65);
  // startingCol = /(\d)/.exec(starting)[0];
  // ending = prompt(currentPlayer + ", to what spot would you like to move? Row, column (e.g., A 2).")
  // endingRow = (/(\w)/.exec(starting)[0].toUpperCase().charCodeAt(0) - 65);
  // endingCol = /(\d)/.exec(starting)[0];
  // attemptMove(startingRow, startingCol, endingRow, endingCol);
  //quit game



