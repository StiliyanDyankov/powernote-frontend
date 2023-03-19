import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import LoginPage from "./AuthPortal/Login";
import RegisterPage from "./AuthPortal/Register";
import ForgotPage from "./AuthPortal/Forgot";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/themeMUI";

import { Provider as StoreProvider } from "react-redux";
import { store } from "./utils/store";

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </StoreProvider>
    </React.StrictMode>
);
