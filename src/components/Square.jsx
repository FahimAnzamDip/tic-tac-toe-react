export default function Square({ value, onSquareClick }) {
    return (
        <button
            onClick={onSquareClick}
            className="bg-white border border-gray-400 h-20 w-20 m-1 text-3xl"
        >
            <span>{value}</span>
        </button>
    );
}
