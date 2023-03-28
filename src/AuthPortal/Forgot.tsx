import React, { useEffect } from "react";
import AuthPageWrapper from "./common/AuthPageWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { useDispatch } from "react-redux";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import VerificationSection from "./VerificationSection";
import { goNextStep, goPrevStep, resetSteps } from "../utils/forgotSlice";
import { CheckCircle } from "@mui/icons-material";
import ForgotEmailSection from "./ForgotEmailSection";
import ResetPasswordSection from './ResetPasswordSection';

const steps = ["Enter email", "Verify yourself", "Reset password"];

const ForgotPage = () => {
    const dispatch = useDispatch();
    const storeForgotStep = useSelector(
        (state: RootState) => state.forgot.currentStep
    );
    // const storeRegisterStep = 2;

    // dispatch(resetSteps());

    const handleNext = () => {
        dispatch(goNextStep());
    };

    const handlePrev = () => {
        dispatch(goPrevStep());
    };

    return (
        <AuthPageWrapper>
            {/* content-box */}
            <div className="flex flex-col min-w-0 gap-2">
                <Stepper activeStep={storeForgotStep} alternativeLabel>
                    {steps.map((s) => (
                        <Step key={s}>
                            <StepLabel className="font-semibold">{s}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {storeForgotStep === 0 ? (
                    <ForgotEmailSection onSubmit={handleNext} />
                ) : (
                    ""
                )}
                {storeForgotStep === 1 ? (
                    <VerificationSection
                        onNext={handleNext}
                        onBack={handlePrev}
                    />
                ) : (
                    ""
                )}
                {storeForgotStep === 2 ? (
                    <ResetPasswordSection onSubmit={handleNext} />
                ) : (
                    ""
                )}
                {storeForgotStep === 3 ? <SuccessSection /> : ""}
            </div>
        </AuthPageWrapper>
    );
};

export default ForgotPage;

import { useTransitionRef } from "../utils/hooks";

const SuccessSection = () => {
    const dispatch = useDispatch();

    const ref = useTransitionRef();

    useEffect(() => {
        const wait = async () => {
            await new Promise((r) => setTimeout(r, 3000));
            dispatch(resetSteps());
        };
        wait();
    }, []);

    return (
        <React.Fragment>
            <div ref={ref} className="content-box">
                <div className="content-wrap">
                    <div className="form-header">
                        <Typography variant="body1" color="green">
                            <div className="flex flex-row items-center justify-center">
                                <CheckCircle />
                                <span className="pl-2 font-medium text-2xl">
                                    Success!
                                </span>
                            </div>
                        </Typography>
                    </div>
                    <p className="form-text text-lg text-left">
                        You've successfully reset your password!
                    </p>
                    <p className="form-text text-lg mt-3">
                        You'll be redirected to the app shortly.
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
};
