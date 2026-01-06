import { createSlice } from '@reduxjs/toolkit';
import { fetchTasksThunk, tasksInitialState } from './utils';

export const fetchUpcomingTasks = fetchTasksThunk('upcoming/fetch', 'upcoming');

const upcomingTasksSlice = createSlice({
    name: 'upcomingTasks',
    initialState: tasksInitialState,
    reducers: {
        clearUpcomingTasks(state) {
            state.tasks = [];
            state.error = undefined;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUpcomingTasks.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });

        builder.addCase(fetchUpcomingTasks.fulfilled, (state, action) => {
            console.log('Fetched Upcoming tasks:', action.payload);
            state.tasks = action.payload;
            state.loading = false;
        });

        builder.addCase(fetchUpcomingTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearUpcomingTasks } = upcomingTasksSlice.actions;
export default upcomingTasksSlice.reducer;
