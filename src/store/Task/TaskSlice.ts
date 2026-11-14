import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { TaskInfo, TasksState } from './Task.types';
import {
    addTask,
    deleteTask,
    fetchTasksThunk,
    updateTask,
    updateTaskCompletion,
} from './TaskThunks';

const upsertTasksInState = (state: TasksState, tasks: TaskInfo[]) => {
    tasks.forEach((task) => {
        if (!state.entities[task.id]) {
            state.ids.push(task.id);
        }
        state.entities[task.id] = task;
    });
};

export const tasksInitialState: TasksState = {
    entities: {},
    ids: [],
    taskCompletionRequests: {},
    myDayState: {
        loading: false,
        error: undefined,
    },
    upcomingState: {
        loading: false,
        error: undefined,
    },
    overdueState: {
        loading: false,
        error: undefined,
    },
    recentlyCompletedState:{
        loading:false,
        error:undefined
    },
    taskDeleteState:{}
};

export const fetchMyDay = fetchTasksThunk('myDay/fetch', 'myday');
export const fetchOverdueTasks = fetchTasksThunk('overdue/fetch', 'overdue');
export const fetchUpcomingTasks = fetchTasksThunk('upcoming/fetch', 'upcoming');
export const fetchRecentlyCompletedTasks = fetchTasksThunk('recentlyCompleted/fetch', 'recentlyCompleted');

const TaskSlice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        upsertTasks(state, action: PayloadAction<TaskInfo[]>) {
            upsertTasksInState(state, action.payload);
        },
        clearTasks(state) {
            state.entities = {};
            state.ids = [];
            state.myDayState = {
                loading: false,
                error: undefined,
            };
            state.upcomingState = {
                loading: false,
                error: undefined,
            };
            state.overdueState = {
                loading: false,
                error: undefined,
            };
        },
        markTaskCompleted(
            state,
            action: PayloadAction<{ id: string; completed: boolean }>,
        ) {
            const task = state.entities[action.payload.id];
            if (task) {
                task.status = {
                    completed: action.payload.completed,
                };
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchMyDay.pending, (state) => {
            state.myDayState.loading = true;
            state.myDayState.error = undefined;
        });
        builder.addCase(fetchMyDay.fulfilled, (state, action) => {
            upsertTasksInState(state, action.payload);
            state.myDayState.loading = false;
            state.myDayState.error = undefined;
        });

        builder.addCase(fetchMyDay.rejected, (state, action) => {
            state.myDayState.loading = false;
            state.myDayState.error = action.payload as string;
        });

        builder.addCase(fetchOverdueTasks.pending, (state) => {
            state.overdueState.loading = true;
            state.overdueState.error = undefined;
        });
        builder.addCase(fetchOverdueTasks.fulfilled, (state, action) => {
            upsertTasksInState(state, action.payload);
            state.overdueState.loading = false;
            state.overdueState.error = undefined;
        });

        builder.addCase(fetchOverdueTasks.rejected, (state, action) => {
            state.overdueState.loading = false;
            state.overdueState.error = action.payload as string;
        });

        builder.addCase(fetchUpcomingTasks.pending, (state) => {
            state.upcomingState.loading = true;
            state.upcomingState.error = undefined;
        });
        builder.addCase(fetchUpcomingTasks.fulfilled, (state, action) => {
            upsertTasksInState(state, action.payload);
            state.upcomingState.loading = false;
            state.upcomingState.error = undefined;
        });

        builder.addCase(fetchUpcomingTasks.rejected, (state, action) => {
            state.upcomingState.loading = false;
            state.upcomingState.error = action.payload as string;
        });

        builder.addCase(fetchRecentlyCompletedTasks.pending, (state) => {
            state.recentlyCompletedState.loading = true;
            state.recentlyCompletedState.error = undefined;
        });
        builder.addCase(fetchRecentlyCompletedTasks.fulfilled, (state, action) => {
            upsertTasksInState(state, action.payload);
            state.recentlyCompletedState.loading = false;
            state.recentlyCompletedState.error = undefined;
        });

        builder.addCase(fetchRecentlyCompletedTasks.rejected, (state, action) => {
            state.recentlyCompletedState.loading = false;
            state.recentlyCompletedState.error = action.payload as string;
        });

        builder.addCase(updateTaskCompletion.pending, (state, action) => {
            const { id, completed } = action.meta.arg;
            if(state.entities[id].status){
                state.entities[id].status.completed = completed;
                state.entities[id].status.completedOn = new Date().toISOString();
            }
            state.taskCompletionRequests[id] = action.meta.requestId;
        });

        builder.addCase(updateTaskCompletion.fulfilled, (state, action) => {
            const { id } = action.meta.arg;

            if (state.taskCompletionRequests[id] !== action.meta.requestId) {
                return;
            }

            state.entities[action.payload.id] = action.payload;
            delete state.taskCompletionRequests[id];
        });

        builder.addCase(updateTaskCompletion.rejected, (state, action) => {
            const {id} = action.meta.arg;
            if (action.payload) {
                const task = state.entities[action.payload.id];
                if (task.status) {
                    task.status.completed = !action.payload.completed;
                }
            }
            delete state.taskCompletionRequests[id];
        });

        builder.addCase(addTask.fulfilled, (state, action) => {
            if (action.payload) {
                const task = action.payload;
                if (!state.entities[task.id]) {
                    state.ids.push(task.id);
                }
                state.entities[task.id] = task;
            }
        });

        builder.addCase(updateTask.fulfilled, (state, action) => {
            if (action.payload) {
                const task = action.payload;

                if (state.entities[task.id]) {
                    state.entities[task.id] = task;
                } else {
                    state.ids.push(task.id);
                    state.entities[task.id] = task;
                }
            }
        });

        builder.addCase(deleteTask.pending , (state, action)=>{
            const id = action.meta.arg;
            const taskSnapShot = current(state.entities[id]);
            state.taskDeleteState[id] = {
                loading: true,
                task: structuredClone(taskSnapShot)
            }

            delete state.entities[id];
            state.ids = state.ids.filter(taskId=> taskId !== id);
        })

        builder.addCase(deleteTask.fulfilled, (state, action)=>{
            delete state.taskDeleteState[action.meta.arg];
        })

        builder.addCase(deleteTask.rejected, (state,action)=>{
            const id = action.meta.arg;
            state.ids.push(id);
            if(state.taskDeleteState[id]?.task)
                state.entities[action.meta.arg] = state.taskDeleteState[id].task;
            delete state.taskDeleteState[id];
        })
    },
});

export const { upsertTasks, clearTasks, markTaskCompleted } = TaskSlice.actions;
export default TaskSlice.reducer;
