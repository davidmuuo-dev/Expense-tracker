import {  useRef,useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import DashboardInput from "./DashboardInput";
export default function AddExpenses({ addTransactionForm , setTransactions}){
    const warning = useRef(null);
     const [expenseName, setExpenseName] = useState("");
  const [expensePrice, setExpensePrice] = useState("");

     function handleCloseAddTransactionForm() {
    addTransactionForm.current.classList.remove("flex");
    addTransactionForm.current.classList.add("hidden");
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

    return ( <div className="h-full p-2 mt-5 shadow-xl rounded-lg shadow-gray-300 flex flex-col w-[80%] justify-center items-center  gap-3 ">
              <p>Add an expense</p>
              <p
                ref={warning}
                className="text-red-500 font-medium text-sm hidden"
              >
                You must enter something on both fields
              </p>
              <DashboardInput
                onChange={(e) => setExpenseName(e.target.value)}
                value={expenseName}
                placeholder="Enter  the transaction"
                type="text"
              />
              <DashboardInput
                value={expensePrice}
                onChange={(e) => setExpensePrice(e.target.value)}
                placeholder="Amount spend"
                type="number"
              />
              <div className="w-[80%] flex justify-between ">
                <ButtonSecondary
                  onClick={handleCloseAddTransactionForm}
                  className="bg-sky-300 w-[40%]  "
                >
                  Close
                </ButtonSecondary>
                <ButtonPrimary onClick={addExpense} className="w-[40%]">
                  Add
                </ButtonPrimary>
              </div>
            </div>)
}