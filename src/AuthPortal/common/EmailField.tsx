import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import TextField from "@mui/material/TextField";
import { inputEmail } from "../../utils/userSlice";
import { EmailErrors } from "./../Login";

const EmailField = ({
    errors: { noEmailServer, invalidEmailForm },
}: {
    errors: EmailErrors;
}) => {
    const dispatch = useDispatch();

    const storeEmailValue = useSelector((state: RootState) => state.user.email);

    const evalHelper = (noEmailServer: boolean, invalidEmailForm: boolean) => {
        if (noEmailServer) return "- No account with such email found";
        if (invalidEmailForm) return "- Invalid email";
        return "";
    };

    return (
        <React.Fragment>
            <TextField
                id="outlined-basic"
                autoComplete="test"
                autoFocus={true}
                label="Email"
                variant="outlined"
                size="small"
                color="secondary"
                value={storeEmailValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(inputEmail(e.target.value));
                }}
                error={noEmailServer || invalidEmailForm}
                helperText={evalHelper(noEmailServer, invalidEmailForm)}
            />
        </React.Fragment>
    );
};

export default EmailField;