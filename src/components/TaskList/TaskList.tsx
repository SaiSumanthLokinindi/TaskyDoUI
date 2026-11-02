import styled, { css, useTheme } from 'styled-components';
import Flex from 'src/components/Flex/flex';
import { memo, useCallback } from 'react';
import Task from '../Task/Task';
import Text from 'src/components/Text/Text';
import { type TaskInfo } from 'src/store/Task/Task.types';
import Loader, { StyledLoader } from '../Loader/Loader';
import { useModal } from '../Modal/ModalContext';
import TaskDetails from 'src/pages/TaskDetails/TaskDetails';
import EditTask from 'src/pages/EditTask/EditTask';
import useBreakpoint from 'src/hooks/useBreakpoint';

const StyledListWrapper = styled(Flex)(({
    theme: { spacing, breakpoints },
}) => {
    return css`
        flex: 1;
        min-height: 0;
        min-width: 0;

        ${StyledLoader} {
            height: 2rem;
            width: 2rem;
        }

        @media (max-width: calc(${breakpoints.md} - 1px)) {
            padding-block-start: calc(2 * ${spacing});
        }
    `;
});

const StyledTaskList = styled(Flex)(({ theme: { spacing, breakpoints } }) => {
    return css`
        flex: 1;
        overflow-y: auto;
        min-width: 0;
        min-height: 0;
        overscroll-behavior: contain;
        margin-block-start: calc(1.5 * ${spacing});

        @media (max-width: calc(${breakpoints.md} - 1px)) {
            padding-block-end: calc(8 * ${spacing});
        }
    `;
});

export interface TaskListProps {
    label?: string;
    tasks: TaskInfo[];
    loading?: boolean;
}

const TaskList = memo(({ label, tasks, loading }: TaskListProps) => {
    const { openModal } = useModal();
    const theme = useTheme();

    const taskClickHandler = useCallback(
        (id: TaskInfo['id']) => {
            openModal({
                title: 'Task Details',
                body: <TaskDetails id={id} />,
                actions: [
                    {
                        label: 'Edit Task',
                        onClick: () => {
                            openModal({
                                title: 'Edit Task',
                                body: <EditTask id={id} />,
                            });
                        },
                        variant: 'simple',
                    },
                ],
            });
        },
        [openModal],
    );

    return (
        <StyledListWrapper direction="column">
            {label && <Text variant="h4">{label}</Text>}
            {loading ? (
                <Flex
                    style={{ minHeight: 0, flex: 1 }}
                    alignItems="center"
                    justifyContent="center"
                    grow={1}
                >
                    <Loader />
                </Flex>
            ) : (
                <StyledTaskList direction="column" rowGap={theme.spacing}>
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
