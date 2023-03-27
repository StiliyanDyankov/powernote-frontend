import AuthPageWrapper from "./common/AuthPageWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { useDispatch } from "react-redux";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import RegisterSection from "./RegisterSection";
import VerificationSection from "./VerificationSection";
import { goNextStep, goPrevStep, resetSteps } from "../utils/registerSlice";
import { useEffect } from "react";
import { CheckCircle } from "@mui/icons-material";

const steps = ["Register", "Verify yourself"];

const RegisterPage = () => {
    const dispatch = useDispatch();
    // const storeRegisterStep = useSelector(
    //     (state: RootState) => state.register.currentStep
    // );
    const storeRegisterStep = 2;

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
                <Stepper activeStep={storeRegisterStep} alternativeLabel>
                    <Step key={steps[0]}>
                        <StepLabel className="font-semibold">
                            {steps[0]}
                        </StepLabel>
                    </Step>
                    <Step key={steps[1]}>
                        <StepLabel className="font-semibold">
                            {steps[1]}
                        </StepLabel>
                    </Step>
                </Stepper>
                {storeRegisterStep === 0 ? (
                    <RegisterSection onRegister={handleNext} />
                ) : (
                    ""
                )}
                {storeRegisterStep === 1 ? (
                    <VerificationSection
                        onNext={handleNext}
                        onBack={handlePrev}
                    />
                ) : (
                    ""
                )}
                {storeRegisterStep === 2 ? <SuccessSection /> : ""}
            </div>
        </AuthPageWrapper>
    );
};

export default RegisterPage;

const SuccessSection = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const wait = async () => {
            await new Promise((r) => setTimeout(r, 3000));
            console.log("work");
            dispatch(resetSteps());
        };
        wait();
    }, []);

    return (
        <div className="content-box">
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
                    You've successfully registered! <br /> Enjoy your stay!
                </p>
                <p className="form-text text-lg mt-3">
                    You'll be redirected to the app shortly.
                </p>
            </div>
        </div>
    );
};
