import { useRef, useState } from "react";
import AddIncome from "../Components/AddIncome";
import AddExpenses from "../Components/AddExpenses";
import Header from "../Components/Header";
import { MdAddCircleOutline } from "react-icons/md";
import ExpenseSummary from "../Components/ExpenseSummary";
import TransactionsComponent from "../Components/TransactionsComponent";

export default function Dashboard() {
  const addTransactionForm = useRef(null);
 const addIncome = useRef(null); 

  const [userIncome, setUserIncome] = useState(
    JSON.parse(localStorage.getItem("Income")) || [],
  );
  const User = JSON.parse(localStorage.getItem("User"));
  const [Transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("Expenses")) || [],
  );

  function handleShowAddIncome() {
    addIncome.current.classList.add("block");
    addIncome.current.classList.remove("hidden");
  }

  {
    //====================
    //    CALCULATING TOTAL EXPENSE
    //=======================
  }
  const totalExpenditure = [];
  Transactions.map((entry) => totalExpenditure.push(Number(entry.price)));
  const allTotal = totalExpenditure.reduce((a, b) => a + b, 0);

  const incomeList = JSON.parse(localStorage.getItem("Income")) || [];
  const totalIncome = userIncome.reduce((a, b) => {
    return a + b.amount;
  }, 0);

  function handleShowAddTransactionForm() {
    addTransactionForm.current.classList.add("block");
    addTransactionForm.current.classList.remove("hidden");
  }

  return (
    <div className=" max-w-dvw">
      <Header
        User={User}
        totalIncome={totalIncome}
        Transactions={Transactions}
        setTransactions={setTransactions}
      />
      {/*==================== //Main section //======================= */}
      <main className="flex flex-col">
        {/*==================== //sidebar section // ======================= */}
        <div className=" h-[10%] ">
          <button
            onClick={handleShowAddTransactionForm}
            className="md:hidden relative w-fit bg-gray-200 m-2 rounded-sm  px-5 py-1"
          >
            Add Expense
            <MdAddCircleOutline className="absolute top-1 right-1" />
          </button>
          <button
            onClick={handleShowAddIncome}
            className="md:hidden relative w-fit bg-gray-200 m-2 rounded-sm  px-5 py-1"
          >
            Add Income
            <MdAddCircleOutline className="absolute top-1 right-1" />
          </button>
        </div>
        {/*==================== //Main side section //=======================*/}
        <div className="relative grow gap-20 md:gap-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          <div
            ref={addTransactionForm}
            className="hidden md:flex justify-center items-center"
          >
            <AddExpenses
              addTransactionForm={addTransactionForm}
              setTransactions={setTransactions}
            />
          </div>

          <AddIncome
            totalIncome={totalIncome}
            User={User}
            addIncome={addIncome}
            allTotal={allTotal}
            setUserIncome={setUserIncome}
            userIncome={userIncome}
          />
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
