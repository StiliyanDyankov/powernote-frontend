import { useEffect } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import PasswordField from "./common/PasswordField";
import { useHref, useLinkClickHandler } from "react-router-dom";
import { Button, Link as LinkMUI } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { clearPassword, inputEmail } from "../utils/userSlice";
import AuthPageWrapper from "./common/AuthPageWrapper";

const LoginPage = () => {
    const dispatch = useDispatch();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);

    const forgotURL = useHref("/forgottenPassword");
    const handleForgotLink = useLinkClickHandler("/forgottenPassword");

    const registerURL = useHref("/register");
    const handleRegisterLink = useLinkClickHandler("/register");

    const loginURL = useHref("/app");
    const handleLoginLink = useLinkClickHandler("/app");

    useEffect(() => {
        return () => {
            dispatch(clearPassword());
        };
    }, []);

    return (
        <AuthPageWrapper>
            {/* content-box */}
            <div className="p-5 border-2 border-gray-400 rounded-lg w-96">
                {/* content-wrap */}
                <div className="flex flex-col items-stretch gap-4 ">
                    <h1 className="text-2xl font-medium text-center ">Login</h1>
                    {/* form-wrap */}
                    <form className="flex flex-col items-stretch gap-4 ">
                        {/* <form> */}
                            <TextField
                                id="outlined-basic"
                                autoComplete="test"
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
                            <PasswordField />
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
                        {/* </form> */}
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
                    </form>
                </div>
            </div>
        </AuthPageWrapper>
    );
};

export default LoginPage;
