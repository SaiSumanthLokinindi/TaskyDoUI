import styled, { css, keyframes } from 'styled-components';
import Card from '../Card/card';
import Flex from '../Flex/flex';
import Text from '../Text/Text';
import Badge, { BadgeProps } from '../Badge/Badge';
import { Priority, TaskProps } from './Task.types';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { formatDueDate } from 'src/utils/dates';

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
        border: 0.25px solid ${theme.baseColors.secondaryHover};
        box-sizing: border-box;
        cursor: pointer;
        align-items: center;
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

const badgeBackgroundMapping: Record<Priority, BadgeProps['type']> = {
    low: 'success',
    medium: 'warning',
    high: 'high',
    critical: 'error',
};

const Task = ({
    label,
    completed,
    dueDate,
    priority,
    animationDelay,
}: TaskProps) => {
    const [taskCompleted, setTaskCompleted] = useState(completed || false);

    const dueDateInfo = useMemo(() => {
        if (!dueDate) return null;
        return formatDueDate(dueDate);
    }, [dueDate]);

    useEffect(() => {
        setTaskCompleted(completed || false);
    }, [completed]);

    const onTaskCompletionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskCompleted(event.target.checked);
    };

    return (
        <StyledTaskCard $animationDelay={animationDelay || 0}>
            <Checkbox
                checked={taskCompleted}
                onChange={onTaskCompletionChange}
            />
            <Flex
                direction="column"
                grow={1}
                rowGap={
                    !taskCompleted && (priority || dueDateInfo) ? '4px' : '0'
                }
            >
                <StyledTaskLabel completed={taskCompleted}>
                    {label}
                </StyledTaskLabel>
                {!taskCompleted && (
                    <Flex
                        justifyContent={
                            priority && dueDateInfo
                                ? 'space-between'
                                : priority
                                ? 'flex-end'
                                : 'flex-start'
                        }
                        alignItems="center"
                    >
                        {dueDateInfo && (
                            <Text variant="helper">{dueDateInfo}</Text>
                        )}
                        {priority && (
                            <Badge
                                type={badgeBackgroundMapping[priority]}
                                label={priority}
                            />
                        )}
                    </Flex>
                )}
            </Flex>
        </StyledTaskCard>
    );
};

export default Task;
