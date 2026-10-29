import { memo } from 'react';
import { useSelector } from 'react-redux';
import TaskList from 'src/components/TaskList/TaskList';
import { RootState } from 'src/store';
import { selectUpcomingTasks } from 'src/store/Task/TaskSelectors';

const UpcomingTasks = memo(() => {
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
