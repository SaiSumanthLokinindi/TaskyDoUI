import { configureStore } from '@reduxjs/toolkit';
import MyDayReducer from './Task/MyDaySlice';
import UserReducer from './User/UserSlice';

const store = configureStore({
    reducer: {
        user: UserReducer,
        myDay: MyDayReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
