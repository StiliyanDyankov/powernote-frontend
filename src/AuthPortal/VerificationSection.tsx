import { useDispatch } from "react-redux";
import PinInput from "./common/PinInput";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Link as LinkMUI } from "@mui/material";
import { setPin as setPinStore } from "../utils/storeSlices/registerSlice";
import { useTransitionRef } from "./../utils/hooks";

const VerificationSection = ({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) => {
    const dispatch = useDispatch();

    const ref = useTransitionRef();

    const [pin, setPin] = useState<string>("");
    const [pinError, setPinError] = useState<boolean>(false);

    const [waitServerRes, setWaitServerRes] = useState<boolean>(false);

    const handlePinStoring = (values: string[]) => {
        const pin = values.filter((val) => val !== "");
        if (pin.length > 0) {
            const strPin = pin.reduce((acc, curr) => acc + curr);
            setPin(strPin);
        } else return;
    };

    const handleVerify = async () => {
        if (pin.length === 5) {
            dispatch(setPinStore(pin));

            setWaitServerRes(true);

            await new Promise((r) => setTimeout(r, 3000));

            setWaitServerRes(false);

            onNext();
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
        <div ref={ref} className="content-box">
            {/* content-wrap */}
            <div className="content-wrap">
                <h1 className="form-header">Verify yourself</h1>
                {/* form-wrap */}
                <form className="flex flex-col items-stretch gap-4 ">
                    <div className="dark:text-d-700-text">
                        We've sent you a verification code on your email. To
                        proceed with the registration enter the code bellow:
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
                                    console.log("runs");
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
                            disabled={waitServerRes}
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
                            endIcon={
                                waitServerRes ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={25}
                                    />
                                ) : null
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <span className="font-bold text-gray-50 flex-grow text-center">
                                {waitServerRes ? "Loading..." : "Verify"}
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerificationSection;
