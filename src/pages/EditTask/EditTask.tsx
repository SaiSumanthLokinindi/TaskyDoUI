import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import Button from 'src/components/Button/button';
import DesktopDateInput from 'src/components/DesktopDateInput/DesktopDateInput';
import FilterableListInput from 'src/components/FilterableListInput/FilterableListInput';
import Flex from 'src/components/Flex/flex';
import Input, { StyledInput } from 'src/components/Input/input';
import Select from 'src/components/Select/Select';
import Tag from 'src/components/Tag/Tag';
import Toggle from 'src/components/Toggle/Toggle';
import { useMedia } from 'src/styles/useMedia';
import styled, { css } from 'styled-components';
import axios from 'src/axios-instance/axios-instance';
import { MenuItemProps } from 'src/components/Menu/MenuItem';
import { debounce } from 'src/shared/utils';
import { useForm } from 'src/hooks/useForm';
import { fieldRequiredValidator } from 'src/utils/validators';

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

    const [tagSuggestions, setTagSuggestions] = useState<MenuItemProps[]>([]);
    const [tagsLoading, setTagsLoading] = useState(false);

    const {
        registerInput,
        deregisterInput,
        data: taskData,
        errors: taskErrors,
        setFieldValue,
        runValidators,
        resetError,
    } = useForm();

    useEffect(() => {
        registerInput('taskCompleted');
        registerInput('label', [fieldRequiredValidator('label')]);
        registerInput('taskDescription');
        registerInput('taskPriority');
        registerInput('scheduleDate');
        registerInput('dueDate');
        registerInput('tags');

        return () => {
            deregisterInput('taskCompleted');
            deregisterInput('label');
            deregisterInput('taskDescription');
            deregisterInput('taskPriority');
            deregisterInput('scheduleDate');
            deregisterInput('dueDate');
            deregisterInput('tags');
        };
    }, [registerInput, deregisterInput]);

    const tagsInputChangeHandler = useCallback(
        debounce((event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.value) {
                setTagSuggestions([]);
                return;
            }
            setTagsLoading(true);
            axios
                .get('/tags/suggest', {
                    params: {
                        q: event.target.value,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        const tags = res.data.map(
                            (tag: { label: string; id: string }) => {
                                return {
                                    id: tag.id,
                                    label: '#' + tag.label,
                                    selected: false,
                                };
                            },
                        );
                        console.log('tags', tags);
                        setTagSuggestions(tags);
                    }
                })
                .catch((err) => {})
                .finally(() => {
                    setTagsLoading(false);
                });
        }, 500),
        [],
    );

    const addTagHandler = useCallback(() => {
        console.log('tag Added');
    }, []);

    return (
        <StyledEditTaskContainer direction="column" rowGap="24px">
            <Toggle
                label="Mark Task as Completed"
                id="task-completed"
                checked={taskData.taskCompleted as boolean}
                onChange={(e) => {
                    setFieldValue('label', e.target.checked);
                }}
            />
            <Input
                type="text"
                placeholder="Title of task"
                name="task-label"
                label="Title"
                value={taskData.label as string}
                onChange={(e) => {
                    setFieldValue('label', e.target.value);
                }}
                info={
                    taskErrors.label?.length > 0 ? taskErrors.label : undefined
                }
                status={taskErrors.label?.length > 0 ? 'error' : undefined}
            />
            <Input
                type="textarea"
                placeholder="Add more details about this task"
                name="task-description"
                label="Description"
                value={taskData.taskDescription as string}
                onChange={(e) => {
                    setFieldValue('taskDescription', e.target.value);
                }}
            />
            <Select
                options={['Critical', 'High', 'Medium', 'Low']}
                label="Priority"
                placeholder="Select priority"
                value={taskData.taskPriority as string}
                onChange={(option) => {
                    setFieldValue('taskPriority', option);
                }}
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
                            value={taskData.scheduleDate as string}
                            onChange={(e) => {
                                setFieldValue('scheduleDate', e.target.value);
                            }}
                        />
                        <Input
                            type="date"
                            placeholder="Due Date"
                            name="task-due-date"
                            label="Due Date"
                            value={taskData.dueDate as string}
                            onChange={(e) => {
                                setFieldValue('scheduleDate', e.target.value);
                            }}
                        />
                    </>
                )}
            </Flex>
            <Flex alignItems="flex-end" columnGap="1rem">
                <FilterableListInput
                    type="text"
                    placeholder="Add tags"
                    name="task-tags"
                    label="Tags"
                    menuItems={tagSuggestions}
                    style={{ flexGrow: 1 }}
                    onChange={tagsInputChangeHandler}
                    menuLoading={tagsLoading}
                    actions={[
                        {
                            label: 'Add Tag',
                            onClick: addTagHandler,
                            variant: 'simple',
                        },
                    ]}
                />
            </Flex>
            <Flex columnGap="0.5rem">
                {taskData?.(tags as string[])?.map((tag) => (
                    <Tag key="tag" label={tag} />
                ))}
            </Flex>
        </StyledEditTaskContainer>
    );
};

export default memo(EditTask);
