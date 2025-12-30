import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from './Task.types';
import axios from 'src/axios-instance/axios-instance';

type MyDayState = {
    tasks: Task[];
    loading: boolean;
    error?: string;
};

const initialState: MyDayState = {
    tasks: [],
    loading: false,
    error: undefined,
};

export const fetchMyDay = createAsyncThunk(
    'myDay/fetch',
    async (_, thunkApi) => {
        try {
            const res = await axios.get<Task[]>('task/myday');
            if (res.status === 200) {
                return res.data;
            } else {
                throw new Error();
            }
        } catch (err) {
            return thunkApi.rejectWithValue(
                'Failed to fetch my day tasks info',
            );
        }
    },
);

const myDaySlice = createSlice({
    name: 'myDay',
    initialState,
    reducers: {
        clearMyDay(state) {
            state.tasks = [];
            state.error = undefined;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyDay.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });

        builder.addCase(fetchMyDay.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        });

        builder.addCase(fetchMyDay.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearMyDay } = myDaySlice.actions;
export default myDaySlice.reducer;
