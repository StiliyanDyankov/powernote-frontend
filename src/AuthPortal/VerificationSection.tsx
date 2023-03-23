import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { resetSteps } from "../utils/registerSlice";
import PinInput from "./common/PinInput";

const VerificationSection = ({
    onVerify,
    onBack,
}: {
    onVerify: () => void;
    onBack: () => void;
}) => {
    const dispatch = useDispatch();

    return (
        /* content-box */
        <div className="content-box">
            {/* content-wrap */}
            <div className="content-wrap">
                <h1 className="form-header">Verify yourself</h1>
                {/* form-wrap */}
                <form className="flex flex-col items-stretch gap-4 ">
                    <PinInput />
                    <div className="flex flex-row gap-2">
                        <div className="w-1/4">
                            <Button
                                variant="outlined"
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
                                    onBack();
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
                            onClick={async (
                                e: React.MouseEvent<
                                    HTMLButtonElement,
                                    MouseEvent
                                >
                            ) => {
                                e.preventDefault();
                                onVerify();

                                await new Promise((r) => setTimeout(r, 3000));
                                dispatch(resetSteps());
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
