import { memo, useState } from 'react';
import DueCard from './DueCard';
import Flex from 'src/components/Flex/flex';
import styled, { css } from 'styled-components';
import Card from 'src/components/Card/card';
import Text from 'src/components/Text/Text';
import Progress from 'src/components/Progress/Progress';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import Task from 'src/components/Task/Task';
import { Priority } from 'src/components/Task/Task.types';

const StyledQuickStats = styled(Flex)`
    grid-area: quickinfo;
`;

const StyledMyDayTasksList = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
        grid-area: myday;
        display: flex;
        flex-direction: column;
        min-height: 0;
    `;
});

const StyledTaskList = styled(Flex)`
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    margin-block-start: calc(1.5 * ${({ theme }) => theme.spacing});
`;

const StyledOverdueTasksList = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
        grid-area: overdue;
        display: flex;
        flex-direction: column;
        min-height: 0;
    `;
});

const StyledUpcomingTasksList = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
        grid-area: upcoming;
        display: flex;
        flex-direction: column;
        min-height: 0;
    `;
});

const StyledCalender = styled(Card)(({ theme: { spacing } }) => {
    return css`
        padding: calc(1.5 * ${spacing});
        grid-area: calender;
    `;
});
const StyledHomeContainer = styled.div(({ theme: { spacing } }) => {
    return css`
        width: 100%;
        display: grid;
        box-sizing: border-box;
        margin-block-start: calc(2 * ${spacing});

        grid-template-columns: 20% 1fr 1fr;
        /* grid-template-rows: repeat(6, 1fr); */

        grid-template-areas:
            'quickinfo myday overdue'
            'quickinfo myday overdue'
            'calender  myday overdue'
            'calender  myday upcoming'
            'calender  myday upcoming'
            'calender  myday upcoming';

        gap: calc(2 * ${spacing});
    `;
});

const StyledHeader = styled(Flex)`
    font-size: 0.875rem;
`;

const StyledProgressContainer = styled(Flex)`
    font-size: 0.725rem;
`;

const StyledMyDayProgress = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
    `;
});

const Home = memo(() => {
    const [selected, setSelected] = useState<Date>(new Date());

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
                        count={15}
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
                            <span>12 tasks</span>
                        </StyledHeader>
                        <Flex direction="column" rowGap="8px">
                            <Flex direction="column">
                                <StyledProgressContainer justifyContent="space-between">
                                    <span>Progress</span>
                                    <span>32%</span>
                                </StyledProgressContainer>
                                <Progress value="65" />
                            </Flex>
                            <Text size="xs" variant="helper">
                                5 tasks completed
                            </Text>
                        </Flex>
                    </Flex>
                </StyledMyDayProgress>
            </StyledQuickStats>
            <StyledMyDayTasksList>
                <Text variant="h4">My Day</Text>
                <StyledTaskList direction="column" rowGap="8px">
                    <Task priority={Priority.Medium} completed />
                    <Task priority={Priority.High} />
                    <Task priority={Priority.Low} />
                    <Task priority={Priority.Critical} />
                    <Task priority={Priority.Medium} />
                    <Task priority={Priority.High} />
                    <Task priority={Priority.Low} />
                    <Task priority={Priority.Critical} />
                </StyledTaskList>
            </StyledMyDayTasksList>
            <StyledOverdueTasksList>
                <Text variant="h4">Overdue Tasks</Text>
                <StyledTaskList direction="column" rowGap="8px">
                    <Task priority={Priority.Medium} />
                    <Task priority={Priority.High} />
                    <Task priority={Priority.Low} />
                    <Task priority={Priority.Critical} />
                    <Task priority={Priority.Medium} />
                    <Task priority={Priority.High} />
                    <Task priority={Priority.Low} />
                    <Task priority={Priority.Critical} />
                </StyledTaskList>
            </StyledOverdueTasksList>
            <StyledUpcomingTasksList>
                <Text variant="h4">Upcoming Tasks</Text>
                <StyledTaskList direction="column" rowGap="8px">
                    <Task priority={Priority.Medium} />
                    <Task priority={Priority.High} />
                    <Task priority={Priority.Low} />
                    <Task priority={Priority.Critical} />
                    <Task priority={Priority.Medium} />
                    <Task priority={Priority.High} />
                    <Task priority={Priority.Low} />
                    <Task priority={Priority.Critical} />
                </StyledTaskList>
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
