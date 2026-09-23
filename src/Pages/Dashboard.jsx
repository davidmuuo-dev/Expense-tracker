import { useRef, useState } from "react";
import DashboardInput from "../Components/DashboardInput";

import ButtonPrimary from "../Components/ButtonPrimary";
import ButtonSecondary from "../Components/ButtonSecondary";
import IncomeInput from "../Components/IncomeInput";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import ExpenseSummary from "../Components/ExpenseSummary";
import TransactionsComponent from "../Components/TransactionsComponent";

export default function Dashboard() {
    const addTransactionForm = useRef(null);
    const warning = useRef(null);
    const addIncome = useRef(null);
    const [expenseName, setExpenseName] = useState("");
    const [expensePrice, setExpensePrice] = useState("");
    const [income, setIncome] = useState("");
    const User = JSON.parse(localStorage.getItem("User"));
    const [Transactions, setTransactions] = useState(
        JSON.parse(localStorage.getItem("Expenses")) || []
    );

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
            setTransactions(JSON.parse(localStorage.getItem("Expenses")));
            setExpenseName("");
            setExpensePrice("");
            addTransactionForm.current.classList.remove("flex");
            addTransactionForm.current.classList.add("hidden");
        } else {
            warning.current.classList.remove("hidden");
        }
    }

    function handleCloseAddTransactionForm() {
        addTransactionForm.current.classList.remove("flex");
        addTransactionForm.current.classList.add("hidden");
    }

    {
        /*====================
          CALCULATING TOTAL EXPENSE
          =======================*/
    }
    const totalExpenditure = [];
    Transactions.map(entry => totalExpenditure.push(Number(entry.price)));
    const allTotal = totalExpenditure.reduce((a, b) => a + b, 0);

    {
        /*====================
          INCOME CLASS OBJECT
          =======================*/
    }
    class Income {
        constructor(amount) {
            this.amount = amount;
            this.date = Date.now();
            this.id = crypto.randomUUID();
        }
    }

    {
        /*====================
          INCOME HANDLING FUNCTION
          =======================*/
    }

    function handleIncome() {
        if (income !== "") {
            const existingIncome =
                JSON.parse(localStorage.getItem("Income")) || [];
            const newIncome = [...existingIncome];
            let addIncome = new Income(Number(income));
            newIncome.push(addIncome);
            localStorage.setItem("Income", JSON.stringify(newIncome));
            setIncome("");
        }
    }

    const incomeList = JSON.parse(localStorage.getItem("Income")) || [];
    const totalIncome = incomeList.reduce((a, b) => {
        return a + b.amount;
    }, 0);

    function handleCloseAddIncome() {
        setIncome("");
        addIncome.current.classList.add("hidden");
        addIncome.current.classList.remove("block");
    }

    return (
        <div className="h-dvh w-dvw">
            <Header User={User} totalIncome={totalIncome} />
            {/*====================
          Main section
          =======================*/}
            <main className="flex flex-col">
                {/*====================
          sidebar section
          =======================*/}
                <Sidebar
                    addIncome={addIncome}
                    addTransactionForm={addTransactionForm}
                />
                {/*====================
          Main side section
          =======================*/}
                <div className="relative grow gap-20 md:gap-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
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
                            <div className="flex flex-col gap-4 md:gap-2 mt-4 md:mt-2">
                                <p className="text-sm text-gray-400 ">
                                    Total Income: Kshs.
                                    <strong className="text-green-500">
                                        {totalIncome.toFixed(2)}
                                    </strong>{" "}
                                </p>
                                <p className="text-sm text-gray-400 ">
                                    Balance: Kshs.
                                    <strong className="text-green-500">
                                        {(totalIncome - allTotal).toFixed(2)}
                                    </strong>{" "}
                                </p>
                                <p className="text-sm text-gray-400 ">
                                    Total Expenditure: Kshs.
                                    <strong className="text-red-500">
                                        {allTotal.toFixed(2)}
                                    </strong>
                                </p>
                            </div>
                            <IncomeInput
                                handleCloseAddIncome={handleCloseAddIncome}
                                onClick={handleIncome}
                                addIncome={addIncome}
                                value={income}
                                onChange={e => setIncome(e.target.value)}
                            />
                        </div>
                    </div>
                    <ExpenseSummary Transactions={Transactions} />
                </div>
                {/*====================
          Transactions  section
          =======================*/}
                <TransactionsComponent
                    incomeList={incomeList}
                    Transactions={Transactions}
                    setTransactions={setTransactions}
                />
            </main>
        </div>
    );
}
