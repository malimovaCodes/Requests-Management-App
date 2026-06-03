import requestReducer from "./requestSlice"
import { configureStore } from "@reduxjs/toolkit"

export const makeStore = () => {
    return configureStore({
        reducer: {
            requests: requestReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
