import { memo } from 'react';
import Flex from 'src/components/Flex/flex';
import Input, { StyledInput } from 'src/components/Input/input';
import styled, { css } from 'styled-components';

const StyledEditTaskContainer = styled(Flex)(({ theme: { spacing } }) => {
    return css`
        width: 100%;
        & > *:not(:first-child) ${StyledInput} {
            font-size: 0.825rem;
        }
    `;
});

const EditTask = () => {
    return (
        <StyledEditTaskContainer direction="column" rowGap="8px">
            <Input type="text" placeholder="Task Name" name="task-label" />
            <Input
                type="textarea"
                placeholder="description of task"
                name="task-description"
            />
            <Input type="text" placeholder="Priority" name="task-priority" />
        </StyledEditTaskContainer>
    );
};

export default memo(EditTask);
