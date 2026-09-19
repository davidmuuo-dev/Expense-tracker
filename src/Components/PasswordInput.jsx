import { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
export default function PasswordInput({ placeholder, value, setValue }) {
    const [showPassword, setShowPassword] = useState(false);
    function onSeePassword() {
        setShowPassword(prev => !prev);
    }
    return (
        <div className="flex gap-1 p-1 items-center w-[99%] bg-white/20  backdrop-blur-sm  rounded-lg outline-2 outline-sky-700">
            <input
                className=" grow p-2 "
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                required
            />
            <button onClick={onSeePassword}>
                {showPassword ? (
                    <GoEyeClosed className="text-4xl px-2" />
                ) : (
                    <GoEye className="text-4xl px-2" />
                )}
            </button>
        </div>
    );
}
