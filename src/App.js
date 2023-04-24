import { useState } from 'react';

// This function defines a Square component which returns a button with the given value and onClick function.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


// BOARD
// the current state of the game | status of which player's turn it is | function to handle playing a move.
function Board({ xIsNext, squares, onPlay }) {
  // handleClick is called when a square is clicked.
  function handleClick(i) {
    //  If the game has already been won or the square has already been played, the function returns early
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //  Otherwise, it sets the value of the nextSquares array depending on whose turn it is

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // then calls the onPlay function with the updated nextSquares array.
    onPlay(nextSquares);
  }

  // This variable calculates the winner of the game using the calculateWinner function.
  const winner = calculateWinner(squares);
  // This var sets the status of the game depending on whether there is a winner or not and whose turn it is.
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }



  // BOARD(cont.)
  // This function returns the Board component with the status and a grid of 9 squares.
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}



// This code exports a React component called "Game"
// It imports "useState" and a custom component called "Board"
// It also exports a helper function called "calculateWinner"
// GAME
export default function Game() {
  // This component uses hooks to manage state:
  // "history" keeps track of all moves played in the game so far
  // "currentMove" keeps track of the index of the current move
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // Determine whether it's X's turn (if currentMove is even, it's X's turn)
  const xIsNext = currentMove % 2 === 0;

  // Get the current state of the squares by referencing the currentMove index of history
  const currentSquares = history[currentMove];


  // GAME(cont.)

  // handlePlay
  // This function is passed down to the Board component as a prop
  // It takes in the next state of the squares and updates the history and currentMove state accordingly
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // jumpTo
  // This function is called when a player clicks on a move in the move history list
  // It updates the currentMove state to the index of the move clicked
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }





  // history.map
  // This maps over the history of moves and creates a list of buttons that display the move number if its not the first move ( move > 0)
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        {/* // When a button is clicked, it calls the "jumpTo" function with the index of the move as an argument */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });



  // return
  // This returns the JSX for the Game component
  // It renders a Board component with the currentSquares and handlePlay props
  // It also renders a list of buttons created by the "moves" variable
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// This is a helper function that determines the winner of the game
function calculateWinner(squares) {
  // "lines" represents all possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // This function checks for a winner in a Tic-Tac-Toe game given the current state of the board.
  // The function receives an array called squares that contains the current state of the game.
  // It loops through all the possible winning combinations defined in the 'lines' array.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // For each combination, it checks if the squares at the three positions contain the same value (either 'X' or 'O').
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // If a winning combination is found, the function returns the value of the winning square (either 'X' or 'O').
      return squares[a];
    }
  }
  // If no winning combination is found, the function returns null.
  return null;
}

