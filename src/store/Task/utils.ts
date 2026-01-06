import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskInfo, TasksState } from './Task.types';
import axios from 'src/axios-instance/axios-instance';

export const tasksInitialState: TasksState = {
    tasks: [],
    loading: false,
    error: undefined,
};

export const fetchTasksThunk = (
    identifier: string,
    taskType: 'myday' | 'upcoming' | 'overdue',
) => {
    return createAsyncThunk(identifier, async (_, thunkApi) => {
        try {
            const res = await axios.get<TaskInfo[]>(`task/${taskType}`);
            if (res.status === 200) {
                return res.data;
            } else {
                throw new Error();
            }
        } catch (err) {
            return thunkApi.rejectWithValue(
                `Failed to fetch ${taskType} tasks info`,
            );
        }
    });
};
