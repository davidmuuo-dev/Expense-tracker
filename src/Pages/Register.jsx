import Body from "../Components/Body";
import Input from "../Components/Input";
import PasswordInput from "../Components/PasswordInput";
import ButtonPrimary from "../Components/ButtonPrimary";
import ButtonSecondary from "../Components/ButtonSecondary";
import { useState, useRef } from "react";
import { Link } from "react-router";
export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordMismatch = useRef(null);

    {
        /*===================
        User object class
        ===================*/
    }
    class User {
        constructor(name, email, password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }
    }

    {
        /*===================
        Submiting functions
        ===================*/
    }
    function submitInputs() {
        if (
            password === confirmPassword &&
            name !== "" &&
            email !== "" &&
            password !== ""
        ) {
            const userDetails = new User(name, email, password);
            localStorage.setItem("User", JSON.stringify(userDetails));
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            window.location = "/dashboard";
        } else {
            if (passwordMismatch) {
                passwordMismatch.current.classList.remove("hidden");
            }
        }
    }

    return (
        <Body>
            <div className="w-full h-full flex justify-center items-center">
                <div className="flex max-w-160 flex-col items-center w-[90%]  gap-4  ">
                    {/*
        Headings 
        ===================*/}
                    <p className="font-medium text-center w-full text-lg">
                        Register to continue
                    </p>
                    <p
                        ref={passwordMismatch}
                        className="font-medium text-center w-full text-sm hidden text-red-500"
                    >
                        Password does not match
                    </p>
                    <Input
                        value={name}
                        setValue={setName}
                        type="text"
                        placeholder="Full Name..."
                    />
                    <Input
                        value={email}
                        setValue={setEmail}
                        type="email"
                        placeholder="Email.."
                    />
                    <PasswordInput
                        value={password}
                        setValue={setPassword}
                        placeholder="Password.."
                    />
                    <PasswordInput
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        placeholder="Confirm Password.."
                    />

                    {/*
        Buttons 
        ===================*/}

                    <div className="w-full flex justify-between p-2 ">
                        <ButtonSecondary className="w-[40%]">
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
                        Have an account?{" "}
                        <Link className="text-indigo-500 underline" to="/login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            ;
        </Body>
    );
}
