import { createSlice } from "@reduxjs/toolkit";
import * as types from "@/app/types"
import { Request as AppRequest } from "@/app/types";
import { initialRequests } from "../mock/data";

type RequestsState = {
    requests: AppRequest[];
    isLoading: boolean;
}

const initialState: RequestsState = {
    requests: initialRequests,
    isLoading: false,
}

const requestsSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {}
});

export default requestsSlice.reducer;