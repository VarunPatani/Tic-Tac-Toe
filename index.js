var curr_player = "X";
var board = ["", "", "", "", "", "", "", "", ""];
var winning_combos = [
  //rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagnols
  [0, 4, 8],
  [2, 4, 6],
];
var winCount = [0, 0];
var gameOver = false;
var count = 0;

$(".strg_X").css("text-decoration", "underline");
$(".player-con > button").on("click", (e) => {
  $("body").toggleClass("change");
});

$(".TTT-con > button").on("click", (e) => {
    count++;
    var chosen_cell = e.target.className;
    if (curr_player === "X") {
      $("." + chosen_cell)
        .text("X")
        .addClass("clicked");
      addToBoard(chosen_cell, curr_player);
      $(".strg_X").css("text-decoration", "none");
      $(".strg_O").css("text-decoration", "underline");
      curr_player = "O";
    } else {
      $("." + chosen_cell)
        .text("O")
        .addClass("clicked");
      addToBoard(chosen_cell, curr_player);
      $(".strg_X").css("text-decoration", "underline");
      $(".strg_O").css("text-decoration", "none");
      curr_player = "X";
    }
    gameWon(winner());
    checkTie();
    if (gameOver) {
      setTimeout(()=>{
        GameOver();
      } ,1500);
    }
});

$(".back").on("click", () => {
  $("body").toggleClass("change");
  $("h1").text("Tic-Tac-Toe");
});

$(".restart").on("click",()=> {
  winCount = [0,0];
  $(".X_score > p").text(winCount[0]);
  $(".O_score > p").text(winCount[1]);
  GameOver();
})

function addToBoard(value, player) {
  if (player === "X") {
    board[value.slice(0, 1)] = "X";
  } else {
    board[value.slice(0, 1)] = "O";
  }
}

function winner() {
  let wnr = null;
  for (let i = 0; i < winning_combos.length; i++) {
    let row = winning_combos[i];
    let c0 = row[0];
    let c1 = row[1];
    let c2 = row[2];
    if (board[c0] === board[c1] && board[c1] === board[c2] && board[c0] !== "") {
      wnr = board[c0];
    }
  }
  return wnr;
}

function gameWon(value) {
  if (value === "X") {
    winCount[0] += 1;
    $(".X_score > p").text(winCount[0]);
    $("h1").text("X Wins");
    $(".TTT-con").css("pointer-events", "none");
    gameOver = true;
  } else if (value === "O") {
    winCount[1] += 1;
    $(".O_score > p").text(winCount[1]);
    $("h1").text("O Wins");
    $(".TTT-con").css("pointer-events", "none");
    gameOver = true;
  }
}

function checkTie() {
  if (board.length - count === 0) {
    if (winner()) {
      gameWon(winner());
    } else {
      $("h1").text("Tie");
      gameOver = true;
    }
  }
}


function GameOver() {
    $(".TTT-con > button").text("").removeClass("clicked");
    board = ["", "", "", "", "", "", "", "", ""];
    count = 0;
    gameOver = false;
    curr_player = "X";
    $(".strg_X").css("text-decoration", "underline");
    $(".strg_O").css("text-decoration", "none");
    $("h1").text("Tic-Tac-Toe")
    $(".TTT-con").css("pointer-events", "all");
}


