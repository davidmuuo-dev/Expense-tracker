import { useState } from "react";

export default function AddIncome({
  userIncome,
  setUserIncome,
  totalIncome,
  addIncome,
  User,
  allTotal,
}) {
  const [income, setIncome] = useState("");

 
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

        <div
          ref={addIncome}
          className="bg-gray-300 w-full mt-3 rounded-lg md:block hidden"
        >
          <p>Add Income</p>
          <div className="bg-gray-100 rounded-lg p-2 gap-5 flex flex-col items-center ">
            <input
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              type="number"
              placeholder="Add new Income"
              className="outline-0 w-full py-2 px-1.5 border border-gray-600 rounded-lg"
            />
            <div className="w-full flex justify-between">
              <button
                onClick={handleCloseAddIncome}
                className="outline-2 text-gray-950 outline-sky-500 w-[30%] py-2 rounded-lg  "
              >
                Clear
              </button>
              <button
                onClick={handleIncome}
                className="bg-sky-500 w-[30%] py-2 rounded-lg  "
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
