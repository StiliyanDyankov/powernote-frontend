import ModeSwitch from "./ModeSwitch";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import React from "react";

const AuthPageWrapper = ({ children }: { children: React.ReactNode }) => {
    const storeTheme = useSelector((state: RootState) => state.theme.darkTheme);

    return (
        // root
        <div className="flex items-center justify-center w-screen h-screen bg-gray-50 font-quicksand">
            {/* header */}
            <div className="absolute top-0 flex flex-row items-center justify-between w-screen px-8 py-2 bg-blue-100 ">
                <Link to="/">
                    <span className="text-4xl font-semibold text-gray-800">
                        KN
                    </span>
                </Link>
                {storeTheme ? "dark" : "light"}
                <ModeSwitch />
            </div>
            {children}
        </div>
    );
};

export default AuthPageWrapper;
