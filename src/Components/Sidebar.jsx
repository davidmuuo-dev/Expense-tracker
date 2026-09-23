import { MdAddCircleOutline } from "react-icons/md";
export default function Sidebar({ addIncome, addTransactionForm }) {
    function handleShowAddTransactionForm() {
        addTransactionForm.current.classList.add("flex");
        addTransactionForm.current.classList.remove("hidden");
    }

    function handleShowAddIncome() {
        addIncome.current.classList.add("block");
        addIncome.current.classList.remove("hidden");
    }

    return (
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
    );
}
