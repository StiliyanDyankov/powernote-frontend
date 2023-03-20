import React, { useState } from "react";
import { useEffect } from "react";
import { useHref, useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PasswordField from "./common/PasswordField";
import AuthPageWrapper from "./common/AuthPageWrapper";
import { Button, Link as LinkMUI } from "@mui/material";
import { RootState } from "../utils/store";
import { clearPassword } from "../utils/userSlice";
import EmailField from "./common/EmailField";

export interface EmailErrors {
    noEmailServer: boolean,
    invalidEmailForm: boolean,
}

export interface PasswordErrors {
    noPasswordServer: boolean,
    noLength: boolean,
    noUppercase: boolean,
    noNumber: boolean,
    noSymbol: boolean,
}

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);
    const storePasswordValue = useSelector((state: RootState) => state.user.password);

    const forgotURL = useHref("/forgottenPassword");
    const handleForgotLink = useLinkClickHandler("/forgottenPassword");

    const registerURL = useHref("/register");
    const handleRegisterLink = useLinkClickHandler("/register");

    const loginURL = useHref("/app");
    const handleLoginLink = useLinkClickHandler("/app");

    const [emailErrors, setEmailErrors] = useState<EmailErrors>({
        noEmailServer: false,
        invalidEmailForm: false,
    });

    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
        noPasswordServer: false,
        noLength: false,
        noNumber: false, 
        noSymbol: false,
        noUppercase: false,
    });

    const handleSubmit = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleLoginLink(e);
    };

    useEffect(() => {
        return () => {
            dispatch(clearPassword());
        };
    }, []);

    return (
        <AuthPageWrapper>
            {/* content-box */}
            <div className="p-5 border-2 rounded-lg shadow-md border-l-divider dark:border-d-500-divider dark:bg-d-200-cards w-96">
                {/* content-wrap */}
                <div className="flex flex-col items-stretch gap-4 ">
                    <h1 className="text-2xl font-medium text-center dark:text-d-700-text">
                        Login
                    </h1>
                    {/* form-wrap */}
                    <form className="flex flex-col items-stretch gap-4 ">
                        {/* <form> */}
                        <EmailField errors={emailErrors} />
                        <PasswordField errors={passwordErrors}/>
                        <LinkMUI
                            className="font-medium w-min whitespace-nowrap dark:font-semibold dark:text-d-700-text"
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
                            onClick={handleSubmit}
                        >
                            <span className="font-bold text-gray-50 ">
                                Login
                            </span>
                        </Button>
                        {/* </form> */}
                        <div className="flex flex-row content-center justify-start gap-3">
                            <div className="font-semibold dark:text-d-700-text">
                                Not a member?
                            </div>
                            <LinkMUI
                                className="font-medium w-min whitespace-nowrap dark:font-semibold dark:text-d-700-text"
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
                                Register
                            </LinkMUI>
                        </div>
                    </form>
                </div>
            </div>
        </AuthPageWrapper>
    );
};

export default LoginPage;
