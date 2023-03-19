import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { inputPassword } from "../../utils/userSlice";


const PasswordField = ({
    passwordValue,
    onPasswordChange,
}: {
    passwordValue: string,
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormControl variant="outlined" size="small" color="secondary">
            <InputLabel htmlFor="password" color="secondary">Password</InputLabel>
            <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                color="secondary"
                value={passwordValue}
                onChange={onPasswordChange}
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
