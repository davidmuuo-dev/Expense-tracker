export default function IncomeInput({
    handleCloseAddIncome,
    addIncome,
    value,
    onChange,
    onClick
}) {
    return (
        <div
            ref={addIncome}
            className="bg-gray-300 w-full mt-3 rounded-lg md:block hidden"
        >
            <p>Add Income</p>
            <div className="bg-gray-100 rounded-lg p-2 gap-5 flex flex-col items-center ">
                <input
                    value={value}
                    onChange={onChange}
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
                        onClick={onClick}
                        className="bg-sky-500 w-[30%] py-2 rounded-lg  "
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
