export default function Square({ value, onSquareClick, classes }) {
    return (
        <button
            onClick={onSquareClick}
            className={`bg-white border border-gray-400 h-20 w-20 m-1 text-3xl ${classes}`}
        >
            <span>{value}</span>
        </button>
    );
}
