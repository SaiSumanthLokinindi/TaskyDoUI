import axios from 'src/axios-instance/axios-instance';
import { TaskInfo } from 'src/store/Task/Task.types';

export const TaskService = {
    getTasks: (type: 'myday' | 'upcoming' | 'overdue'): Promise<TaskInfo[]> =>
        axios.get<TaskInfo[]>(`task/${type}`).then((res) => res.data),

    updateTask: (
        id: TaskInfo['id'],
        body: Partial<TaskInfo>,
    ): Promise<TaskInfo> =>
        axios
            .patch<TaskInfo>(`task/${id}`, {
                ...body,
            })
            .then((res) => res.data),

    addTask: (body: Omit<TaskInfo, 'id'>): Promise<TaskInfo> =>
        axios.post<TaskInfo>('task', body).then((res) => res.data),
};
