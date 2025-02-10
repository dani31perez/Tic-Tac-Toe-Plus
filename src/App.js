import "./styles.css";
import { useState } from "react";

function Square({ value, onSquareClick, highlight }) {
  return (
    <button className={"square " + highlight} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentPosition, calculateWinner }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    onPlay(nextSquares, i);
  }

  return (
    <>
      <div className="container h-100">
        <div className="row row-tic">
          <div className="col col-xxl col-tic">
            <Square
              value={squares[0]}
              onSquareClick={() => handleClick(0)}
              highlight={currentPosition == 0 ? "highlight" : ""}
            />
          </div>
          <div className="col col-tic">
            <Square
              value={squares[1]}
              onSquareClick={() => handleClick(1)}
              highlight={currentPosition == 1 ? "highlight" : ""}
            />
          </div>
          <div className="col col-tic">
            <Square
              value={squares[2]}
              onSquareClick={() => handleClick(2)}
              highlight={currentPosition == 2 ? "highlight" : ""}
            />
          </div>
        </div>
        <div className="row row-tic">
          <div className="col col-tic">
            <Square
              value={squares[3]}
              onSquareClick={() => handleClick(3)}
              highlight={currentPosition == 3 ? "highlight" : ""}
            />
          </div>
          <div className="col col-tic">
            <Square
              value={squares[4]}
              onSquareClick={() => handleClick(4)}
              highlight={currentPosition == 4 ? "highlight" : ""}
            />
          </div>
          <div className="col col-tic">
            <Square
              value={squares[5]}
              onSquareClick={() => handleClick(5)}
              highlight={currentPosition == 5 ? "highlight" : ""}
            />
          </div>
        </div>
        <div className="row row-tic">
          <div className="col col-tic">
            <Square
              value={squares[6]}
              onSquareClick={() => handleClick(6)}
              highlight={currentPosition == 6 ? "highlight" : ""}
            />
          </div>
          <div className="col col-tic">
            <Square
              value={squares[7]}
              onSquareClick={() => handleClick(7)}
              highlight={currentPosition == 7 ? "highlight" : ""}
            />
          </div>
          <div className="col col-tic">
            <Square
              value={squares[8]}
              onSquareClick={() => handleClick(8)}
              highlight={currentPosition == 8 ? "highlight" : ""}
            />
          </div>
        </div>
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

  function calculateWinner() {
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
        currentSquares[a] &&
        currentSquares[a] === currentSquares[b] &&
        currentSquares[a] === currentSquares[c]
      ) {
        return currentSquares[a];
      }
    }
    return null;
  }

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

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to start";
    }
    return (
      <li key={move}>
        <button className="mov-tic" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="row">
        <div className="status text-center">{status}</div>
      </div>
      <div class="row justify-content-center grid-container">
        <div class="col-6">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            currentPosition={currentPosition}
            calculateWinner={calculateWinner}
          />
        </div>
        <div class="col-4">
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </>
  );
}
