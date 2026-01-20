import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskInfo, TasksState } from './Task.types';
import { fetchTasksThunk, updateTaskCompletion } from './utils';

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
};

export const fetchMyDay = fetchTasksThunk('myDay/fetch', 'myday');
export const fetchOverdueTasks = fetchTasksThunk('overdue/fetch', 'overdue');
export const fetchUpcomingTasks = fetchTasksThunk('upcoming/fetch', 'upcoming');

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

        builder.addCase(updateTaskCompletion.pending, (state, action) => {
            const { id } = action.meta.arg;
            state.taskCompletionRequests[id] = action.meta.requestId;
        });

        builder.addCase(updateTaskCompletion.fulfilled, (state, action) => {
            const { id } = action.meta.arg;

            if (state.taskCompletionRequests[id] !== action.meta.requestId) {
                return;
            }

            state.entities[action.payload.id] = action.payload as TaskInfo;
            delete state.taskCompletionRequests[id];
        });

        builder.addCase(updateTaskCompletion.rejected, (state, action) => {
            if (action.payload) {
                const task = state.entities[action.payload.id];
                if (task.status) {
                    task.status.completed = !action.payload.completed;
                }
            }
        });
    },
});

export const { upsertTasks, clearTasks, markTaskCompleted } = TaskSlice.actions;
export default TaskSlice.reducer;
