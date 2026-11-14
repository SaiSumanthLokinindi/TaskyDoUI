import { memo } from 'react';
import { useSelector } from 'react-redux';
import TaskList from 'src/components/TaskList/TaskList';
import { RootState } from 'src/store';
import { selectRecentlyCompletedTasks } from 'src/store/Task/TaskSelectors';

const RecentlyCompletedTasks = memo(() => {
    const recentlyCompletedTasks = useSelector(selectRecentlyCompletedTasks);
    const {
        loading: recentlyCompletedTasksLoading,
        error: recentlyCompletedTasksError,
    } = useSelector((state: RootState) => state.tasks.recentlyCompletedState);
    return (
        <TaskList
            label="Recently Completed"
            tasks={recentlyCompletedTasks}
            loading={recentlyCompletedTasksLoading}
        />
    );
});

RecentlyCompletedTasks.displayName = 'Recently Completed Tasks';

export default RecentlyCompletedTasks;
