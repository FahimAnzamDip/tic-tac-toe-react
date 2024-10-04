export default function Button({ children, handleClick }) {
    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 text-white font-medium px-3 py-2 ml-1 mr-1 mt-5 rounded-md hover:bg-blue-600 transition-all duration-150"
        >
            {children}
        </button>
    );
}
