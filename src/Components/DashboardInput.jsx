export default function DashboardInput({
    className = "",
    placeholder,
    onChange,
    value,
    type
}) {
    return (
        <input
            required
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`outline-0 w-[90%] rounded-lg p-2 bg-gray-100 ${className}`}
        />
    );
}
