import React, { useState } from "react";
import { useEffect } from "react";
import { useHref, useLinkClickHandler, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PasswordField, { PasswordErrors } from "./common/PasswordField";
import AuthPageWrapper from "./common/AuthPageWrapper";
import { Alert, Button, CircularProgress, Link as LinkMUI } from "@mui/material";
import { RootState } from "../utils/store";
import { clearPassword } from "../utils/storeSlices/userSlice";
import EmailField, { EmailErrors } from "./common/EmailField";
import {
    useEmailErrors,
    usePasswordErrors,
    useTransitionRef,
} from "./../utils/hooks";
import { usePostLoginMutation } from "../utils/apiService";
import { ResCredentialError, ResCredentialSuccess } from "./RegisterSection";
import { setToken } from "../utils/storeSlices/tokenSlice";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const [postLogin, { data, error, isLoading }] = usePostLoginMutation();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);
    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const navigate = useNavigate();

    const ref = useTransitionRef();

    const forgotURL = useHref("/forgottenPassword");
    const handleForgotLink = useLinkClickHandler("/forgottenPassword");

    const registerURL = useHref("/register");
    const handleRegisterLink = useLinkClickHandler("/register");

    const appURL = useHref("/app");

    const [serverError, setServerError] = useState<boolean>(false);

    const [emailErrors, setEmailErrors] = useEmailErrors();

    const [passwordErrors, setPasswordErrors] = usePasswordErrors();

    // const [waitServerRes, setWaitServerRes] = useState<boolean>(false);

    const handleLogin = async () => {
        // setWaitServerRes(true);

        const res = await postLogin({
            email: storeEmailValue,
            password: storePasswordValue,
        });

        console.log(res);

        if ((res as ResCredentialError).error) {
            if ((res as ResCredentialError).error.status === 500) {
                setServerError(true);
                return;
            }
            if (
                (
                    (res as ResCredentialError).error.data.errors as EmailErrors
                ).hasOwnProperty("alreadyExists")
            ) {
                setEmailErrors(
                    (res as ResCredentialError).error.data.errors as EmailErrors
                );
                return;
            }
            if (
                (
                    (res as ResCredentialError).error.data
                        .errors as PasswordErrors
                ).hasOwnProperty("noPasswordServer")
            ) {
                setPasswordErrors(
                    (res as ResCredentialError).error.data
                        .errors as PasswordErrors
                );
                return;
            }
            return;
        }

        if ((res as unknown as ResCredentialSuccess).data) {
            const token = (
                res as unknown as ResCredentialSuccess
            ).data.token.substring(7);
            dispatch(setToken(token));
        }

        // simulating fetching
        // await new Promise((r) => setTimeout(r, 3000));

        navigate("/app");
    };

    useEffect(() => {
        return () => {
            dispatch(clearPassword());
        };
    }, []);

    return (
        <AuthPageWrapper>
            {/* content-box */}
            <div ref={ref} className="content-box">
                {/* content-wrap */}
                <div className="content-wrap">
                    <h1 className="form-header">Login</h1>
                    {/* form-wrap */}
                    <form className="flex flex-col items-stretch gap-4 ">
                        {/* <form> */}
                        <EmailField
                            errors={emailErrors}
                            onEnter={handleLogin}
                        />
                        <PasswordField
                            errors={passwordErrors}
                            onEnter={handleLogin}
                        />
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
                            className="flex flex-row "
                            variant="contained"
                            type="submit"
                            disableElevation
                            disabled={isLoading}
                            size="large"
                            fullWidth
                            color="secondary"
                            href={appURL}
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLAnchorElement,
                                    MouseEvent
                                >
                            ) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                            endIcon={
                                isLoading ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={25}
                                    />
                                ) : null
                            }
                        >
                            <span className="font-bold text-gray-50 flex-grow text-center">
                                {isLoading ? "Loading..." : "Login"}
                            </span>
                        </Button>
                        {/* </form> */}
                        <div className="flex flex-row content-center justify-start gap-3">
                            <div className="form-text">Not a member?</div>
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
                        {serverError ? (
                            <Alert severity="error">
                                An unexpected error occured. —{" "}
                                <strong>Please try again later!</strong>
                            </Alert>
                        ) : null}
                    </form>
                </div>
            </div>
        </AuthPageWrapper>
    );
};

export default LoginPage;
