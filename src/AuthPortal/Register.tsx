import AuthPageWrapper from "./common/AuthPageWrapper";
import EmailField from "./common/EmailField";
import { useState, useEffect } from "react";
import PasswordField, { PasswordFieldPlain } from "./common/PasswordField";
import { Button, Link as LinkMUI } from "@mui/material";
import { useHref } from "react-router-dom";
import { useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { clearPassword } from "../utils/userSlice";
import { useEmailErrors, usePasswordErrors } from "./../utils/hooks";
import Joi from "joi";
import { EmailErrors, PasswordErrors } from "./Login";

const emailFormSchema = Joi.string().email({
    tlds: { allow: false },
});

const passwordFormSchema = Joi.string()
    // .pattern(new RegExp(".{8,}"), "short")
    .pattern(new RegExp("^.{8,19}$"), "length")
    .pattern(new RegExp("[0-9]"), "number")
    .pattern(new RegExp("[a-z]"), "lowercase")
    .pattern(new RegExp("[A-Z]"), "uppercase")
    .pattern(new RegExp("[^a-zA-Z0-9s\n]"), "special");

const checkEmailErrors = (email: string, errors: EmailErrors): EmailErrors => {
    let intErrors = { ...errors };
    Object.keys(intErrors).forEach(
        (k) => (intErrors[k as keyof EmailErrors] = false)
    );
    const validationRes = emailFormSchema.validate(email);
    if (typeof validationRes.error === "undefined") {
        return intErrors;
    } else {
        intErrors.invalidEmailForm = true;
        return intErrors;
    }
};

const validateEmail = (errors: EmailErrors): boolean => {
    for (const err in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, err)) {
            if (errors[err as keyof EmailErrors]) return false;
        }
    }
    return true;
};

const checkPasswordErrors = (
    password: string,
    errors: PasswordErrors
): PasswordErrors => {
    let intErrors = { ...errors };
    Object.keys(intErrors).forEach(
        (k) => (intErrors[k as keyof PasswordErrors] = false)
    );
    const validationRes = passwordFormSchema.validate(password, {
        abortEarly: false,
    });
    // return validationRes;
    if (typeof validationRes.error === "undefined") {
        return intErrors;
    } else if (validationRes.error.details[0].type === "string.empty") {
        intErrors.noLength = true;
    } else {
        validationRes.error.details.forEach((d) => {
            if ((d.context?.name as string) === "length") {
                intErrors.noLength = true;
            }
            if ((d.context?.name as string) === "number") {
                intErrors.noNumber = true;
            }
            if ((d.context?.name as string) === "lowercase") {
                intErrors.noLowercase = true;
            }
            if ((d.context?.name as string) === "uppercase") {
                intErrors.noUppercase = true;
            }
            if ((d.context?.name as string) === "special") {
                intErrors.noSymbol = true;
            }
        });
    }
    return intErrors;
};

const validatePassword = (errors: PasswordErrors): boolean => {
    for (const err in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, err)) {
            if (errors[err as keyof PasswordErrors]) return false;
        }
    }
    return true;
};

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
        if (!validateEmail(emailErrors)) {
            console.log("yes ve meil");
            return;
        }

        const passwordCheckedErrors = checkPasswordErrors(
            storePasswordValue,
            passwordErrors
        );
        setPasswordErrors(passwordCheckedErrors);
        if (validatePassword(passwordErrors)) {
            console.log("yes ve parola");
            return;
        }

        if (repeatPass !== storePasswordValue) {
            setNoPassMatch(true);
            return;
        }

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
                            controlledShowPass={controlledShowPassword}
                            handleControlledShowPass={
                                handleControlledShowPassword
                            }
                        />
                        <PasswordFieldPlain
                            onRepeatPassInput={handleRepeatPassInput}
                            noPassMatch={noPassMatch}
                            onEnter={handleRegister}
                            controlledShowPass={controlledShowPassword}
                            handleControlledShowPass={
                                handleControlledShowPassword
                            }
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
