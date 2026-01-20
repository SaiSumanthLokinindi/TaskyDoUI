import styled from 'styled-components';
import Flex from 'src/components/Flex/flex';
import { memo } from 'react';
import Task from '../Task/Task';
import Text from 'src/components/Text/Text';
import { type TaskInfo } from 'src/store/Task/Task.types';

const StyledListWrapper = styled(Flex)`
    min-height: 0;
`;

const StyledTaskList = styled(Flex)`
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    margin-block-start: calc(1.5 * ${({ theme }) => theme.spacing});

    /* Add smooth scrollbar behavior */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.baseColors.secondaryHover};
        border-radius: 4px;
    }
`;

export interface TaskListProps {
    label?: string;
    tasks: TaskInfo[];
    loading?: boolean;
}

const TaskList = memo(({ label, tasks, loading }: TaskListProps) => {
    return (
        <StyledListWrapper direction="column">
            {label && <Text variant="h4">{label}</Text>}
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <StyledTaskList direction="column" rowGap="8px">
                    {tasks.map((task: TaskInfo, index) => {
                        return (
                            <Task
                                id={task.id}
                                key={task.id}
                                label={task.label}
                                completed={task.status?.completed}
                                dueDate={task.dueDate}
                                priority={task.priority}
                                animationDelay={index * 0.5}
                            />
                        );
                    })}
                </StyledTaskList>
            )}
        </StyledListWrapper>
    );
});

export default TaskList;
