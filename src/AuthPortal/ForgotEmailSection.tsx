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
import { Button, Link as LinkMUI, CircularProgress } from "@mui/material";
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

const ForgotEmailSection = ({ onSubmit }: { onSubmit: () => void }) => {
    const dispatch = useDispatch();

    const transitionRef = useTransitionRef();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);

    const [emailErrors, setEmailErrors] = useEmailErrors();

    const [waitServerRes, setWaitServerRes] = useState<boolean>(false);

    const handleEmailSubmit = async () => {
        setWaitServerRes(true);

        await new Promise((r) => setTimeout(r, 3000));

        onSubmit();
    };

    useEffect(() => {
        return () => {
            dispatch(clearPassword());
        };
    }, []);

    return (
        <div ref={transitionRef} className="content-box">
            {/* content-wrap */}
            <div className="content-wrap">
                <h1 className="form-header">Forgotten password</h1>
                {/* form-wrap */}
                <form className="flex flex-col items-stretch gap-4 ">
                    <div className="dark:text-d-700-text">
                        Forgot your password? No worries! <br /> Enter the email
                        you've registered with bellow:
                    </div>

                    <EmailField
                        errors={emailErrors}
                        onEnter={handleEmailSubmit}
                    />
                    <Button
                        className="flex flex-row "
                        variant="contained"
                        disableElevation
                        disabled={waitServerRes}
                        size="large"
                        fullWidth
                        color="secondary"
                        onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
                            handleEmailSubmit();
                            e.preventDefault();
                        }}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                        endIcon={
                            waitServerRes ? (
                                <CircularProgress color="secondary" size={25} />
                            ) : null
                        }
                    >
                        <span className="font-bold text-gray-50 flex-grow text-center">
                            {waitServerRes ? "Loading..." : "Send verification"}
                        </span>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotEmailSection;
