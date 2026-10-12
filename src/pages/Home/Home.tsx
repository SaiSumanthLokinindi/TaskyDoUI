import { memo, useMemo } from 'react';
import DueCard from './DueCard';
import Flex from 'src/components/Flex/flex';
import { isToday } from 'src/utils/dates';

import Text from 'src/components/Text/Text';
import Progress from 'src/components/Progress/Progress';
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
    StyledRecentlyCompletedTasksList,
} from './Home.styles';
import {
    selectMyDayTasks,
    selectOverdueTasks,
    selectUpcomingTasks,
} from 'src/store/Task/TaskSelectors';
import { useTheme } from 'styled-components';
import useBreakpoint from 'src/hooks/useBreakpoint';

const Home = memo(() => {
    const theme = useTheme();
    const isMediumScreen = useBreakpoint('md');
    const isLargeScreen = useBreakpoint('lg');
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

    const dueTodayCount = useMemo(() => {
        let count = 0;
        myDayTasks.forEach((task) => {
            if (task.dueDate && isToday(task.dueDate)) {
                count++;
            }
        });
        return count;
    }, [myDayTasks]);

    return (
        <StyledHomeContainer>
            <StyledQuickStats
                direction={isMediumScreen && !isLargeScreen ? 'row' : 'column'}
                gap={`calc(2 * ${theme.spacing})`}
            >
                <Flex gap={`calc(2 * ${theme.spacing})`}>
                    <DueCard
                        label="Due Today"
                        count={dueTodayCount}
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
            {isMediumScreen && (
                <>
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
                    <StyledRecentlyCompletedTasksList>
                        <TaskList
                            label="Recently Completed Tasks"
                            tasks={myDayTasks}
                            loading={myDayTasksLoading}
                        />
                    </StyledRecentlyCompletedTasksList>
                </>
            )}
        </StyledHomeContainer>
    );
});

export default Home;
