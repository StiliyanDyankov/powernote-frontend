import AuthPageWrapper from "./common/AuthPageWrapper";
import EmailField from "./common/EmailField";
import { useState, useEffect } from "react";
import { EmailErrors, PasswordErrors } from "./Login";
import PasswordField, { PasswordFieldPlain } from "./common/PasswordField";
import { Button, Link as LinkMUI } from "@mui/material";
import { useHref } from "react-router-dom";
import { useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { clearPassword } from "../utils/userSlice";

const RegisterPage = () => {
    const dispatch = useDispatch();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);
    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const [repeatPass, setRepeatPass] = useState<string>("");

    const [noPassMatch, setNoPassMatch] = useState<boolean>(false);

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

    const loginURL = useHref("/login");
    const handleLoginLink = useLinkClickHandler("/login");

    const handleRepeatPassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(e.target.value);
    };

    const handleRegister = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        setEmailErrors({
            invalidEmailForm: true,
            noEmailServer: true,
        })
        e.preventDefault();
    };

    // clear email errors on input
    useEffect(() => {
        let intErrors = { ...emailErrors };
        Object.keys(intErrors).forEach(
            (k) => (intErrors[k as keyof EmailErrors] = false)
        );
        setEmailErrors(intErrors);
    }, [storeEmailValue]);

    // clear password errors on input
    useEffect(() => {
        console.log(1);
    }, [storePasswordValue]);

    // clear repeat password error on input
    useEffect(() => {
        console.log(1);
    }, [storePasswordValue, repeatPass]);

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
                        <EmailField errors={emailErrors} />
                        <PasswordField errors={passwordErrors} />
                        <PasswordFieldPlain
                            onRepeatPassInput={handleRepeatPassInput}
                            noPassMatch={noPassMatch}
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
                            onClick={handleRegister}
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
