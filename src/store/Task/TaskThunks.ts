import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskInfo } from './Task.types';
import { TaskService } from 'src/services/TaskService';

export const fetchTasksThunk = (
    identifier: string,
    taskType: 'myday' | 'upcoming' | 'overdue',
) => {
    return createAsyncThunk(identifier, async (_, thunkApi) => {
        try {
            return await TaskService.getTasks(taskType);
        } catch (err) {
            return thunkApi.rejectWithValue(
                `Failed to fetch ${taskType} tasks info`,
            );
        }
    });
};

export const updateTaskCompletion = createAsyncThunk<
    TaskInfo,
    { id: string; completed: boolean },
    { rejectValue: { id: string; completed: boolean; message: string } }
>('task/updateCompletion', async ({ id, completed }, { rejectWithValue }) => {
    try {
        return await TaskService.updateTask(id, { status: { completed } });
    } catch (err) {
        return rejectWithValue({
            id,
            completed,
            message: 'Failed to update task completion',
        });
    }
});

export const addTask = createAsyncThunk<TaskInfo, Omit<TaskInfo, 'id'>>(
    'task/add',
    async (taskInfo, { rejectWithValue }) => {
        try {
            return await TaskService.addTask(taskInfo);
        } catch (err) {
            return rejectWithValue(`Failed to add task`);
        }
    },
);

export const updateTask = createAsyncThunk<TaskInfo, TaskInfo>(
    'task/update',
    async (taskInfo, { rejectWithValue }) => {
        try {
            const { id, ...taskUpdates } = taskInfo;
            return await TaskService.updateTask(id, taskUpdates);
        } catch (err) {
            return rejectWithValue('Failed to update task');
        }
    },
);
