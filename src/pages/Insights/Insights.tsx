import { memo, useMemo } from 'react';
import Flex from 'src/components/Flex/flex';
import {
    StyledInsights,
    StyledMyDayProgress,
    StyledHeader,
    StyledProgressContainer,
} from './Insights.styles';
import { useTheme } from 'styled-components';
import useBreakpoint from 'src/hooks/useBreakpoint';
import { useSelector } from 'react-redux';
import {
    selectMyDayTasks,
    selectOverDueTasksCount,
} from 'src/store/Task/TaskSelectors';
import { isToday } from 'src/utils/dates';
import Progress from 'src/components/Progress/Progress';
import DueCard from '../Home/DueCard';
import Text from 'src/components/Text/Text';

const Insights = memo(() => {
    const theme = useTheme();
    const isMediumScreen = useBreakpoint('md');
    const isLargeScreen = useBreakpoint('lg');

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

    const dueTodayCount = useMemo(() => {
        let count = 0;
        myDayTasks.forEach((task) => {
            if (task.dueDate && isToday(task.dueDate)) {
                count++;
            }
        });
        return count;
    }, [myDayTasks]);

    const overDueTasksCount = useSelector(selectOverDueTasksCount);

    return (
        <StyledInsights
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
                    count={overDueTasksCount}
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
                                <span>{myDayTasksCompletionPercentage}%</span>
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
        </StyledInsights>
    );
});

Insights.displayName = 'Insights';

export default Insights;
