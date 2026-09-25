export default function TransactionsComponent({
  setTransactions,
  Transactions,
  incomeList,
}) {
  function deleteTransaction(id) {
    let newExpenses = Transactions.filter((entry) => entry.id !== id);
    setTransactions(newExpenses);
    localStorage.setItem("Expenses", JSON.stringify(newExpenses));
  }

  return (
    <div className=" mt-30 w-dwh p-2">
      <p className="font-bold text-lg w-full text-center mb-10 ">
        TRANSACTIONS
      </p>
      <div className="w-[80%]  m-auto flex flex-col md:flex-row md:w-full md:max-w-full md:justify-between gap-1  ">
        <div className="w-[90%] md:w-[45%] flex flex-col gap-2">
          <p className="font-medium text-sm font-sans"> Your Expenses</p>

          {Transactions.map((entry) => {
            const date = new Date(entry.date);
            return (
              <div
                onClick={() => deleteTransaction(entry.id)}
                key={entry.id}
                className=" flex bg-gray-100 p-2 rounded-lg justify-between items-center"
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
        </div>
        <div className="w-[90%] md:w-[45%] flex flex-col gap-2">
          <p className="font-medium text-sm font-sans">Incomes</p>
          <div>
            {incomeList.map((entry) => {
              let date = new Date(entry.date);
              return (
                <div
                  className="m-1 flex bg-gray-100 p-2 rounded-lg justify-between items-center"
                  key={entry.id}
                >
                  <p className="text-3xl text-green-500 font-black">
                    +{entry.amount}
                  </p>
                  <div className="text-sm">
                    <p>{date.toLocaleDateString()}</p>
                    <p>{date.toLocaleTimeString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
