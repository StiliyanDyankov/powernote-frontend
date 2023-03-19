import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

export interface UserState {
    email: string;
    password: string;
}

export const persistConfig: PersistConfig<UserState> = {
    key: "user",
    storage,
};


const initialState: UserState = {
    email: "",
    password: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        inputEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        inputPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
});

export const { inputEmail, inputPassword } = userSlice.actions;

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
export default persistedReducer;


// export default userSlice.reducer;
