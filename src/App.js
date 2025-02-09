import "./styles.css";
import { useState } from "react";

function Square({ value, onSquareClick, highlight }) {
  return (
    <button className={"square " + highlight} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentPosition }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="bard-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          highlight={currentPosition == 0 ? "highlight" : ""}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          highlight={currentPosition == 1 ? "highlight" : ""}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          highlight={currentPosition == 2 ? "highlight" : ""}
        />
      </div>
      <div className="bard-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          highlight={currentPosition == 3 ? "highlight" : ""}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          highlight={currentPosition == 4 ? "highlight" : ""}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          highlight={currentPosition == 5 ? "highlight" : ""}
        />
      </div>
      <div className="bard-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          highlight={currentPosition == 6 ? "highlight" : ""}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          highlight={currentPosition == 7 ? "highlight" : ""}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          highlight={currentPosition == 8 ? "highlight" : ""}
        />
      </div>
    </>
  );
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [lastMove, setLastMove] = useState([]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const currentPosition = lastMove[currentMove - 1];

  function handlePlay(nextSquares, position) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextMove = [...lastMove.slice(0, currentMove), position];
    setHistory(nextHistory);
    setLastMove(nextMove);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentPosition={currentPosition}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
