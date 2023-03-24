import { useDispatch, useSelector } from "react-redux";
import PinInput from "./common/PinInput";
import { useEffect, useState } from "react";
import { Button, Link as LinkMUI } from "@mui/material";
import { setPin as setPinStore, resetSteps } from "../utils/registerSlice";

const VerificationSection = ({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) => {
    const dispatch = useDispatch();

    const [pin, setPin] = useState<string>("");
    const [pinError, setPinError] = useState<boolean>(false);

    const handlePinStoring = (values: string[]) => {
        const pin = values.filter((val) => val !== "");
        if (pin.length > 0) {
            const strPin = pin.reduce((acc, curr) => acc + curr);
            setPin(strPin);
        } else return;
    };

    const handleVerify = async () => {
        if (pin.length === 5) {
            dispatch(setPinStore(pin))
            
            onNext();
            await new Promise((r) => setTimeout(r, 3000));
            dispatch(resetSteps());
        } else setPinError(true);
    };

    const handleEnter = () => {
        handleVerify();
    };

    const handleResend = () => {
        // do some fetching
    };

    useEffect(() => {
        if (pinError) {
            setPinError(false);
        }
    }, [pin]);

    return (
        /* content-box */
        <div className="content-box">
            {/* content-wrap */}
            <div className="content-wrap">
                <h1 className="form-header">Verify yourself</h1>
                {/* form-wrap */}
                <form className="flex flex-col items-stretch gap-4 ">
                    <div className="dark:text-d-700-text">
                        We've sent you a verification code on your email. Enter
                        the code bellow:
                    </div>
                    <PinInput
                        onPinStoring={handlePinStoring}
                        error={pinError}
                        onEnter={handleEnter}
                    />
                    <div className="flex flex-row content-center justify-start gap-3">
                        <div className="form-text">Didn't recieve a code?</div>
                        <LinkMUI
                            className="font-medium w-min whitespace-nowrap dark:font-semibold dark:text-d-700-text"
                            color="secondary"
                            underline="hover"
                            type="submit"
                            href="#"
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLAnchorElement,
                                    MouseEvent
                                >
                            ) => {
                                e.preventDefault();
                                handleResend();
                            }}
                        >
                            Resend code
                        </LinkMUI>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="w-1/4">
                            <Button
                                variant="outlined"
                                disableElevation
                                size="large"
                                fullWidth
                                color="secondary"
                                onClick={(
                                    e: React.MouseEvent<
                                        HTMLButtonElement,
                                        MouseEvent
                                    >
                                ) => {
                                    e.preventDefault();
                                    onBack();
                                    console.log("runs")
                                }}
                            >
                                <span className="flex-grow font-bold text-center text-gray-50">
                                    Back
                                </span>
                            </Button>
                        </div>
                        <Button
                            className="flex-1"
                            variant="contained"
                            type="submit"
                            disableElevation
                            size="large"
                            fullWidth
                            color="secondary"
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLButtonElement,
                                    MouseEvent
                                >
                            ) => {
                                e.preventDefault();
                                handleVerify();
                            }}
                        >
                            <span className="flex-grow font-bold text-center text-gray-50">
                                Verify
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerificationSection;
