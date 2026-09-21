import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import Input from "../Components/Input";
import DashboardInput from "../Components/DashboardInput";
import { IoMenuSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import ButtonPrimary from "../Components/ButtonPrimary";
import ButtonSecondary from "../Components/ButtonSecondary";

export default function Dashboard() {
    const dropMenu = useRef(null);
    const addTransactionForm = useRef(null);
    const warning = useRef(null);
    const [expenseName, setExpenseName] = useState("");
    const [expensePrice, setExpensePrice] = useState("");
    const User = JSON.parse(localStorage.getItem("User"));
    const Transactions = JSON.parse(localStorage.getItem("Expenses")) || [];

    function onSeeMenu() {
        dropMenu.current.classList.toggle("hidden");
    }

    function handleShowAddTransactionForm() {
        addTransactionForm.current.classList.add("flex");
        addTransactionForm.current.classList.remove("hidden");
    }

    function handleCloseAddTransactionForm() {
        addTransactionForm.current.classList.remove("flex");
        addTransactionForm.current.classList.add("hidden");
    }

    {
        /*====================
          EXPENSES CLASS OBJECT
          =======================*/
    }

    class Expense {
        constructor(name, price) {
            this.name = name;
            this.price = price;
            this.date = Date.now();
            this.id = crypto.randomUUID();
        }
    }

    function addExpense() {
        if (expenseName !== "" && expensePrice !== "") {
            const existingExpenses =
                JSON.parse(localStorage.getItem("Expenses")) || [];
            const expenses = [...existingExpenses];
            let newExpense = new Expense(expenseName, expensePrice);
            expenses.unshift(newExpense);
            localStorage.setItem("Expenses", JSON.stringify(expenses));
            setExpenseName("");
            setExpensePrice("");
            addTransactionForm.current.classList.remove("flex");
            addTransactionForm.current.classList.add("hidden");
        } else {
            warning.current.classList.remove("hidden");
        }
    }

    {
        /*====================================
          CALCULATING TODAYS EXPENSE 
          =======================================*/
    }

    const todayExpenses = Transactions.filter(transaction => {
        const expenseDate = new Date(transaction.date);
        const today = new Date(Date.now());

        return expenseDate.toLocaleDateString() === today.toLocaleDateString();
    });

    const prices = [];
    todayExpenses.map(entry => {
        return prices.push(Number(entry.price));
    });
    const todayTotal = prices.reduce((a, b) => a + b);

    {
        /*====================================
          CALCULATING WEEKLY EXPENSE 
          =======================================*/
    }
    let weekStart = new Date(Date.now());
    let weekDay = weekStart.getDay();
    let daysRemaining = 7 - Number(weekDay);
    const endDate = weekStart.getDate() + daysRemaining;
    let weekEnd = new Date(weekStart);
    weekEnd.setDate(endDate);
    console.log(weekStart.toDateString());
    console.log(weekDay);
    console.log(daysRemaining);
    console.log(endDate);
    console.log(weekEnd.toDateString());

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
                    className="absolute z-10 top-12 md:static right-0 md:grow md:flex p-2 hidden md:visible border-2 border-black/30 rounded-md justify-self-end w-[50%] md:gap-4 shadow-2xl md:shadow-none md:border-0 shadow-black/50 "
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
            <main className="flex flex-col">
                {/*====================
          sidebar section
          =======================*/}
                <div className=" h-[10%] ">
                    <button
                        onClick={handleShowAddTransactionForm}
                        className="md:hidden relative w-fit bg-gray-200 m-2 rounded-2xl  px-5 py-1"
                    >
                        Add
                        <MdAddCircleOutline className="absolute top-1 right-1" />
                    </button>
                </div>

                {/*====================
          Main side section
          =======================*/}
                <div className=" grow gap-20 md:gap-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                    <div
                        ref={addTransactionForm}
                        className="hidden md:flex justify-center items-center"
                    >
                        <div className="h-full p-2 mt-5 shadow-xl rounded-lg shadow-gray-300 flex flex-col w-[80%] justify-center items-center  gap-3 ">
                            <p>Add a transaction</p>
                            <p
                                ref={warning}
                                className="text-red-500 font-medium text-sm hidden"
                            >
                                You must enter something on both fields
                            </p>
                            <DashboardInput
                                onChange={e => setExpenseName(e.target.value)}
                                value={expenseName}
                                placeholder="Enter  the transaction"
                                type="text"
                            />
                            <DashboardInput
                                value={expensePrice}
                                onChange={e => setExpensePrice(e.target.value)}
                                placeholder="Amount spend"
                                type="number"
                            />
                            <div className="w-[80%] flex justify-between ">
                                <ButtonSecondary
                                    onClick={handleCloseAddTransactionForm}
                                    className="bg-sky-300 w-[40%]  "
                                >
                                    Cancel
                                </ButtonSecondary>
                                <ButtonPrimary
                                    onClick={addExpense}
                                    className="w-[40%]"
                                >
                                    Add
                                </ButtonPrimary>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="h-full p-2 mt-5 shadow-xl rounded-lg shadow-gray-200 flex flex-col w-[80%]  ">
                            <p className="text-gray-900 text-xl font-medium">
                                Welcome back {User.name}!
                            </p>
                            <p className="text-sm text-gray-400 ">
                                Balance:{" "}
                                <strong className="text-gray-950">
                                    234k
                                </strong>{" "}
                            </p>
                            <p className="text-sm text-gray-400 ">
                                Total Expenditure:{" "}
                                <strong className="text-gray-950">234k</strong>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="h-full p-2 mt-5 shadow-xl rounded-lg shadow-gray-300 flex flex-col w-[80%]  ">
                            <p className="text-sm text-gray-400">
                                Today: Kshs.
                                <strong className="text-gray-950">
                                    {todayTotal.toFixed(2)}
                                </strong>
                            </p>
                            <p className="text-sm text-gray-400">
                                Weekly:{" "}
                                <strong className="text-gray-950">
                                    34.56k
                                </strong>{" "}
                            </p>
                            <p className="text-sm text-gray-400">
                                Monthly:{" "}
                                <strong className="text-gray-950">
                                    34.56k
                                </strong>{" "}
                            </p>
                        </div>
                    </div>
                </div>
                {/*====================
          Transactions  section
          =======================*/}
                <div className="w-[80%] max-w-150 m-auto flex flex-col mt-30 gap-5 ">
                    <p className="font-medium text-lg font-sans">
                        Your Transactions
                    </p>

                    {Transactions.map(entry => {
                        const date = new Date(entry.date);
                        return (
                            <div
                                key={entry.id}
                                className=" flex bg-gray-100 p-2 rounded-lg justify-between items-center"
                            >
                                <div>
                                    <p>{entry.name}</p>
                                    <p>{entry.price}</p>
                                </div>
                                <div>
                                    <p>{date.toLocaleDateString()}</p>
                                    <p>{date.toLocaleTimeString()}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
