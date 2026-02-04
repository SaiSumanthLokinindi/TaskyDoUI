import styled, { css, keyframes } from 'styled-components';
import Card from '../Card/card';
import Flex from '../Flex/flex';
import Text from '../Text/Text';
import Badge, { BadgeProps } from '../Badge/Badge';
import { TaskPriority, TaskProps } from './Task.types';
import { useMemo } from 'react';
import Checkbox, { StyledCheckbox } from '../Checkbox/Checkbox';
import { formatDueDate } from 'src/utils/dates';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { markTaskCompleted } from 'src/store/Task/TaskSlice';
import { updateTaskCompletion } from 'src/store/Task/utils';

const slideUpFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const StyledTaskCard = styled(Card)<{ $animationDelay?: number }>(({
    $animationDelay = 0,
    theme,
}) => {
    return css`
        display: flex;
        column-gap: calc(1.5 * ${theme.spacing});
        padding: ${theme.spacing};
        border: 0.5px solid #393939;
        box-sizing: border-box;
        cursor: pointer;
        align-items: flex-start;
        opacity: 0;
        transition:
            border-color 330ms ease,
            background-color 330ms ease;
        animation: ${slideUpFadeIn} 0.33s ease-out forwards;
        animation-delay: ${$animationDelay}ms;

        &:hover {
            border-color: ${theme.baseColors.tertiary};
            background-color: #252525;
        }

        ${StyledCheckbox} {
            margin-top: 3px;
        }
    `;
});

const StyledTaskLabel = styled.span<Pick<TaskProps, 'completed'>>(
    ({ completed }) => {
        return css`
            font-size: 0.85rem;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;

            ${completed &&
            css`
                text-decoration: line-through;
                color: rgba(255, 255, 255, 0.6);
            `}
        `;
    },
);

const PRIORITY_CONFIG: Record<
    Exclude<TaskPriority, 0>,
    { label: string; type: BadgeProps['type'] }
> = {
    1: { label: 'low', type: 'success' },
    2: { label: 'medium', type: 'warning' },
    3: { label: 'high', type: 'high' },
    4: { label: 'critical', type: 'error' },
};

const Task = ({
    id,
    label,
    completed,
    dueDate,
    priority,
    animationDelay,
    onClick,
    onTaskCompletionChange,
}: TaskProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const dueDateInfo = useMemo(() => {
        if (!dueDate) return null;
        return formatDueDate(dueDate);
    }, [dueDate]);

    const handleTaskCompletionChange = (
        e?: React.ChangeEvent<HTMLInputElement>,
    ) => {
        onTaskCompletionChange?.(id, e);
        dispatch(
            markTaskCompleted({ id, completed: e?.target.checked || false }),
        );

        dispatch(
            updateTaskCompletion({ id, completed: e?.target.checked || false }),
        );
    };

    const priorityConfig = useMemo(
        () => (priority ? PRIORITY_CONFIG[priority] : null),
        [priority],
    );

    return (
        <StyledTaskCard
            $animationDelay={animationDelay || 0}
            onClick={(e) => onClick?.(id, e)}
        >
            <Checkbox
                checked={completed || false}
                onChange={handleTaskCompletionChange}
                onClick={(e) => e.stopPropagation()}
            />
            <Flex
                direction="column"
                grow={1}
                rowGap={priorityConfig || dueDateInfo ? '4px' : '0'}
            >
                <StyledTaskLabel completed={completed || false}>
                    {label}
                </StyledTaskLabel>

                <Flex
                    justifyContent={
                        priorityConfig && dueDateInfo
                            ? 'space-between'
                            : priorityConfig
                            ? 'flex-end'
                            : 'flex-start'
                    }
                    alignItems="center"
                >
                    {dueDateInfo && <Text variant="helper">{dueDateInfo}</Text>}
                    {priorityConfig && (
                        <Badge
                            type={priorityConfig.type}
                            label={priorityConfig.label}
                        />
                    )}
                </Flex>
            </Flex>
        </StyledTaskCard>
    );
};

export default Task;
