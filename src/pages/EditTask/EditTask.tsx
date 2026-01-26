import { memo } from 'react';
import DesktopDateInput from 'src/components/DesktopDateInput/DesktopDateInput';
import Flex from 'src/components/Flex/flex';
import Input, { StyledInput } from 'src/components/Input/input';
import Select from 'src/components/Select/Select';
import { useMedia } from 'src/styles/useMedia';
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
    const { isDesktop } = useMedia();

    return (
        <StyledEditTaskContainer direction="column" rowGap="8px">
            <Input type="text" placeholder="Task Name" name="task-label" />
            <Input
                type="textarea"
                placeholder="Description of task"
                name="task-description"
            />
            <Select
                placeholder="Priority"
                options={['Critical', 'High', 'Medium', 'Low']}
            />

            <Flex columnGap="8px">
                {isDesktop ? (
                    <>
                        <DesktopDateInput label="Schedule Date" />
                        <DesktopDateInput label="Due Date" />
                    </>
                ) : (
                    <>
                        <Input
                            type="date"
                            placeholder="Schedule Date"
                            name="task-schedule-date"
                        />
                        <Input
                            type="date"
                            placeholder="Due Date"
                            name="task-due-date"
                        />
                    </>
                )}
            </Flex>
        </StyledEditTaskContainer>
    );
};

export default memo(EditTask);
