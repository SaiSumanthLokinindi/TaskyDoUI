import { memo } from 'react';
import { useSelector } from 'react-redux';
import TaskList from 'src/components/TaskList/TaskList';
import { RootState } from 'src/store';
import { useFetchTasksOnLoad } from 'src/store/hooks/useFetchTasksOnLoad';
import { selectUpcomingTasks } from 'src/store/Task/TaskSelectors';
import { fetchUpcomingTasks } from 'src/store/Task/TaskSlice';

const UpcomingTasks = memo(() => {
    useFetchTasksOnLoad(fetchUpcomingTasks);
    const { loading: upcomingTasksLoading, error: upcomingTasksError } =
        useSelector((state: RootState) => state.tasks.upcomingState);
    const upcomingTasks = useSelector(selectUpcomingTasks);
    return (
        <TaskList
            label="Upcoming Tasks"
            tasks={upcomingTasks}
            loading={upcomingTasksLoading}
        />
    );
});

UpcomingTasks.displayName = 'Upcoming Tasks';

export default UpcomingTasks;
