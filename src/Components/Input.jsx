export default function Input({ type, placeholder, value, setValue }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            required
            onChange={e => setValue(e.target.value)}
            className="w-[99%] bg-white/20  backdrop-blur-sm p-3 rounded-lg outline-2 outline-sky-700"
        />
    );
}
