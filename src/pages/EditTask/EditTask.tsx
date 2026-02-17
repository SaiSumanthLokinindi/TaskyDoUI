import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import DesktopDateInput from 'src/components/DesktopDateInput/DesktopDateInput';
import FilterableListInput from 'src/components/FilterableListInput/FilterableListInput';
import Flex from 'src/components/Flex/flex';
import Input, { StyledInput } from 'src/components/Input/input';
import Select from 'src/components/Select/Select';
import Tag, { TagProps } from 'src/components/Tag/Tag';
import Toggle from 'src/components/Toggle/Toggle';
import { useMedia } from 'src/styles/useMedia';
import styled, { css } from 'styled-components';
import axios from 'src/axios-instance/axios-instance';
import { MenuItemProps } from 'src/components/Menu/MenuItem';
import { debounce } from 'src/shared/utils';
import { useForm } from 'src/hooks/useForm';
import { fieldRequiredValidator } from 'src/utils/validators';
import { useModal } from 'src/components/Modal/ModalContext';

const StyledEditTaskContainer = styled.form(({ theme: { spacing } }) => {
    return css`
        width: 100%;
        & > *:not(:first-child) ${StyledInput} {
            font-size: 0.825rem;
        }

        display: flex;
        flex-direction: column;
        row-gap: calc(3 * ${spacing});
    `;
});

const EditTask = () => {
    const { isDesktop } = useMedia();
    const { setActions } = useModal();

    const [tagInputValue, setTagInputValue] = useState('');
    const [tagSuggestions, setTagSuggestions] = useState<MenuItemProps[]>([]);
    const [tagsLoading, setTagsLoading] = useState(false);

    const {
        registerInput,
        deregisterInput,
        data: taskData,
        errors: taskErrors,
        setFieldValue,
        runFieldValidators,
        resetFieldError,
    } = useForm();

    useEffect(() => {
        registerInput({ name: 'taskCompleted', validators: [] });
        registerInput({
            name: 'label',
            validators: [fieldRequiredValidator('label')],
        });
        registerInput({ name: 'taskDescription', validators: [] });
        registerInput({ name: 'taskPriority', validators: [] });
        registerInput({ name: 'scheduleDate', validators: [] });
        registerInput({ name: 'dueDate', validators: [] });
        registerInput({ name: 'tags', defaultValue: [], validators: [] });

        return () => {
            deregisterInput(
                'taskCompleted',
                'label',
                'taskDescription',
                'taskPriority',
                'scheduleDate',
                'dueDate',
                'tags',
            );
        };
    }, [registerInput, deregisterInput]);

    const submitTaskData = useCallback(() => {
        console.log('submitted task data');
    }, []);

    useEffect(() => {
        setActions([
            {
                label: 'Add Task',
                onClick: submitTaskData,
                variant: 'primary',
            },
        ]);
    }, [setActions, submitTaskData]);

    useEffect(() => {
        console.log('taskData', taskData);
    }, [taskData]);

    const fetchTagSuggestions = useCallback(
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
        if (tagInputValue) {
            setFieldValue('tags', [
                ...(taskData.tags as string[]),
                tagInputValue,
            ]);
        }
    }, [taskData.tags, tagInputValue, setFieldValue]);

    const removeTagHandler = useCallback(
        (id: TagProps['id']) => {
            setFieldValue(
                'tags',
                (taskData.tags as string[])?.filter((tag) => tag !== id),
            );
        },
        [setFieldValue, taskData.tags],
    );

    return (
        <StyledEditTaskContainer
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <Toggle
                label="Mark task as completed"
                id="task-completed"
                checked={taskData.taskCompleted as boolean}
                onChange={(e) => {
                    setFieldValue('taskCompleted', e.target.checked);
                }}
            />
            <Input
                type="text"
                placeholder="Title of task"
                name="task-label"
                label="Title"
                value={taskData.label as string}
                onChange={(e) => {
                    resetFieldError('label');
                    setFieldValue('label', e.target.value);
                }}
                onBlur={() => {
                    runFieldValidators('label');
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
                    resetFieldError('taskDescription');
                    setFieldValue('taskDescription', e.target.value);
                }}
                onBlur={() => {
                    runFieldValidators('taskDescription');
                }}
                info={
                    taskErrors.taskDescription?.length > 0
                        ? taskErrors.taskDescription
                        : undefined
                }
                status={
                    taskErrors.taskDescription?.length > 0 ? 'error' : undefined
                }
            />
            <Select
                options={['Critical', 'High', 'Medium', 'Low']}
                label="Priority"
                name="taskPriority"
                placeholder="Select priority"
                value={taskData.taskPriority as string}
                onChange={(e) => {
                    resetFieldError('taskPriority');
                    setFieldValue('taskPriority', e.target.value);
                }}
                onBlur={() => {
                    runFieldValidators('taskPriority');
                }}
                info={
                    taskErrors.taskPriority?.length > 0
                        ? taskErrors.taskPriority
                        : undefined
                }
                status={
                    taskErrors.taskPriority?.length > 0 ? 'error' : undefined
                }
            />

            <Flex columnGap="8px">
                {isDesktop ? (
                    <>
                        <DesktopDateInput
                            placeholder="DD-MMM-YYYY"
                            label="Schedule Date"
                            name="scheduleDate"
                            onChange={(e) => {
                                resetFieldError('scheduleDate');
                                setFieldValue('scheduleDate', e.target.value);
                            }}
                            onBlur={() => {
                                runFieldValidators('scheduleDate');
                            }}
                            info={
                                taskErrors.scheduleDate?.length > 0
                                    ? taskErrors.scheduleDate
                                    : undefined
                            }
                            status={
                                taskErrors.scheduleDate?.length > 0
                                    ? 'error'
                                    : undefined
                            }
                        />
                        <DesktopDateInput
                            placeholder="DD-MMM-YYYY"
                            label="Due Date"
                            name="dueDate"
                            onChange={(e) => {
                                resetFieldError('dueDate');
                                setFieldValue('dueDate', e.target.value);
                            }}
                            onBlur={() => {
                                runFieldValidators('dueDate');
                            }}
                            info={
                                taskErrors.dueDate?.length > 0
                                    ? taskErrors.dueDate
                                    : undefined
                            }
                            status={
                                taskErrors.dueDate?.length > 0
                                    ? 'error'
                                    : undefined
                            }
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
                    value={tagInputValue}
                    menuItems={tagSuggestions}
                    style={{ flexGrow: 1 }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setTagInputValue(event.target.value);
                        fetchTagSuggestions(event);
                    }}
                    menuLoading={tagsLoading}
                    actions={[
                        {
                            label: 'Add Tag',
                            onClick: addTagHandler,
                            variant: 'simple',
                            type: 'button',
                        },
                    ]}
                />
            </Flex>
            <Flex columnGap="0.5rem">
                {(taskData?.tags as string[])?.map((tag) => (
                    <Tag
                        id={tag}
                        key={tag}
                        label={tag}
                        onRemove={removeTagHandler}
                    />
                ))}
            </Flex>
        </StyledEditTaskContainer>
    );
};

export default memo(EditTask);
