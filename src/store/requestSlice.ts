import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as types from "@/app/types"
import { TRequest, TRequestStatus } from "@/app/types";
import { initialRequests } from "../mock/data";

type RequestsState = {
    requests: TRequest[];
    isLoading: boolean;
}

const getInitialRequests = (): TRequest[] => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('requests');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Ошибка чтения localStorage:', e);
            }
        }
    }
    return initialRequests;
};

const initialState: RequestsState = {
    requests: [],
    isLoading: false,
}

const requestsSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
        loadRequestsFromStorage: (state) => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('requests');
                if (saved) {
                    try {
                        state.requests = JSON.parse(saved);
                    } catch (e) {
                        console.error('Ошибка чтения localStorage:', e);
                        state.requests = initialRequests;
                    }
                } else {
                    state.requests = initialRequests;
                }
            }
        },
        addRequest: (state, action: PayloadAction<TRequest>) => {
            state.requests.push(action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('requests', JSON.stringify(state.requests));
            }
        },
        updateRequestStatus: (state, action: PayloadAction<{ id: string; status: TRequestStatus }>) => {
            const request = state.requests.find(r => r.id === action.payload.id);
            if (request) {
                request.status = action.payload.status;
                request.updatedAt = new Date().toISOString();
                if (typeof window !== 'undefined') {
                    localStorage.setItem('requests', JSON.stringify(state.requests));
                }
            }
        },
    }
});

export default requestsSlice.reducer;
export const { addRequest, updateRequestStatus, loadRequestsFromStorage } = requestsSlice.actions;
