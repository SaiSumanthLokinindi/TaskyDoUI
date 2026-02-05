import { memo } from 'react';
import DesktopDateInput from 'src/components/DesktopDateInput/DesktopDateInput';
import FilterableListInput from 'src/components/FilterableListInput/FilterableListInput';
import Flex from 'src/components/Flex/flex';
import Input, { StyledInput } from 'src/components/Input/input';
import Select from 'src/components/Select/Select';
import Tag from 'src/components/Tag/Tag';
import Toggle from 'src/components/Toggle/Toggle';
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
        <StyledEditTaskContainer direction="column" rowGap="24px">
            <Toggle label="Mark Task as Completed" id="task-completed" />
            <Input
                type="text"
                placeholder="Title of task"
                name="task-label"
                label="Title"
            />
            <Input
                type="textarea"
                placeholder="Add more details about this task"
                name="task-description"
                label="Description"
            />
            <Select
                options={['Critical', 'High', 'Medium', 'Low']}
                label="Priority"
                placeholder="Select priority"
            />

            <Flex columnGap="8px">
                {isDesktop ? (
                    <>
                        <DesktopDateInput
                            placeholder="DD-MMM-YYYY"
                            label="Schedule Date"
                        />
                        <DesktopDateInput
                            placeholder="DD-MMM-YYYY"
                            label="Due Date"
                        />
                    </>
                ) : (
                    <>
                        <Input
                            type="date"
                            placeholder="Schedule Date"
                            name="task-schedule-date"
                            label="Schedule Date"
                        />
                        <Input
                            type="date"
                            placeholder="Due Date"
                            name="task-due-date"
                            label="Due Date"
                        />
                    </>
                )}
            </Flex>
            <FilterableListInput
                type="text"
                placeholder="Add tags"
                name="task-tags"
                label="Tags"
                menuItems={[{ id: 'work', label: '#work' }]}
                onChange={(event) => {
                    console.log(event.target.value);
                }}
            />
            <Flex columnGap="0.5rem">
                <Tag label="work" />
                <Tag label="shopping" />
                <Tag label="office" />
            </Flex>
        </StyledEditTaskContainer>
    );
};

export default memo(EditTask);
