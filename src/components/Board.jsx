import Square from './Square';

export default function Board({
    xIsNext,
    squares,
    onPlay,
    winner,
    winnerLine,
}) {
    function handleClick(i) {
        if (squares[i] || winner) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }

        onPlay(nextSquares);
    }

    function renderSquare(index) {
        return (
            <Square
                key={index}
                onSquareClick={() => handleClick(index)}
                value={squares[index]}
                classes={
                    winnerLine?.includes(index) ? 'bg-green-500 text-white' : ''
                }
            />
        );
    }

    const createGrid = () => {
        const grid = [];

        for (let row = 0; row < 3; row++) {
            const rowSquares = [];
            for (let col = 0; col < 3; col++) {
                rowSquares.push(renderSquare(row * 3 + col));
            }
            grid.push(
                <div className="flex" key={row}>
                    {rowSquares}
                </div>
            );
        }
        return grid;
    };

    return <>{createGrid()}</>;
}
