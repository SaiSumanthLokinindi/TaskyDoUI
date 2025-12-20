import styled, { css } from 'styled-components';
import Card from '../Card/card';
import Flex from '../Flex/flex';
import Text from '../Text/Text';
import Badge from '../Badge/Badge';
import { Priority, TaskProps } from './Task.types';

const StyledTaskCard = styled(Card)(({ theme }) => {
    return css`
        display: flex;
        column-gap: calc(1.5 * ${theme.spacing});
        padding: ${theme.spacing};
        border: 0.25px solid ${theme.baseColors.secondaryHover};
        box-sizing: border-box;
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
    return (
        <StyledTaskCard>
            <input type="checkbox" checked={completed} />
            <Flex direction="column" grow={1} rowGap="8px">
                <StyledTaskLabel completed={completed}>
                    Complete agile studio test cases for C11n search update user
                    story, Complete agile studio test cases for C11n search
                    update user story
                </StyledTaskLabel>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text variant="helper">Due in 2 days</Text>
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
