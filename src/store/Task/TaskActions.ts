import axios from 'src/axios-instance/axios-instance';
import { TaskActions } from './TaskSlice';

export const fetchMyDayTasks = () => {
    return async (...args) => {
        const fetchTasks = async () => {
            const response = await axios.get('/task/myday');
            if (response.status !== 200) {
                throw new Error('Failed to fetch my day tasks');
            }
            return response.data;
        };

        try {
            const myDayTasks = await fetchTasks();
            dispatch(TaskActions.setMyDayTasks(myDayTasks));
        } catch (error) {
            console.log(error);
        }
    };
};
