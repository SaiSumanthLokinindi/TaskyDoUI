import { configureStore } from '@reduxjs/toolkit';
import TaskSlice from './Task/TaskSlice';

const store = configureStore({
    reducer: {
        task: TaskSlice.reducer,
    },
});

export default store;
