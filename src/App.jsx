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
            return { winner: squares[a], winnerLine: lines[i] };
        }
    }

    return { winner: null, winnerLine: null };
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);

    const currentSquares = history[currentMove];

    const { winner, winnerLine } = calculateWinner(currentSquares);
    let status;

    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        if (currentSquares.includes(null)) {
            status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
        } else {
            status = `It's a Draw!`;
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

    const sortedMoves = isAscending ? history : [...history].reverse();

    const moves = sortedMoves.map((squares, move) => {
        let description;
        const actualMove = isAscending ? move : history.length - 1 - move;

        if (actualMove > 0) {
            description = `Go to the move #${actualMove}`;
        } else {
            description = `Go to the Start Game`;
        }

        return (
            <li
                key={move}
                className="mb-3 bg-gray-100 py-1 px-3 rounded-md text-red-500 font-medium shadow-sm transition-all duration-150 hover:bg-gray-200"
            >
                <button onClick={() => jumpTo(actualMove)} className="w-full">
                    {description}
                </button>
            </li>
        );
    });

    function resetGame() {
        setCurrentMove(0);
        setXIsNext(true);
        setHistory([Array(9).fill(null)]);
    }

    function sortHistory() {
        setIsAscending(!isAscending);
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
                                winnerLine={winnerLine}
                            />
                            <div className="flex justify-between">
                                <Button handleClick={resetGame}>
                                    Reset Game
                                </Button>
                                <Button handleClick={sortHistory}>
                                    Sort History
                                </Button>
                            </div>
                        </div>
                        <div className="min-w-[300px]">
                            <h2 className="text-xl mb-3">
                                {currentMove === 0
                                    ? 'Start By Clicking On Any Square'
                                    : `You are at move #${currentMove}`}
                            </h2>
                            <ul className="list-none overflow-y-scroll h-[280px] bg-gray-50 p-3">
                                {moves}
                            </ul>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
