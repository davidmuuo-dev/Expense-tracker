import bg from "./finance.jpg";
export default function Body({ children }) {
    return (
        <div
            className="w-dvw h-dvh flex flex-col bg-cover pb-4 bg-center text-white"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {children}
        </div>
    );
}
