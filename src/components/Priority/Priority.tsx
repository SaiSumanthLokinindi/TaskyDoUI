import { memo } from 'react';
import Text from '../Text/Text';
import { TaskPriority } from '../Task/Task.types';
import { BaseUIProps } from 'src/types/base.types';
import { PRIORITY_MAP } from './constants';
import styled, { css } from 'styled-components';
import Flex from '../Flex/flex';

export interface PriorityProps extends BaseUIProps {
    priority: Exclude<TaskPriority, 0>;
}

const StyledPriority = styled(Flex)<{
    $colorType: string;
}>(({
    $colorType,
    theme: {
        priority: { colors },
        spacing,
    },
}) => {
    return css`
        column-gap: ${spacing};

        &::before {
            content: '';
            height: 0.4rem;
            width: 0.4rem;
            border-radius: 50%;
            background-color: ${colors[$colorType]};
        }
    `;
});

const Priority = ({ priority }: PriorityProps) => {
    return (
        <StyledPriority
            alignItems="center"
            $colorType={PRIORITY_MAP[priority].colorCode}
        >
            <Text>{PRIORITY_MAP[priority].label}</Text>
        </StyledPriority>
    );
};

export default memo(Priority);
