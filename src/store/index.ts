import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './User/UserSlice';
import TaskReducer from './Task/TaskSlice';

const store = configureStore({
    reducer: {
        user: UserReducer,
        tasks: TaskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
