import { memo } from 'react';
import { useSelector } from 'react-redux';
import TaskList from 'src/components/TaskList/TaskList';
import { RootState } from 'src/store';
import { selectOverdueTasks } from 'src/store/Task/TaskSelectors';

const OverdueTasks = memo(() => {
    const { loading: overdueTasksLoading, error: overdueTasksError } =
        useSelector((state: RootState) => state.tasks.overdueState);
    const overdueTasks = useSelector(selectOverdueTasks);

    return (
        <TaskList
            label="Overdue Tasks"
            tasks={overdueTasks}
            loading={overdueTasksLoading}
        />
    );
});

OverdueTasks.displayName = 'Overdue Tasks';

export default OverdueTasks;
