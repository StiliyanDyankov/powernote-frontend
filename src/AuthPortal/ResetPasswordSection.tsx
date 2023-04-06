import { useState, useEffect } from "react";
import PasswordField, {
    checkPasswordErrors,
    PasswordFieldPlain,
    validatePassword,
} from "./common/PasswordField";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { clearPassword } from "../utils/storeSlices/userSlice";
import { usePasswordErrors, useTransitionRef } from "../utils/hooks";


const ResetPasswordSection = ({ onSubmit }: { onSubmit: () => void }) => {
    const dispatch = useDispatch();

    const transitionRef = useTransitionRef();

    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const [repeatPass, setRepeatPass] = useState<string>("");

    const [noPassMatch, setNoPassMatch] = useState<boolean>(false);

    const [passwordErrors, setPasswordErrors] =
        usePasswordErrors(setNoPassMatch);

    const [controlledShowPassword, setControlledShowPassword] =
        useState<boolean>(false);

    const [waitServerRes, setWaitServerRes] = useState<boolean>(false);

    const handleControlledShowPassword = () => {
        setControlledShowPassword(!controlledShowPassword);
    };

    const handleRepeatPassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(e.target.value);
    };

    const handleSubmit = async () => {
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

        setWaitServerRes(true);

        await new Promise((r) => setTimeout(r, 3000));

        setWaitServerRes(false);

        onSubmit();
        // do some fetching
    };

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
                <h1 className="form-header">Reset password</h1>
                {/* form-wrap */}
                <form className="flex flex-col items-stretch gap-4 ">
                    <div className="form-text">Enter your new password:</div>
                    <PasswordField
                        errors={passwordErrors}
                        onEnter={handleSubmit}
                        controlledShowPass={controlledShowPassword}
                        handleControlledShowPass={handleControlledShowPassword}
                    />
                    <div className="form-text">Confirm new password:</div>
                    <PasswordFieldPlain
                        onRepeatPassInput={handleRepeatPassInput}
                        noPassMatch={noPassMatch}
                        onEnter={handleSubmit}
                        controlledShowPass={controlledShowPassword}
                        handleControlledShowPass={handleControlledShowPassword}
                    />
                    <Button
                        className="flex-1"
                        variant="contained"
                        type="submit"
                        disableElevation
                        disabled={waitServerRes}
                        size="large"
                        fullWidth
                        color="secondary"
                        onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        endIcon={
                            waitServerRes ? (
                                <CircularProgress color="secondary" size={25} />
                            ) : null
                        }
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <span className="font-bold text-gray-50 flex-grow text-center">
                            {waitServerRes ? "Loading..." : "Reset Password"}
                        </span>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordSection;
