export default function DashboardInput({
    className = "",
    value,
    setValue,
    placeholder
}) {
    return (
        <input
            placeholder={placeholder}
            className={`w-[90%] rounded-lg p-2 bg-gray-100 ${className}`}
        />
    );
}
