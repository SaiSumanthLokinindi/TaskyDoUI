import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from './Task/TaskSlice';
import UserReducer from './User/UserSlice';

const store = configureStore({
    reducer: {
        user: UserReducer,
        task: TaskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
