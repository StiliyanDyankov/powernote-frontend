import { useState } from "react";
import { EmailErrors, PasswordErrors } from "../AuthPortal/Login";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useEmailErrors = (): [
    emailErrors: EmailErrors,
    setEmailErrors: React.Dispatch<React.SetStateAction<EmailErrors>>
] => {
    const [emailErrors, setEmailErrors] = useState<EmailErrors>({
        noEmailServer: false,
        invalidEmailForm: false,
    });

    const storeEmailValue = useSelector((state: RootState) => state.user.email);

    useEffect(() => {
        let intErrors = { ...emailErrors };
        Object.keys(intErrors).forEach(
            (k) => (intErrors[k as keyof EmailErrors] = false)
        );
        setEmailErrors(intErrors);
    }, [storeEmailValue]);

    return [emailErrors, setEmailErrors];
};

export const usePasswordErrors = (
    setNoPassMatch:
        | React.Dispatch<React.SetStateAction<boolean>>
        | Function = () => {}
): [
    passwordErrors: PasswordErrors,
    setPasswordErrors: React.Dispatch<React.SetStateAction<PasswordErrors>>
] => {
    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
        noPasswordServer: false,
        noLength: false,
        noNumber: false,
        noSymbol: false,
        noUppercase: false,
    });

    // clear password and repeatPassword errors on input in password
    useEffect(() => {
        let intErrors = { ...passwordErrors };
        Object.keys(intErrors).forEach(
            (k) => (intErrors[k as keyof PasswordErrors] = false)
        );
        setPasswordErrors(intErrors);
        setNoPassMatch(false);
    }, [storePasswordValue]);

    return [passwordErrors, setPasswordErrors];
};
