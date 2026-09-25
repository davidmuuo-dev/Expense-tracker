import { useRef, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

export default function Header({
  setTransactions,
  Transactions,
  User,
  totalIncome,
}) {
  const dropMenu = useRef(null);
  const searchContainer = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);

  function onSeeMenu() {
    dropMenu.current.classList.toggle("hidden");
  }

  function logout() {
    window.location = "/";
  }

  function handleSearch() {
    const searchedItem = Transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchedItems(searchedItem);
    searchContainer.current.classList.remove("hidden");
  }

  function deleteTransaction(id) {
    let newExpenses = Transactions.filter((entry) => entry.id !== id);
    setTransactions(newExpenses);
    localStorage.setItem("Expenses", JSON.stringify(newExpenses));
    setSearchedItems(
      newExpenses.filter((transaction) =>
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }

  function clearSearch() {
    setSearchTerm("");
    setSearchedItems([]);
    searchContainer.current.classList.add("hidden");
  }

  return (
    <header className="relative w-full p-2  bg-sky-200 md:flex  md:justify-between md:items-center md:px-10 md:py-3">
      <div className="flex w-full justify-between gap-3 items-center   md:grow-0 md:w-[50%] ">
        <div className="relative bg-white border rounded-lg py-1 flex gap-2 items-center  px-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <IoSearchSharp text-2xl font-light />
          <input
            type="text"
            className="outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
          <div
            ref={searchContainer}
            className="absolute  h-100 overflow-scroll hidden z-10 top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            {searchedItems.length === 0 && "No items found"}
            {searchedItems.map((entry) => {
              const date = new Date(entry.date);
              return (
                <div
                  onClick={() => deleteTransaction(entry.id)}
                  key={entry.id}
                  className=" my-1 flex bg-gray-100 p-2 rounded-lg justify-between items-center"
                >
                  <div>
                    <p>{entry.name}</p>
                    <p className="text-red-500 font-light">
                      {" "}
                      -{Number(entry.price).toFixed(2)}
                    </p>
                  </div>
                  <div className=" text-sm">
                    <p>{date.toLocaleDateString()}</p>
                    <p>{date.toLocaleTimeString()}</p>
                  </div>
                </div>
              );
            })}
            <button
              onClick={clearSearch}
              type="button"
              className="bg-blue-500 mt-3 w-full text-white py-1 px-3 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
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
          Kshs. <strong className="text-green-500"> {totalIncome}</strong>
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
