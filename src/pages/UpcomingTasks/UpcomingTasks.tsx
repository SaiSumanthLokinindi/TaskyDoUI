import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectUpcomingTasks } from 'src/store/Task/TaskSelectors';

const UpcomingTasks = memo(() => {
    const upcomingTasks = useSelector(selectUpcomingTasks);
    return <div>Upcoming Tasks</div>;
});

UpcomingTasks.displayName = 'Upcoming Tasks';

export default UpcomingTasks;
