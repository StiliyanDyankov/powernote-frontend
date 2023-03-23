import { configureStore } from "@reduxjs/toolkit";
import persistedThemeReducer from "./themeSlice";
import persistedUserReducer from "./userSlice";
import persistedRegisterReducer from "./registerSlice";
import thunk from "redux-thunk";
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";


export const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage,
};

export const store = configureStore({
    reducer: {
        theme: persistedThemeReducer,
        user: persistedUserReducer,
        register: persistedRegisterReducer,
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
