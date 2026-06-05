import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRequest, TRequestStatus } from '@/types';
import { INITIAL_REQUESTS_MOCK } from '@/constants/mock';

type RequestsState = {
    requests: TRequest[];
    isLoading: boolean;
};

const initialState: RequestsState = {
    requests: [],
    isLoading: false,
};

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        loadRequestsFromStorage: (state) => {
            state.isLoading = true;
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('requests');
                if (saved) {
                    try {
                        state.requests = JSON.parse(saved);
                    } catch (e) {
                        console.error('Ошибка чтения localStorage:', e);
                        state.requests = INITIAL_REQUESTS_MOCK;
                    }
                } else {
                    state.requests = INITIAL_REQUESTS_MOCK;
                }
            }
            state.isLoading = false;
        },
        addRequest: (state, action: PayloadAction<TRequest>) => {
            state.isLoading = true;
            state.requests.push(action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('requests', JSON.stringify(state.requests));
            }
            state.isLoading = false;
        },
        updateRequestStatus: (
            state,
            action: PayloadAction<{ id: string; status: TRequestStatus }>
        ) => {
            const request = state.requests.find((r) => r.id === action.payload.id);
            if (request) {
                state.isLoading = true;
                request.status = action.payload.status;
                request.updatedAt = new Date().toISOString();
                if (typeof window !== 'undefined') {
                    localStorage.setItem('requests', JSON.stringify(state.requests));
                }
                state.isLoading = false;
            }
        },
    },
});

export default requestsSlice.reducer;
export const { addRequest, updateRequestStatus, loadRequestsFromStorage } = requestsSlice.actions;
