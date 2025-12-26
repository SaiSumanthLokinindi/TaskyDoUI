import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    myDay: [],
};

export const TaskSlice = createSlice({
    name: 'Task',
    initialState,
    reducers: {
        setMyDayTasks: (state, action) => {
            state.myDay = action.payload;
        },
    },
});

export const TaskActions = TaskSlice.actions;

export default TaskSlice.reducer;
