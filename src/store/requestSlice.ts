import { createSlice } from "@reduxjs/toolkit";
import * as types from "@/app/types"
import { TRequest } from "@/app/types";
import { initialRequests } from "../mock/data";

type RequestsState = {
    requests: TRequest[];
    isLoading: boolean;
}

const initialState: RequestsState = {
    requests: initialRequests,
    isLoading: false,
}

const requestsSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
        addRequest: (state, action) => {
            state.requests.push(action.payload);
        }
    }
});

export default requestsSlice.reducer;
export const { addRequest } = requestsSlice.actions;
