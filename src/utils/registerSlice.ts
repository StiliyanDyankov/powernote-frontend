import { createSlice } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

export interface RegisterSlice {
    currentStep: number;
}

export const persistConfig: PersistConfig<RegisterSlice> = {
    key: "register",
    storage,
};

const initialState: RegisterSlice = {
    currentStep: 0,
};

const registerSlice = createSlice({
    initialState,
    name: "register",
    reducers: {
        goNextStep: (state) => {
            state.currentStep = state.currentStep + 1;
        },
        goPrevStep: (state) => {
            state.currentStep = state.currentStep - 1;
        },
        resetSteps: (state) => {
            state.currentStep = 0;
        },
    },
});

const persistedReducer = persistReducer(persistConfig, registerSlice.reducer);
export default persistedReducer;

export const { goNextStep, goPrevStep, resetSteps } = registerSlice.actions;
