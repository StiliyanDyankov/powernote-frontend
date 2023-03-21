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
    onEnter,
    controlledShowPass = undefined,
    handleControlledShowPass = () => {},
}: {
    errors: PasswordErrors;
    onEnter: () => void;
    controlledShowPass?: boolean | undefined;
    handleControlledShowPass?: () => void;
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
                type={showPassword || controlledShowPass ? "text" : "password"}
                label="Password"
                color="secondary"
                value={storePasswordValue}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        onEnter();
                    } else return;
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(inputPassword(e.target.value));
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                                if (typeof controlledShowPass === "undefined")
                                    setShowPassword(!showPassword);
                                else handleControlledShowPass();
                            }}
                            edge="end"
                        >
                            {showPassword || controlledShowPass ? (
                                <VisibilityOffOutlined />
                            ) : (
                                <VisibilityOutlined />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>
                {noPasswordServer ? (
                    <span>
                        - Incorrect password <br />
                    </span>
                ) : (
                    ""
                )}
                {noLength ? (
                    <span>
                        - Password should be at least 8 characters <br />
                    </span>
                ) : (
                    ""
                )}
                {noNumber ? (
                    <span>
                        - Password should contain at least one number <br />
                    </span>
                ) : (
                    ""
                )}
                {noUppercase ? (
                    <span>
                        - Password should contain at least one uppercase letter
                        <br />
                    </span>
                ) : (
                    ""
                )}
                {noSymbol ? (
                    <span>
                        - Password should contain at least one symbol - ().@#
                        etc
                        <br />
                    </span>
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
    onEnter,
    controlledShowPass = undefined,
    handleControlledShowPass = () => {},
}: {
    onRepeatPassInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    noPassMatch: boolean;
    onEnter: () => void;
    controlledShowPass?: boolean | undefined;
    handleControlledShowPass?: () => void;
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl
            variant="outlined"
            size="small"
            color="secondary"
            error={noPassMatch}
        >
            <InputLabel htmlFor="password" color="secondary">
                Repeat Password
            </InputLabel>
            <OutlinedInput
                id="passwordPlain"
                autoComplete="test"
                type={showPassword || controlledShowPass ? "text" : "password"}
                label="Repeat Password"
                color="secondary"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        onEnter();
                    } else return;
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onRepeatPassInput(e);
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                                if (typeof controlledShowPass === "undefined")
                                    setShowPassword(!showPassword);
                                else handleControlledShowPass();
                            }}
                            edge="end"
                        >
                            {showPassword || controlledShowPass ? (
                                <VisibilityOffOutlined />
                            ) : (
                                <VisibilityOutlined />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>
                {noPassMatch ? (
                    <span>
                        - Passwords don't match<br></br>
                    </span>
                ) : (
                    ""
                )}
            </FormHelperText>
        </FormControl>
    );
};
