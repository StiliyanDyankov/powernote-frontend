import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../utils/store";
import { inputPassword } from "../../utils/userSlice";

const PasswordField = () => {
    const dispatch = useDispatch();
    const storePasswordValue = useSelector(
        (state: RootState) => state.user.password
    );

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormControl variant="outlined" size="small" color="secondary">
            <InputLabel htmlFor="password" color="secondary">Password</InputLabel>
            <OutlinedInput
                id="password"
                autoComplete="test"
                type={showPassword ? "text" : "password"}
                label="Password"
                color="secondary"
                value={storePasswordValue}
                onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                ) => {
                    dispatch(inputPassword(e.target.value));
                }}

                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
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
        </FormControl>
    );
};

export default PasswordField;
