import { useRef, useState } from "react";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { EmailErrors } from "../AuthPortal/common/EmailField";
import { PasswordErrors } from "../AuthPortal/common/PasswordField";
import gsap from "gsap";

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
        noLowercase: false,
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

export const useTransitionRef = () => {
    const ref = useRef(null);
    // const mounted = useRef(false);

    // const [mounted, setMounted] = useState<boolean>(false);

    // useEffect(() => {
    //     return () => {
    //         console.log(mounted);
    //         if (mounted) {
    //             const wait = async () => {
    //                 await new Promise((r) => setTimeout(r, 500));
    //             };
    //             wait();
    //             gsap.fromTo(
    //                 ref.current,
    //                 { opacity: 1, x: "0%" },
    //                 { opacity: 0, x: "-100%", duration: 0.5 }
    //             );
    //             setMounted(false);
    //         }
    //     };
    // }, []);

    useEffect(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 0, x: "100%" },
            { opacity: 1, x: "0%", duration: 0.5 }
        );
        // setMounted(true);
    }, []);
    // useEffect(() => {
    //     gsap.fromTo(ref.current, { opacity: 0, x:"100%" }, { opacity: 1, x:"0%", duration: 0.5 });
    //     // const timeout = setTimeout(() => {
    //     //   gsap.fromTo(ref.current, { opacity: 1, x:"0%" }, { opacity: 0, x:"-100%", duration: 0.5 });
    //     //   // Unmount component here
    //     // }, 500);
    //     // return () => clearTimeout(timeout);
    //   }, []);
    return ref;
};
