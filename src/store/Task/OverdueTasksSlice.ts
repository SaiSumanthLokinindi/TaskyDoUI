import { createSlice } from '@reduxjs/toolkit';
import { fetchTasksThunk, tasksInitialState } from './utils';

export const fetchOverdueTasks = fetchTasksThunk('overdue/fetch', 'overdue');

const overdueTasksSlice = createSlice({
    name: 'overdueTasks',
    initialState: tasksInitialState,
    reducers: {
        clearOverdueTasks(state) {
            state.tasks = [];
            state.error = undefined;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOverdueTasks.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchOverdueTasks.fulfilled, (state, action) => {
            console.log('Fetched Overdue tasks:', action.payload);
            state.tasks = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchOverdueTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearOverdueTasks } = overdueTasksSlice.actions;
export default overdueTasksSlice.reducer;
