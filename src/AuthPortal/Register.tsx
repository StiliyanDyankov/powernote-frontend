import AuthPageWrapper from "./common/AuthPageWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { useDispatch } from "react-redux";
import { Step, StepLabel, Stepper } from "@mui/material";
import RegisterSection from "./RegisterSection";
import VerificationSection from "./VerificationSection";
import { goNextStep, goPrevStep, resetSteps } from "../utils/registerSlice";

const steps = ["Register", "Verify yourself"];

const RegisterPage = () => {
    const dispatch = useDispatch();
    const storeRegisterStep = useSelector(
        (state: RootState) => state.register.currentStep
    );
    // const storeRegisterStep = 1

    // dispatch(resetSteps());

    const handleNext = () => {
        dispatch(goNextStep());
    }
    
    const handlePrev = () => {
        dispatch(goPrevStep());
    }

    return (
        <AuthPageWrapper>
            {/* content-box */}
            <div className="flex flex-col min-w-0 gap-2">
                <Stepper activeStep={
                    storeRegisterStep
                } alternativeLabel>
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
                {storeRegisterStep === 0 ? <RegisterSection onRegister={handleNext}/> : ""}
                {storeRegisterStep === 1 ? <VerificationSection onNext={handleNext} onBack={handlePrev}/> : ""}
            </div>
        </AuthPageWrapper>
    );
};

export default RegisterPage;
