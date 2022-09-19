/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// var WIDTH = 7;
// var HEIGHT = 6;

const WIDTH = 7;
const HEIGHT = 6;
let clickCount = 0;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// TODO: set "board" to empty HEIGHT x WIDTH matrix array
// These are the two arrays that will house the game board, which will be a table that we
// will create below.  These arrays will contain the data 
function makeBoard() {
  // Here we are creating the outer array that will house the arrays that make up 
  // the rows of the matrix
  let arr = new Array(HEIGHT);
  // This loop iterates 6 times to create the number of inner arrays equal to the height 
  // specified above, which will be the rows of the game board.
  for(let i=0; i<HEIGHT; i++){
    // Here each iteration creates a new array
    arr[i] = new Array(WIDTH);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

// (X) TODO: add comment for this code
// This function is creating the HTML table and row of columns that will later be clickable
function makeHtmlBoard() {
  // Here we are getting the "htmlBoard" variable from the element in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // Here we are creating the top, clickable row, that will be where each player 
  // "drops" their game piece into the column.  We will then append it to the htmlBoard 
  const top = document.createElement("tr");
  // Here we are giving the top table row we just created an id for later
  top.setAttribute("id", "column-top");
  // Here we are making that top row clickable.  The function in this event 
  // listener (defined below) will be what will mark the <td> as 'occupied by a game piece'
  top.addEventListener("click", handleClick(evt);
  //This loop is iterating 7 times to create the number of clickable cells equal to the width  
  //specified above in the top table row, which will then be the tops of the columns the player
  //  will "drop" their game piece into
  for (let x = 0; x < WIDTH; x++) {
    // Here we are creating the cells in the top table row
    const headCell = document.createElement("td");
    // Here we are setting the id for the cells of the top table row to use later
    headCell.setAttribute("id", x);
    // Here we are adding the newly-created cells to the top table row
    top.append(headCell);
  }
  // Here we are adding the top table row to the matrix 
  htmlBoard.append(top);
  //(X) TODO: add comment for this code
  // This loop is iterating 6 times to create the remaining game board rows equal to the height 
  // specified above
  for (let y = 0; y < HEIGHT; y++) {
    // Here is where the remaining table rows of the game board are being created
    const row = document.createElement("tr");
    // This loop is iterating over the cells in the top table row to create the cells in the remaining 
    // rows that will become the columns that the game pieces are dropped into.    
    for (let x = 0; x < WIDTH; x++) {
    // Here we are creating the actual cells 
      const cell = document.createElement("td");
      // Here we are setting an ID for each cell of the game board for later use
      cell.setAttribute("id", `${y}-${x}`);
      // Here we are appending the newly created cells to the table rows we just created above
      row.append(cell);
    }
    // This is where the newly-created rows are being added to the game board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// TODO: write the real version of this, rather than always returning 0
function findSpotForCol(x) {
  if((y, x).class = occupied){
    return ;
} else if((y, x) = null) {
  placeInTable(y,x);
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */
 // TODO: make a div and insert into correct table cell
function placeInTable(y, x) {
  if(currPlayer = 1){ 
    const redPiece = document.createElement("div");
    redPiece.setAttribute("class", "piece.player1");
    (y, x).append(redPiece);
    (y, x).classList.add("occupied")
  } else if(currPlayer = 2){
    const bluePiece = document.createElement("div");
    bluePiece.setAttribute("class", "piece.player2");
    (y, x).append(bluePiece);
    (y, x).classList.add("occupied")
  }
}

/** endGame: announce game end */
//(X) TODO: pop up alert message
function endGame() {
    alert("GAME OVER!");
  }
 


/** handleClick: handle click of column top to play piece */
// get x from ID of clicked cell
function handleClick(evt) {
  clickCount++;
  const x = +evt.target.id;
  
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return placeInTable(y, x);
  } else if (y.classList.contains("occupied")){
    return (y + 1) = findSpotForCol(x);
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // (X) TODO: check if all cells in board are filled; if so call, call endGame
  if(checkForTie()) {
    return endGame("It's a Tie!");
  }

  function checkForTie(){
    cells.every(function (cells) {
      cells.classList.contains("occupied");
      return true;
    })
  }  
  
  // switch players
  // (X) TODO: switch currPlayer 1 <-> 2
  if(clickCount % 2 !== 0){
    currPlayer = 1
  } else if(clickCount % 2 === 0){
    currPlayer = 2;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // These two loops check for winning patterns. The outer loop iterates to a row, 
  // and then the inner loop checks each cell for a winning pattern before moving on 
  // to the next row via the outer loop.
  for (let y = 0; y < HEIGHT; y++) {
    // This loop iterates over each cell within a rows
    for(let x = 0; x < WIDTH; x++) {
      // The horiz variable identifies winning horizontal patterns
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // The vert variable identifies winning vertical patterns
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // The diagDR variable identifies winning right diagonal patterns
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // the diagDL variable identifies winning left diagonal patterns
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // This statement returns true when a winning pattern is identified
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();