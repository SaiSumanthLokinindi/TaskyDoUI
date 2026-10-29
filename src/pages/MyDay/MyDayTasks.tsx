import { memo } from 'react';
import { useSelector } from 'react-redux';
import TaskList from 'src/components/TaskList/TaskList';
import { RootState } from 'src/store';
import { selectMyDayTasks } from 'src/store/Task/TaskSelectors';

const MyDayTasks = memo(() => {
    const myDayTasks = useSelector(selectMyDayTasks);
    const { loading: myDayTasksLoading, error: myDayTasksError } = useSelector(
        (state: RootState) => state.tasks.myDayState,
    );
    return (
        <TaskList
            label="My Day"
            tasks={myDayTasks}
            loading={myDayTasksLoading}
        />
    );
});

MyDayTasks.displayName = 'My Day Tasks';

export default MyDayTasks;
