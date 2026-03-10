import Flex from 'src/components/Flex/flex';
import InfoItem, {
    StyledInfoContent,
    StyledInfoItem,
} from 'src/components/InfoItem/InfoItem';
import { GoCalendar } from 'react-icons/go';
import Priority from 'src/components/Priority/Priority';
import Tag from 'src/components/Tag/Tag';
import Text, { StyledText } from 'src/components/Text/Text';

import styled, { css, useTheme } from 'styled-components';
import { TaskInfo } from 'src/store/Task/Task.types';
import { useModal } from 'src/components/Modal/ModalContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { SelectTaskById } from 'src/store/Task/TaskSelectors';
import { updateTaskCompletion } from 'src/store/Task/TaskThunks';
import { markTaskCompleted } from 'src/store/Task/TaskSlice';

const StyledTaskDetailsContainer = styled(Flex)(({ theme }) => {
    return css`
        width: 100%;

        ${StyledInfoItem} ${StyledInfoContent} ${StyledText} {
            font-size: 0.9rem;
        }
    `;
});

const StyleInfoGrid = styled.div(({ theme }) => {
    return css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        row-gap: calc(3 * ${theme.spacing});

        @media (width <= 375px) {
            grid-template-columns: 1fr;
        }
    `;
});

export type TaskDetailsProps = { id: TaskInfo['id'] };

const TaskDetails = ({ id }: TaskDetailsProps) => {
    const {
        label,
        description,
        scheduleDate,
        dueDate,
        tags,
        priority: taskPriority,
        status,
    } = useSelector((state) => SelectTaskById(state, id));
    const theme = useTheme();
    const { setActions } = useModal();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status?.completed) {
            setActions([
                {
                    label: 'Mark InComplete',
                    type: 'button',
                    variant: 'primary',
                    onClick: () => {
                        dispatch(markTaskCompleted({ id, completed: false }));
                        dispatch(
                            updateTaskCompletion({ id, completed: false }),
                        );
                    },
                },
            ]);
        } else {
            setActions([
                {
                    label: 'Mark Complete',
                    type: 'button',
                    variant: 'primary',
                    onClick: () => {
                        dispatch(markTaskCompleted({ id, completed: true }));
                        dispatch(updateTaskCompletion({ id, completed: true }));
                    },
                },
            ]);
        }
    }, [status]);

    return (
        <StyledTaskDetailsContainer
            direction="column"
            rowGap={`calc(3 * ${theme.spacing})`}
        >
            <Text variant="h6" size="lg" lineHeight={1.5}>
                {label}
            </Text>
            {description && (
                <Text
                    size="sm"
                    expandable
                    lineHeight={1.5}
                    style={{ color: theme.baseColors.fadedGray }}
                >
                    {description}
                </Text>
            )}
            <StyleInfoGrid>
                {taskPriority !== undefined && (
                    <InfoItem
                        label="Priority"
                        info={<Priority priority={taskPriority} />}
                    />
                )}
                {scheduleDate && (
                    <InfoItem
                        label="Schedule Date"
                        info={
                            <Flex
                                columnGap={theme.spacing}
                                alignItems="center"
                                style={{ fontSize: '0.9rem' }}
                            >
                                <GoCalendar
                                    style={{ marginBlockStart: '-2px' }}
                                />
                                <Text lineHeight={1}>26 Nov 2026</Text>
                            </Flex>
                        }
                    />
                )}
                {dueDate && (
                    <InfoItem
                        label="Due Date"
                        info={
                            <Flex
                                columnGap={theme.spacing}
                                alignItems="center"
                                style={{ fontSize: '0.9rem' }}
                            >
                                <GoCalendar
                                    style={{ marginBlockStart: '-2px' }}
                                />
                                <Text lineHeight={1}>30 Nov 2026</Text>
                            </Flex>
                        }
                    />
                )}
            </StyleInfoGrid>
            {tags && tags.length ? (
                <InfoItem
                    label="Tags"
                    info={
                        <Flex gap={theme.spacing} flexWrap="wrap">
                            {tags.map((tag) => (
                                <Tag id={tag} key={tag} label={tag} readOnly />
                            ))}
                        </Flex>
                    }
                />
            ) : null}
        </StyledTaskDetailsContainer>
    );
};

export default TaskDetails;
