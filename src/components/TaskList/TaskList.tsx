import styled from 'styled-components';
import Flex from 'src/components/Flex/flex';
import { memo, useCallback } from 'react';
import Task from '../Task/Task';
import Text from 'src/components/Text/Text';
import { type TaskInfo } from 'src/store/Task/Task.types';
import Loader, { StyledLoader } from '../Loader/Loader';
import { useModal } from '../Modal/ModalContext';
import TaskDetails from 'src/pages/TaskDetails/TaskDetails';

const StyledListWrapper = styled(Flex)`
    min-height: 0;
    height: 100%;
    ${StyledLoader} {
        height: 2rem;
        width: 2rem;
    }
`;

const StyledTaskList = styled(Flex)`
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    margin-block-start: calc(1.5 * ${({ theme }) => theme.spacing});
`;

export interface TaskListProps {
    label?: string;
    tasks: TaskInfo[];
    loading?: boolean;
}

const TaskList = memo(({ label, tasks, loading }: TaskListProps) => {
    const { openModal, closeModal } = useModal();

    const taskClickHandler = useCallback(() => {
        openModal({
            title: 'Task Details',
            body: <TaskDetails />,
            actions: [
                {
                    label: 'Mark Complete',
                    type: 'button',
                    variant: 'primary',
                },
            ],
        });
    }, []);

    return (
        <StyledListWrapper direction="column">
            {label && <Text variant="h4">{label}</Text>}
            {loading ? (
                <Flex
                    style={{ height: '100%', width: '100%' }}
                    alignItems="center"
                    justifyContent="center"
                    grow={1}
                >
                    <Loader />
                </Flex>
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
                                onClick={taskClickHandler}
                            />
                        );
                    })}
                </StyledTaskList>
            )}
        </StyledListWrapper>
    );
});

export default TaskList;
