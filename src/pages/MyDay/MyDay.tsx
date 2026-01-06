import { useFetchTasksOnLoad } from 'src/store/hooks/useFetchTasksOnLoad';
import { fetchMyDay } from 'src/store/Task/MyDaySlice';
import { fetchOverdueTasks } from 'src/store/Task/OverdueTasksSlice';
import { fetchUpcomingTasks } from 'src/store/Task/UpcomingTasksSlice';

const MyDay = () => {
    useFetchTasksOnLoad(fetchMyDay);
    useFetchTasksOnLoad(fetchUpcomingTasks);
    useFetchTasksOnLoad(fetchOverdueTasks);

    return <div>MyDay</div>;
};

export default MyDay;
