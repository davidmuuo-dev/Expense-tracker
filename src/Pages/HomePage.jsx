import { Link } from "react-router";
import { useState } from "react";
import Body from "../Components/Body";
import ButtonPrimary from "../Components/ButtonPrimary";
import ButtonSecondary from "../Components/ButtonSecondary";

export default function HomePage() {
    return (
        <Body>
            {/*Header*/}
            <div className="z-10 h-[4%] flex justify-between px-2 py-1  ">
                <p className="text-2xl font-bold ">LOGO</p>
                <div className="flex gap-3 ">
                    <Link to="/register">
                        <ButtonPrimary>Register</ButtonPrimary>
                    </Link>
                    <Link to="/login">
                        <ButtonSecondary>Login</ButtonSecondary>
                    </Link>
                </div>
            </div>

            {/*Main section*/}
            <div className="grow flex justify-center flex-col gap-5 ">
                <p className="text-xl font-medium font-sans max-w-[35ch] ">
                    Tired of loosing track of your finances? Worry no more. We
                    gotchu.
                </p>
                <div className="flex gap-5">
                    <ButtonPrimary>Contact Us</ButtonPrimary>
                    <Link to="/" className="text-xl font-medium">
                        View T&Cs
                    </Link>
                </div>
            </div>

            {/*Footer*/}
            <div className="h-[5%] w-full ">
                <Link to="/register" className="w-full flex justify-center">
                    <ButtonSecondary className="w-[90%] max-w-100 ">
                        Start for free
                    </ButtonSecondary>
                </Link>
            </div>
        </Body>
    );
}
