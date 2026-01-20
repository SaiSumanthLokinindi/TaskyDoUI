import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskInfo } from './Task.types';
import axios from 'src/axios-instance/axios-instance';

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

export const updateTaskCompletion = createAsyncThunk<
    TaskInfo,
    { id: string; completed: boolean },
    { rejectValue: { id: string; completed: boolean; message: string } }
>('task/update', async ({ id, completed }, { rejectWithValue }) => {
    try {
        const res = await axios.patch<TaskInfo>(`task/${id}`, {
            status: { completed },
        });
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error();
        }
    } catch (err) {
        return rejectWithValue({
            id,
            completed,
            message: 'Failed to update task completion',
        });
    }
});
