import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as types from "@/app/types"
import { TRequest, TRequestStatus } from "@/app/types";
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
        addRequest: (state, action: PayloadAction<TRequest>) => {
            state.requests.push(action.payload);
        },
        updateRequestStatus: (state, action: PayloadAction<{ id: string; status: TRequestStatus }>) => {
            const request = state.requests.find(r => r.id === action.payload.id);
            if (request) {
                request.status = action.payload.status;
                request.updatedAt = new Date().toISOString();
            }
        },
    }
});

export default requestsSlice.reducer;
export const { addRequest, updateRequestStatus } = requestsSlice.actions;
