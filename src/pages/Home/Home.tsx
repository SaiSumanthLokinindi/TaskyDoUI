import { memo, useMemo, useState } from 'react';
import DueCard from './DueCard';
import Flex from 'src/components/Flex/flex';

import Text from 'src/components/Text/Text';
import Progress from 'src/components/Progress/Progress';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import TaskList from 'src/components/TaskList/TaskList';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useFetchTasksOnLoad } from 'src/store/hooks/useFetchTasksOnLoad';
import { fetchMyDay } from 'src/store/Task/TaskSlice';
import { fetchUpcomingTasks } from 'src/store/Task/TaskSlice';
import { fetchOverdueTasks } from 'src/store/Task/TaskSlice';
import {
    StyledHomeContainer,
    StyledQuickStats,
    StyledMyDayProgress,
    StyledHeader,
    StyledProgressContainer,
    StyledMyDayTasksList,
    StyledOverdueTasksList,
    StyledUpcomingTasksList,
    StyledCalender,
} from './Home.styles';
import {
    selectMyDayTasks,
    selectOverdueTasks,
    selectUpcomingTasks,
} from 'src/store/Task/TaskSelectors';

const Home = memo(() => {
    const [selected, setSelected] = useState<Date>(new Date());
    useFetchTasksOnLoad(fetchMyDay);
    useFetchTasksOnLoad(fetchUpcomingTasks);
    useFetchTasksOnLoad(fetchOverdueTasks);
    const { loading: myDayTasksLoading, error: myDayTasksError } = useSelector(
        (state: RootState) => state.tasks.myDayState,
    );
    const myDayTasks = useSelector(selectMyDayTasks);
    const [myDayTasksCompletedCount, myDayTasksCompletionPercentage] =
        useMemo(() => {
            const completedCount = myDayTasks.reduce((acc, current) => {
                if (current.status?.completed) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            const completionPercentage =
                (completedCount / myDayTasks.length) * 100;
            return [completedCount, Math.ceil(completionPercentage)];
        }, [myDayTasks]);

    const { loading: overdueTasksLoading, error: overdueTasksError } =
        useSelector((state: RootState) => state.tasks.overdueState);
    const overdueTasks = useSelector(selectOverdueTasks);

    const { loading: upcomingTasksLoading, error: upcomingTasksError } =
        useSelector((state: RootState) => state.tasks.upcomingState);
    const upcomingTasks = useSelector(selectUpcomingTasks);

    return (
        <StyledHomeContainer>
            <StyledQuickStats direction="column" rowGap="16px">
                <Flex columnGap="16px">
                    <DueCard
                        label="Due Today"
                        count={8}
                        helperText="Tasks due today"
                    />
                    <DueCard
                        label="Overdue"
                        count={overdueTasks.length}
                        helperText="Tasks overdue"
                    />
                </Flex>
                <StyledMyDayProgress>
                    <Flex direction="column" rowGap="24px">
                        <StyledHeader
                            justifyContent="space-between"
                            alignItems="baseline"
                        >
                            <Text variant="h5">My Day</Text>
                            <span>
                                {myDayTasks.length}{' '}
                                {myDayTasks.length === 1 ? 'task' : 'tasks'}
                            </span>
                        </StyledHeader>
                        <Flex direction="column" rowGap="8px">
                            <Flex direction="column">
                                <StyledProgressContainer justifyContent="space-between">
                                    <span>Progress</span>
                                    <span>
                                        {myDayTasksCompletionPercentage}%
                                    </span>
                                </StyledProgressContainer>
                                <Progress
                                    value={myDayTasksCompletionPercentage.toString()}
                                />
                            </Flex>
                            <Text size="xs" variant="helper">
                                {myDayTasksCompletedCount} tasks completed
                            </Text>
                        </Flex>
                    </Flex>
                </StyledMyDayProgress>
            </StyledQuickStats>
            <StyledMyDayTasksList>
                <TaskList
                    label="My Day"
                    tasks={myDayTasks}
                    loading={myDayTasksLoading}
                />
            </StyledMyDayTasksList>
            <StyledOverdueTasksList>
                <TaskList
                    label="Overdue Tasks"
                    tasks={overdueTasks}
                    loading={overdueTasksLoading}
                />
            </StyledOverdueTasksList>
            <StyledUpcomingTasksList>
                <TaskList
                    label="Upcoming Tasks"
                    tasks={upcomingTasks}
                    loading={upcomingTasksLoading}
                />
            </StyledUpcomingTasksList>
            <StyledCalender>
                <DayPicker
                    required={false}
                    animate
                    mode="single"
                    selected={selected}
                    onSelect={(Date) => setSelected(Date!)}
                />
            </StyledCalender>
        </StyledHomeContainer>
    );
});

export default Home;
