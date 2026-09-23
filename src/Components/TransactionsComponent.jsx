export default function TransactionsComponent({
    setTransactions,
    Transactions,
    incomeList
}) {
    function deleteTransaction(id) {
        let newExpenses = Transactions.filter(entry => entry.id !== id);
        setTransactions(newExpenses);
        localStorage.setItem("Expenses", JSON.stringify(newExpenses));
    }

    return (
        <div className="w-[80%] max-w-150 m-auto flex flex-col mt-30 gap-1  ">
            <p className="font-medium text-lg font-sans">Your Transactions</p>
            <p className="font-medium text-sm font-sans">Expenses</p>

            {Transactions.map(entry => {
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
            <p className="font-medium text-sm font-sans">Incomes</p>
            <div>
                {incomeList.map(entry => {
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
    );
}
