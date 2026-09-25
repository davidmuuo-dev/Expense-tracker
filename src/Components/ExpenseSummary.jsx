export default function ExpenseSummary({ Transactions }) {
    //====================================
    //CALCULATING TODAYS EXPENSE
    //=======================================

    const todayExpenses = Transactions.filter(transaction => {
        const expenseDate = new Date(transaction.date);
        const date =  Date.now
        const today = new Date(date);

        return expenseDate.toLocaleDateString() === today.toLocaleDateString();
    });

    const prices = [];
    todayExpenses.map(entry => {
        return prices.push(Number(entry.price));
    });
    const todayTotal = prices.reduce((a, b) => a + b, 0);

    //====================================
    //CALCULATING WEEKLY EXPENSE
    //=======================================

    let weekStart = new Date();
    let weekDay = weekStart.getDay();
    weekStart.setDate(weekStart.getDate() - weekDay);
    weekStart.setHours(0, 0, 0, 0);
    let weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    const weekTransactions = Transactions.filter(entry => {
        const expenseDate = new Date(entry.date);
        return expenseDate >= weekStart && expenseDate <= weekEnd;
    });
    const weekPrices = [];
    weekTransactions.forEach(entry => {
        weekPrices.push(Number(entry.price));
    });
    const weektotal = weekPrices.reduce((a, b) => a + b, 0);

    //====================================
    //CALCULATING MONTHLY EXPENSE
    //=======================================

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);

    const monthTransactions = Transactions.filter(entry => {
        const expenseDate = new Date(entry.date);

        return expenseDate >= monthStart && expenseDate < monthEnd;
    });

    const monthTotal = monthTransactions.reduce(
        (total, entry) => total + Number(entry.price),
        0
    );

    return (
        <div className="flex justify-center items-center">
            <div className="h-full p-2 mt-5 shadow-xl rounded-lg shadow-gray-300 flex flex-col w-[80%]  ">
                <p className="font-medium font-gray-950 mb-3">
                    Expenses Summary
                </p>
                <div className="  font-light flex flex-col gap-3">
                    <p className="text-sm text-gray-400">
                        Today: Kshs.
                        <strong className="text-red-400">
                            {todayTotal.toFixed(2)}
                        </strong>
                    </p>
                    <p className="text-sm text-gray-400">
                        Weekly: Kshs.{" "}
                        <strong className="text-red-400">
                            {weektotal.toFixed(2)}
                        </strong>{" "}
                    </p>
                    <p className="text-sm text-gray-400">
                        Monthly:{" "}
                        <strong className="text-red-400">
                            {monthTotal.toFixed(2)}
                        </strong>{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}
