import React from "react";
import TextField from "@mui/material/TextField";
import PasswordField from "./common/PasswordField";
// import { useState } from "react";
import { Link, useHref, useLinkClickHandler } from "react-router-dom";
import { Button, Link as LinkMUI } from "@mui/material";
import ModeSwitch from "./common/ModeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { inputEmail, inputPassword } from "../utils/userSlice";

const LoginPage = () => {
    const theme = useSelector((state: RootState) => state.theme.darkTheme);

    const storeEmailValue = useSelector((state: RootState)=>state.user.email);
    const storePasswordValue = useSelector((state: RootState)=>state.user.password);

    const dispatch = useDispatch();

    // const [emailValue, setEmailValue] = useState<string>("");
    // const [passwordValue, setPasswordValue] = useState<string>("");

    const forgotURL = useHref("/forgottenPassword");
    const handleForgotLink = useLinkClickHandler("/forgottenPassword");

    const registerURL = useHref("/register");
    const handleRegisterLink = useLinkClickHandler("/register");

    const loginURL = useHref("/app");
    const handleLoginLink = useLinkClickHandler("/app");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setPasswordValue(e.target.value);
        dispatch(inputPassword(e.target.value));
    };

    return (
        // root
        <div className="flex items-center justify-center w-screen h-screen bg-gray-50 font-quicksand">
            {/* header */}
            <div className="absolute top-0 flex flex-row items-center justify-between w-screen px-8 py-2 bg-blue-100 ">
                <Link to="/">
                    <span className="text-4xl font-semibold text-gray-800">
                        KN
                    </span>
                </Link>
                {theme?"dark":"light"}
                <ModeSwitch />
            </div>

            {/* content-box */}
            <div className="p-5 border-2 border-gray-400 rounded-lg w-96">
                {/* content-wrap */}
                <div className="flex flex-col items-stretch gap-4 ">
                    <h1 className="text-2xl font-medium text-center ">Login</h1>
                    {/* form-wrap */}
                    <div className="flex flex-col items-stretch gap-4 ">
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            size="small"
                            color="secondary"
                            value={storeEmailValue}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(inputEmail(e.target.value));
                            }}
                        />
                        <PasswordField
                            onPasswordChange={handlePasswordChange}
                            passwordValue={storePasswordValue}
                        />
                        <LinkMUI
                            className="w-min whitespace-nowrap"
                            color="secondary"
                            underline="hover"
                            href={forgotURL}
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLAnchorElement,
                                    MouseEvent
                                >
                            ) => {
                                e.preventDefault();
                                handleForgotLink(e);
                            }}
                        >
                            Forgotten password?
                        </LinkMUI>
                        <Button
                            variant="contained"
                            type="submit"
                            disableElevation
                            size="large"
                            fullWidth
                            color="secondary"
                            href={loginURL}
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLAnchorElement,
                                    MouseEvent
                                >
                            ) => {
                                e.preventDefault();
                                handleLoginLink(e);
                            }}
                        >
                            <span className="font-bold text-gray-50 ">
                                Login
                            </span>
                        </Button>
                        <div className="flex flex-row content-center justify-start gap-3">
                            <div className="font-semibold">Not a member?</div>
                            <LinkMUI
                                color="secondary"
                                underline="hover"
                                href={registerURL}
                                onClick={(
                                    e: React.MouseEvent<
                                        HTMLAnchorElement,
                                        MouseEvent
                                    >
                                ) => {
                                    e.preventDefault();
                                    handleRegisterLink(e);
                                }}
                            >
                                <span className="font-medium">Register</span>
                            </LinkMUI>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
