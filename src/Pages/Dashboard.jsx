import { Link } from "react-router";
import { useRef } from "react";
import Input from "../Components/Input";
import { IoMenuSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

export default function Dashboard() {
    const dropMenu = useRef(null);
    const User = JSON.parse(localStorage.getItem("User"));

    function onSeeMenu() {
        dropMenu.current.classList.toggle("hidden");
    }
    return (
        <div className="h-dvh w-dvw">
            {/*====================
          Header section
          =======================*/}
            <header className="relative w-full  p-2  md:flex  md:justify-between  border-2 border-gray-300 ">
                <div className="flex gap-3 items-center  grow md:grow-0 md:w-[50%] ">
                    <p className="text-center text-lg font-semibold">LOGO</p>
                    <div className="p-1 bg-black/10 rounded-lg  md:grow-0 grow flex items-center">
                        <FaSearch className="text-xl font-light" />
                        <input className="grow  md:grow-0 outline-none     " />
                        <IoEnterOutline className="text-2xl" />
                    </div>

                    <button onClick={onSeeMenu} className="md:hidden">
                        <IoMenuSharp className=" text-2xl" />
                    </button>
                </div>
                <div
                    ref={dropMenu}
                    className="absolute top-12 md:static right-0 md:grow md:flex p-2 hidden md:visible border-2 border-black/30 rounded-md justify-self-end w-[50%] md:gap-4 shadow-2xl md:shadow-none md:border-0 shadow-black/50 "
                >
                    <div className="bg-gray-100 p-2 rounded-sm flex gap-2 items-center">
                        <FaRegUserCircle className="text-3xl fill-gray-400" />
                        {User.name}
                    </div>
                    <div className="bg-gray-100 text-xl font-medium mt-2 p-2 rounded-sm flex gap-2 items-center">
                        <PiMoneyWavyDuotone />
                        123k
                    </div>
                    <div className="bg-gray-100 p-2 mt-2 rounded-sm flex gap-2 items-center">
                        <IoSettingsOutline className="text-3xl fill-gray-400" />
                        Settings
                    </div>
                    <div className="bg-gray-100 p-2 mt-2 rounded-sm flex gap-2 items-center text-red-500">
                        <IoIosLogOut className="text-3xl fill-red-500" />
                        Logout
                    </div>
                </div>
            </header>

            {/*====================
          Main section
          =======================*/}
            <main className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                <div className="bg-sky-500">A</div>
                <div className="bg-green-500">B</div>
                <div className="bg-yellow-500">C</div>
            </main>
        </div>
    );
}
