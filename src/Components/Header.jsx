import { useRef } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

export default function Header({ User, totalIncome }) {
    const dropMenu = useRef(null);

    function onSeeMenu() {
        dropMenu.current.classList.toggle("hidden");
    }

    function logout() {
        window.location = "/";
    }

    return (
        <header className="relative w-full p-2  bg-sky-200 md:flex  md:justify-between md:items-center md:px-10 md:py-3">
            <div className="flex w-full justify-between gap-3 items-center   md:grow-0 md:w-[50%] ">
                <p className="text-center text-lg font-semibold">LOGO</p>
                <button onClick={onSeeMenu} className="md:hidden">
                    <IoMenuSharp className=" text-2xl" />
                </button>
            </div>
            <div
                ref={dropMenu}
                className=" absolute z-10 top-12 md:static right-0 md:grow md:flex p-2 hidden border-2 border-black/30 rounded-md justify-self-end w-[50%] md:gap-4 shadow-2xl md:shadow-none md:border-0 shadow-black/50 items-center md:items-start "
            >
                <div className="bg-gray-50 p-2 h-fit rounded-sm flex gap-2 items-center">
                    <FaRegUserCircle className="text-3xl fill-gray-400" />
                    {User.name}
                </div>
                <div className="bg-gray-100 text-xl font-medium mt-2 p-2 rounded-sm flex gap-2 items-center">
                    <PiMoneyWavyDuotone />
                    Kshs.{" "}
                    <strong className="text-green-500"> {totalIncome}</strong>
                </div>

                <div
                    onClick={logout}
                    className="bg-gray-100 p-2 mt-2 rounded-sm flex gap-2 items-center text-red-500"
                >
                    <IoIosLogOut className="text-3xl fill-red-500" />
                    Logout
                </div>
            </div>
        </header>
    );
}
