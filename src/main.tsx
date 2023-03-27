import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import LoginPage from "./AuthPortal/Login";
import RegisterSection from "./AuthPortal/RegisterSection";
import ForgotPage from "./AuthPortal/Forgot";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { theme, lightTheme, darkTheme } from "./utils/themeMUI";

import { Provider as StoreProvider, useSelector } from "react-redux";
import { store, RootState } from "./utils/store";
import RegisterPage from "./AuthPortal/Register";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/forgottenPassword",
        element: <ForgotPage />,
    },
    {
        path: "/app",
        element: <App />,
    },
]);

const Root = () => {
    return (
        <StoreProvider store={store}>
            <Providers />
        </StoreProvider>
    );
};

const Providers = () => {
    const mode = useSelector((state: RootState) => state.theme.darkTheme);
    return (
        <ThemeProvider theme={mode ? darkTheme : lightTheme}>
            <div className={`overflow-hidden ${mode ? "dark" : ""}`}>
                <RouterProvider router={router} />
            </div>
        </ThemeProvider>
    );
};

export default Providers;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
