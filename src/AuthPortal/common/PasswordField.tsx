import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../utils/store";
import { inputPassword } from "../../utils/userSlice";
import { PasswordErrors } from "../Login";

const PasswordField = ({
    errors: { noLength, noNumber, noPasswordServer, noSymbol, noUppercase },
}: {
    errors: PasswordErrors;
}) => {
    const dispatch = useDispatch();
    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl
            variant="outlined"
            size="small"
            color="secondary"
            error={
                noLength ||
                noNumber ||
                noPasswordServer ||
                noSymbol ||
                noUppercase
            }
        >
            <InputLabel htmlFor="password" color="secondary">
                Password
            </InputLabel>
            <OutlinedInput
                id="password"
                autoComplete="test"
                type={showPassword ? "text" : "password"}
                label="Password"
                color="secondary"
                value={storePasswordValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(inputPassword(e.target.value));
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                            edge="end"
                        >
                            {showPassword ? (
                                <VisibilityOffOutlined />
                            ) : (
                                <VisibilityOutlined />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>
                {noPasswordServer ? <div>- Incorrect password</div> : ""}
                {noLength ? (
                    <div> - Password should be at least 8 characters</div>
                ) : (
                    ""
                )}
                {noNumber ? (
                    <div> - Password should contain at least one number</div>
                ) : (
                    ""
                )}
                {noUppercase ? (
                    <div>
                        - Password should contain at least one uppercase letter
                    </div>
                ) : (
                    ""
                )}
                {noSymbol ? (
                    <div>
                        - Password should contain at least one symbol - ().@#
                        etc
                    </div>
                ) : (
                    ""
                )}
            </FormHelperText>
        </FormControl>
    );
};

export default PasswordField;

export const PasswordFieldPlain = ({
    onRepeatPassInput,
    noPassMatch,
}: {
    onRepeatPassInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    noPassMatch: boolean;
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl variant="outlined" size="small" color="secondary" error={noPassMatch}>
            <InputLabel htmlFor="password" color="secondary">
                Repeat Password
            </InputLabel>
            <OutlinedInput
                id="password"
                autoComplete="test"
                type={showPassword ? "text" : "password"}
                label="Repeat Password"
                color="secondary"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onRepeatPassInput(e);
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                            edge="end"
                        >
                            {showPassword ? (
                                <VisibilityOffOutlined />
                            ) : (
                                <VisibilityOutlined />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>
                {noPassMatch ? <div>- Passwords don't match</div> : ""}
            </FormHelperText>
        </FormControl>
    );
};
