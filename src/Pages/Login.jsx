import { useState, useRef } from "react";
import { Link } from "react-router";
import Body from "../Components/Body";
import Input from "../Components/Input";
import PasswordInput from "../Components/PasswordInput";
import ButtonPrimary from "../Components/ButtonPrimary";
import ButtonSecondary from "../Components/ButtonSecondary";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const passwordMismatch = useRef(null);

    {
        /*===================
        Submiting functions
        ===================*/
    }
    function submitInputs() {
        const User = JSON.parse(localStorage.getItem("User"));

        if (
            User.password === password &&
            password !== "" &&
            email !== "" &&
            User.email === email
        ) {
            passwordMismatch.current.classList.add("hidden");
            setEmail("");
            setPassword("");
            window.location = "/dashboard";
        } else {
            passwordMismatch.current.classList.remove("hidden");
        }
    }

    {
        /*=======================
        Clearing inputs function
        ========================*/
    }

    function clearInputs() {
        setEmail("");
        setPassword("");
    }

    return (
        <Body>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-[90%] max-w-160 flex flex-col gap-5 items-center ">
                    <p className="font-medium text-center w-full text-lg">
                        Login to continue
                    </p>
                    <p
                        ref={passwordMismatch}
                        className="font-medium text-center w-full text-sm hidden text-red-500"
                    >
                        Credential don't match
                    </p>
                    {/*
        Inputs 
        ===================*/}
                    <Input
                        type="text"
                        placeholder="Email..."
                        setValue={setEmail}
                        value={email}
                    />
                    <PasswordInput
                        placeholder="Password..."
                        value={password}
                        setValue={setPassword}
                    />

                    {/*
        Buttons 
        ===================*/}
                    <div className="w-full flex justify-between">
                        <ButtonSecondary
                            onClick={clearInputs}
                            className="w-[40%]"
                        >
                            Cancel
                        </ButtonSecondary>
                        <ButtonPrimary
                            className="w-[40%]"
                            onClick={submitInputs}
                        >
                            Submit
                        </ButtonPrimary>
                    </div>

                    {/*
        Login optiom 
        ===================*/}

                    <div className="flex gap-3">
                        Dont have an account?{" "}
                        <Link
                            className="text-indigo-500 underline"
                            to="/register"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </Body>
    );
}
