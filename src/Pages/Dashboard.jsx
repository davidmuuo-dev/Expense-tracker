import { useRef, useState } from "react";
import AddIncome from "../Components/AddIncome";
import AddExpenses from "../Components/AddExpenses";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
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

  //====================
  //EXPENSES CLASS OBJECT
  //=======================

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

  return (
    <div className="h-dvh w-dvw">
      <Header User={User} totalIncome={totalIncome} />
      {/*==================== //Main section //======================= */}
      <main className="flex flex-col">
        {/*==================== //sidebar section // ======================= */}
        <Sidebar
          addIncome={addIncome}
          addTransactionForm={addTransactionForm}
        />
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
