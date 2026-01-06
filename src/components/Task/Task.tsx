import styled, { css } from 'styled-components';
import Card from '../Card/card';
import Flex from '../Flex/flex';
import Text from '../Text/Text';
import Badge from '../Badge/Badge';
import { Priority, TaskProps } from './Task.types';
import { ChangeEvent, useEffect, useState } from 'react';

const StyledTaskCard = styled(Card)(({ theme }) => {
    return css`
        display: flex;
        column-gap: calc(1.5 * ${theme.spacing});
        padding: ${theme.spacing};
        border: 0.25px solid ${theme.baseColors.secondaryHover};
        box-sizing: border-box;
        cursor: pointer;
        transition:
            border-color 330ms ease,
            background-color 330ms ease;

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

            ${completed &&
            css`
                text-decoration: line-through;
                color: rgba(255, 255, 255, 0.6);
            `}
        `;
    },
);

const badgeBackgroundMapping: Record<Priority, string> = {
    Low: 'success',
    Medium: 'warning',
    High: 'high',
    Critical: 'error',
};

const Task = ({ label, completed, dueDate, priority }: TaskProps) => {
    const [taskCompleted, setTaskCompleted] = useState(completed || false);

    useEffect(() => {
        setTaskCompleted(completed || false);
    }, [completed]);

    const onTaskCompletionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskCompleted(event.target.checked);
    };

    return (
        <StyledTaskCard>
            <input
                type="checkbox"
                checked={taskCompleted}
                onChange={onTaskCompletionChange}
            />
            <Flex direction="column" grow={1} rowGap="8px">
                <StyledTaskLabel completed={taskCompleted}>
                    {label}
                </StyledTaskLabel>
                <Flex
                    justifyContent={
                        taskCompleted ? 'flex-end' : 'space-between'
                    }
                    alignItems="center"
                >
                    {!taskCompleted && (
                        <Text variant="helper">Due in 2 days</Text>
                    )}
                    <Badge
                        type={badgeBackgroundMapping[priority]}
                        label="High"
                    />
                </Flex>
            </Flex>
        </StyledTaskCard>
    );
};

export default Task;
