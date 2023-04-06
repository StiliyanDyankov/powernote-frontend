import EmailField, {
    checkEmailErrors,
    validateEmail,
} from "./common/EmailField";
import { useState, useEffect, useRef } from "react";
import PasswordField, {
    checkPasswordErrors,
    PasswordFieldPlain,
    validatePassword,
} from "./common/PasswordField";
import { Button, Link as LinkMUI } from "@mui/material";
import { useHref } from "react-router-dom";
import { useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { clearPassword } from "../utils/storeSlices/userSlice";
import {
    useEmailErrors,
    usePasswordErrors,
    useTransitionRef,
} from "../utils/hooks";

const RegisterSection = ({ onRegister }: { onRegister: () => void }) => {
    const dispatch = useDispatch();

    const transitionRef = useTransitionRef();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);
    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const [repeatPass, setRepeatPass] = useState<string>("");

    const [noPassMatch, setNoPassMatch] = useState<boolean>(false);

    const [emailErrors, setEmailErrors] = useEmailErrors();

    const [passwordErrors, setPasswordErrors] =
        usePasswordErrors(setNoPassMatch);

    const [controlledShowPassword, setControlledShowPassword] =
        useState<boolean>(false);

    const loginURL = useHref("/login");
    const handleLoginLink = useLinkClickHandler("/login");

    const handleControlledShowPassword = () => {
        setControlledShowPassword(!controlledShowPassword);
    };

    const handleRepeatPassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(e.target.value);
    };

    const handleRegister = () => {
        const emailCheckedErrors = checkEmailErrors(
            storeEmailValue,
            emailErrors
        );

        setEmailErrors(emailCheckedErrors);
        if (!validateEmail(emailCheckedErrors)) {
            return;
        }

        const passwordCheckedErrors = checkPasswordErrors(
            storePasswordValue,
            passwordErrors
        );
        setPasswordErrors(passwordCheckedErrors);
        if (!validatePassword(passwordCheckedErrors)) {
            return;
        }

        if (repeatPass !== storePasswordValue) {
            setNoPassMatch(true);
            return;
        }

        onRegister();
        // do some fetching
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
        <div ref={transitionRef} className="content-box">
            {/* content-wrap */}
            <div className="content-wrap">
                <h1 className="form-header">Register</h1>
                {/* form-wrap */}
                <form className="flex flex-col items-stretch gap-4 ">
                    <EmailField errors={emailErrors} onEnter={handleRegister} />
                    <PasswordField
                        errors={passwordErrors}
                        onEnter={handleRegister}
                        controlledShowPass={controlledShowPassword}
                        handleControlledShowPass={handleControlledShowPassword}
                    />
                    <div className="form-text">Confirm password:</div>
                    <PasswordFieldPlain
                        onRepeatPassInput={handleRepeatPassInput}
                        noPassMatch={noPassMatch}
                        onEnter={handleRegister}
                        controlledShowPass={controlledShowPassword}
                        handleControlledShowPass={handleControlledShowPassword}
                    />
                    <Button
                        className="flex flex-row "
                        variant="contained"
                        disableElevation
                        size="large"
                        fullWidth
                        color="secondary"
                        onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
                        <span className="flex-grow font-bold text-center text-gray-50">
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
    );
};

export default RegisterSection;
