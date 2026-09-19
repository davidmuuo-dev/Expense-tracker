export default function ButtonPrimary({ children, onClick, className = "" }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1   bg-sky-600 text-white rounded-lg ${className} `}
        >
            {children}
        </button>
    );
}
