export default function ButtonSecondary({ children, className = "" }) {
    return (
        <button
            className={`px-3 py-1 border-2   border-sky-600 text-white rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}
