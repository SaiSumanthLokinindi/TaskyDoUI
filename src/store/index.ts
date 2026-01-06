import { configureStore } from '@reduxjs/toolkit';
import MyDayReducer from './Task/MyDaySlice';
import UserReducer from './User/UserSlice';
import UpcomingTasksReducer from './Task/UpcomingTasksSlice';
import OverdueTasksReducer from './Task/OverdueTasksSlice';

const store = configureStore({
    reducer: {
        user: UserReducer,
        myDay: MyDayReducer,
        upcomingTasks: UpcomingTasksReducer,
        overdueTasks: OverdueTasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
