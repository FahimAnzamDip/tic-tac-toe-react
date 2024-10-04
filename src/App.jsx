import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Button from './components/Button';

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

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove];

    const winner = calculateWinner(currentSquares);
    let status;

    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        if (currentSquares.includes(null)) {
            status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
        } else {
            status = `Game Over!`;
        }
    }

    function handlePlay(nextSquares) {
        setXIsNext(!xIsNext);
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move) {
        setCurrentMove(move);
        setXIsNext(move % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;

        if (move > 0) {
            description = `Go to the move #${move}`;
        } else {
            description = `Go to the Start Game`;
        }

        return (
            <li
                key={move}
                className="list-none mb-3 bg-gray-100 py-1 px-3 rounded-md text-red-500 font-medium shadow-sm transition-all duration-150 hover:bg-gray-200"
            >
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    function resetGame() {
        setCurrentMove(0);
        setXIsNext(true);
        setHistory([Array(9).fill(null)]);
    }

    return (
        <>
            <section className="flex justify-center items-center h-screen">
                <div>
                    <section>
                        <h1 className="text-3xl mb-5">{status}</h1>
                    </section>
                    <section className="flex space-x-10">
                        <div>
                            <Board
                                xIsNext={xIsNext}
                                squares={currentSquares}
                                onPlay={handlePlay}
                                winner={winner}
                            />
                            <Button handleClick={resetGame}>Reset Game</Button>
                        </div>
                        <div>{moves}</div>
                    </section>
                </div>
            </section>
        </>
    );
}
