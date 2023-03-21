import AuthPageWrapper from "./common/AuthPageWrapper";
import EmailField from "./common/EmailField";
import { useState, useEffect } from "react";
// import { EmailErrors, PasswordErrors } from "./Login";
import PasswordField, { PasswordFieldPlain } from "./common/PasswordField";
import { Button, Link as LinkMUI } from "@mui/material";
import { useHref } from "react-router-dom";
import { useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { clearPassword } from "../utils/userSlice";
import { useEmailErrors, usePasswordErrors } from "./../utils/hooks";
// import { PasswordErrors } from "./Login";

const RegisterPage = () => {
    const dispatch = useDispatch();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);
    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const [repeatPass, setRepeatPass] = useState<string>("");

    const [noPassMatch, setNoPassMatch] = useState<boolean>(false);

    const [emailErrors, setEmailErrors] = useEmailErrors();

    const [passwordErrors, setPasswordErrors] =
        usePasswordErrors(setNoPassMatch);

    const loginURL = useHref("/login");
    const handleLoginLink = useLinkClickHandler("/login");

    const handleRepeatPassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(e.target.value);
    };

    const handleRegister = () => {
        setEmailErrors({
            invalidEmailForm: true,
            noEmailServer: true,
        });
        setPasswordErrors({
            noLength: true,
            noNumber: true,
            noPasswordServer: true,
            noSymbol: true,
            noUppercase: true,
        });
        setNoPassMatch(true);
    };

    // clear repeat password error on input
    useEffect(() => {
        setNoPassMatch(false);
    }, [repeatPass]);

    useEffect(() => {
        return () => {
            dispatch(clearPassword());
        };
    }, []);

    return (
        <AuthPageWrapper>
            {/* content-box */}
            <div className="content-box">
                {/* content-wrap */}
                <div className="content-wrap">
                    <h1 className="form-header">Register</h1>
                    {/* form-wrap */}
                    <form className="flex flex-col items-stretch gap-4 ">
                        <EmailField
                            errors={emailErrors}
                            onEnter={handleRegister}
                        />
                        <PasswordField
                            errors={passwordErrors}
                            onEnter={handleRegister}
                        />
                        <PasswordFieldPlain
                            onRepeatPassInput={handleRepeatPassInput}
                            noPassMatch={noPassMatch}
                            onEnter={handleRegister}
                        />
                        <Button
                            className="flex flex-row "
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
                                handleRegister();
                            }}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <span className="font-bold text-gray-50 flex-grow text-center">
                                Register
                            </span>
                        </Button>
                        <div className="flex flex-row content-center justify-start gap-3">
                            <div className="form-text">
                                Already have an account?
                            </div>
                            <LinkMUI
                                className="font-medium w-min whitespace-nowrap dark:font-semibold dark:text-d-700-text"
                                color="secondary"
                                underline="hover"
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
                                Login
                            </LinkMUI>
                        </div>
                    </form>
                </div>
            </div>
        </AuthPageWrapper>
    );
};

export default RegisterPage;
