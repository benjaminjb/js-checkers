// functions for interaction between checkers.js and DOM

var displayBoard = function(board) {
	for (var row = 0; row < board.length; row++) {
		for (var col = 0; col < board[row].length; col++) {
			if (board[row][col] === 'wht') {
				$($('.row')[row].children[col]).html('<span class="wht piece"></span>');
			} else if (board[row][col] === 'red') {
				$($('.row')[row].children[col]).html('<span class="red piece"></span>');
			} else if (board[row][col] === 'WHT') {
				$($('.row')[row].children[col]).html('<span class="wht piece king"></span>');
			} else if (board[row][col] === 'RED') {
				$($('.row')[row].children[col]).html('<span class="red piece king"></span>');
			} else {
				$($('.row')[row].children[col]).empty();
			}
		}
	}
};

var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];

var moveObject = {};

var getMove = function(chosen) {
	var row = $('.row').index(chosen.parent());
	var col = chosen.parent().children().index(chosen);
	if ( Object.keys(moveObject).length == 0 ) {
		moveObject.startingRow = row;
		moveObject.startingCol = col;
	} else if ( Object.keys(moveObject).length == 2 ) {
		moveObject.endingRow = row;
		moveObject.endingCol = col;
		attemptMove(moveObject.startingRow,moveObject.startingCol,moveObject.endingRow,moveObject.endingCol);
		moveObject = {};
	}
};

//DOM interaction event handlers starts here
//Wait till document ready to hook clicks to DOM objects

$(document).on('ready', function(){

	$(document).on('dblclick', function() {
		endRound();
	});
 
	$('.start').on('click', function(){
		$('.round').remove();
		$('.playerUp').remove();
		$('.takenTaunt').remove();
	  resetBoard();
	  displayBoard(board);
	  $('.start').after("<div class='round'>The round is " + round + "</div>");
	  $('.round').after("<div class='playerUp'>Please move " + currentPlayer + "player</div>");
	  $('.playerUp').after("<div class='takenTaunt'>No pieces lost--yet.</div>");
	});

	$('.col').on('click', function (e) {
		var helper = $(this);
		getMove(helper);
	});

	$(document).on('boardChange', function() {
	  displayBoard(board);
	});

	$(document).on('pieceTaken', function(e,currentPlayer,row,col) {
	  $('.takenTaunt').html("The " + currentPlayer + " player lost a piece at " + numToChar[row] + "" + col);
	});

	$(document).on('invalidMove', function(e, error_message) {
	  $('.playerUp').html("Invalid move: " + error_message);
	});

	$(document).on('updateRound', function(e, round) {
	  $('.round').html("<div>The round is " + round + "</div>");
	  $('.playerUp').html("Please move " + currentPlayer + " player");
	});

	$(document).on('winnerNamed', function(e, winner) {
	  $('.playerUp').html(winner + "player won");
	});
});

// Reject code starts here

/* Alternate way to set up starting positions, before Shehzan told me about using the checkers.js board as a model for displaying/re-displaying the board */

// for (var x = 97; x <= 102; x + 5) {
// 	for (var i = x; i <= (x+2); i++) {
// 		for (var z = 0; z < 8; z++) {
// 			var row = ".row-"+String.fromCharCode(i);
// 			var col = ".col-"+z;
// 			var spot = $(row).find(col);
// 			if (!(spot.hasClass('empty')) && (x < 102)) {
// 				spot.html('<span class="red piece"></span>');
// 			} else if (!(spot.hasClass('empty')) && (x > 101)) {
// 				spot.html('<span class="white piece"></span>');
// 		}
// 	}
// }

/* Unnecessary DOM check to see if the piece touched belongs to the player; unecessary because the checkers.js logic checks for that */

// var piece = function(chosen) {
// 	if ($(chosen.children()).length === 0) {
// 		return false;
// 	}
// 	if (($(chosen.children()).attr('class').split(' ')[0]) === currentPlayer) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

/* Alternative attempt at getting position of clicked piece; only works if player clicks on own piece */

// 	$click = '.'+currentPlayer;
// 	$($click).on('click', function (e) {
// 		var rowRaw = $($(this).parent()).attr('class').split(' ')[1];
// 		var row = rowRaw[rowRaw.length-1]
// 		console.log(row);
// 		var colRaw = $(this).attr('class').split(' ')[1];
// 		var col = colRaw[colRaw.length-1]
// 		console.log(col);
// 	});