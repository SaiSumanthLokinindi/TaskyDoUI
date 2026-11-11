import styled, { css, keyframes, useTheme } from 'styled-components';
import Card from '../Card/card';
import Flex, { StyledFlex } from '../Flex/flex';
import Text from '../Text/Text';
import Badge from '../Badge/Badge';
import { TaskProps } from './Task.types';
import { useCallback, useMemo, MouseEvent, useState } from 'react';
import Checkbox, { StyledCheckbox } from '../Checkbox/Checkbox';
import { formatDueDate } from 'src/utils/dates';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { markTaskCompleted } from 'src/store/Task/TaskSlice';
import { deleteTask, updateTaskCompletion } from 'src/store/Task/TaskThunks';
import { PRIORITY_MAP, PRIORITY_STATE_MAP } from '../Priority/constants';
import Button, { StyledButton } from '../Button/button';
import { AiOutlineDelete } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

const slideUpFadeIn = keyframes`
    from {
        opacity: 0;
        translate: 0 12px;
    }
    to {
        opacity: 1;
        translate: 0 0;
    }
`;

const StyledTaskCard = styled(Card)<{
    $animationDelay?: number;
    $expanded: boolean;
}>(({ $animationDelay = 0, theme, $expanded = false }) => {
    return css`
        display: flex;
        flex-direction: column;
        padding: calc(1.5 * ${theme.spacing});
        border: 1.5px solid #393939;
        box-sizing: border-box;
        background: ${theme.baseColors.secondary};
        cursor: pointer;
        user-select: none;
        opacity: 0;
        transition:
            border-color 150ms ease,
            background-color 150ms ease,
            scale 150ms ease;
        animation: ${slideUpFadeIn} 0.33s ease-out forwards;
        animation-delay: ${$animationDelay}ms;

        &:hover {
            border-color: ${theme.baseColors.tertiary};
            background-color: #252525;
        }

        ${StyledCheckbox} {
            margin-block-start: 3px;
            margin-inline-start: 0;
        }

        &:active:not(:has(${StyledCheckbox}:active, ${StyledButton}:active)) {
            scale: 0.98;
        }

        & > ${StyledFlex}:first-child > ${StyledButton} {
            align-self: center;
            font-size: 1.125rem;
            padding: ${theme.spacing};

            ${!$expanded &&
            css`
                &:hover {
                    color: ${theme.baseColors.danger};
                }
            `}
        }

        @media (max-width: calc(${theme.breakpoints.md} - 1px)) {
            & > ${StyledFlex}:first-child > ${StyledButton} {
                height: 48px;
                width: 48px;
                flex-shrink: 0;
            }
        }
    `;
});

const StyledTaskLabel = styled.span<{ $completed?: boolean }>(
    ({ $completed }) => {
        return css`
            font-size: 0.85rem;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;

            ${$completed &&
            css`
                text-decoration: line-through;
                color: rgba(255, 255, 255, 0.6);
            `}
        `;
    },
);

const StyledDeleteControls = styled.div<{ $expanded: boolean }>(
    ({ $expanded = false }) => {
        return css`
            width: 100%;
            box-sizing: border-box;
            display: grid;
            grid-template-rows: ${$expanded ? '1fr' : '0fr'};
            transition: grid-template-rows 330ms ease;

            & > div {
                overflow: hidden;
            }
        `;
    },
);

const StyledDeleteContent = styled(Flex)<{ $expanded: boolean }>(({
    theme,
    $expanded = false,
}) => {
    return css`
        opacity: ${$expanded ? 1 : 0};
        transform: translateY(${$expanded ? '0' : '-8px'});
        margin-block-start: calc(1.5 * ${theme.spacing});

        transition:
            opacity 200ms ease,
            transform 200ms ease;
        transition-delay: ${$expanded ? '100ms' : '0ms'};

        & > ${StyledButton} {
            font-size: 0.8rem;
            flex-grow: 1;

            div {
                display: flex;
                align-items: center;
                column-gap: calc(0.5 * ${theme.spacing});

                svg {
                    font-size: 1.125rem;
                }
            }
        }
    `;
});

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
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const [showDeleteControls, setShowDeleteControls] = useState(false);

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

    const priorityMeta = useMemo(
        () => (priority ? PRIORITY_MAP[priority] : null),
        [priority],
    );

    const toggleDeleteControls = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setShowDeleteControls((prev) => !prev);
        },
        [],
    );

    const handleTaskDelete = useCallback(
        async (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            try {
                await dispatch(deleteTask(id)).unwrap();
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        },
        [dispatch, id],
    );

    return (
        <StyledTaskCard
            $animationDelay={animationDelay || 0}
            onClick={(e) => onClick?.(id, e)}
            tabIndex={0}
            $expanded={showDeleteControls}
        >
            <Flex
                columnGap={`calc(1.5 * ${theme.spacing})`}
                style={{
                    width: '100%',
                }}
            >
                <Checkbox
                    checked={completed || false}
                    onChange={handleTaskCompletionChange}
                    onClick={(e) => e.stopPropagation()}
                />
                <Flex
                    direction="column"
                    grow={1}
                    rowGap={
                        priorityMeta || dueDateInfo
                            ? `calc(0.75 * ${theme.spacing})`
                            : '0'
                    }
                >
                    <StyledTaskLabel $completed={completed || false}>
                        {label}
                    </StyledTaskLabel>

                    <Flex alignItems="center" columnGap={theme.spacing}>
                        {priorityMeta && priority && (
                            <Badge
                                type={PRIORITY_STATE_MAP[priority]}
                                label={priorityMeta.label}
                            />
                        )}
                        {dueDateInfo && (
                            <Text variant="helper">{dueDateInfo}</Text>
                        )}
                    </Flex>
                </Flex>
                <Button variant="simple" onClick={toggleDeleteControls}>
                    {showDeleteControls ? (
                        <ImCancelCircle />
                    ) : (
                        <AiOutlineDelete />
                    )}
                </Button>
            </Flex>
            <StyledDeleteControls $expanded={showDeleteControls}>
                <div>
                    <StyledDeleteContent
                        columnGap={theme.spacing}
                        $expanded={showDeleteControls}
                    >
                        <Button
                            variant="primary"
                            onClick={(e) => {
                                void handleTaskDelete(e);
                            }}
                        >
                            <AiOutlineDelete />
                            <span>Delete</span>
                        </Button>
                    </StyledDeleteContent>
                </div>
            </StyledDeleteControls>
        </StyledTaskCard>
    );
};

export default Task;
