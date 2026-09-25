import IncomeInput from "./IncomeInput";
import { useRef, useState } from "react";

export default function AddIncome({ userIncome, setUserIncome,totalIncome, User, allTotal }) {
  const [income, setIncome] = useState("");

  const addIncome = useRef(null);
  function handleCloseAddIncome() {
    setIncome("");
    addIncome.current.classList.add("hidden");
    addIncome.current.classList.remove("block");
  }

  class Income {
    constructor(amount) {
      this.amount = amount;
      this.date = Date.now();
      this.id = crypto.randomUUID();
    }
  }

  function handleIncome() {
    if (income !== "") {
      const existingIncome = userIncome;

      const newIncome = [...existingIncome];
      let incomeEntry = new Income(Number(income));
      newIncome.push(incomeEntry);
      setUserIncome(newIncome);
      localStorage.setItem("Income", JSON.stringify(newIncome));
      setIncome("");
    }
  }

  return (
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
            <strong className="text-red-500">{allTotal.toFixed(2)}</strong>
          </p>
        </div>
        <IncomeInput
          handleCloseAddIncome={handleCloseAddIncome}
          onClick={handleIncome}
          addIncome={addIncome}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>
    </div>
  );
}
