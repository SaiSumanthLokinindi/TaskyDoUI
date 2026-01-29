import { TaskInfo } from 'src/store/Task/Task.types';

/**
 * 0: No priority
 * 1: Low priority
 * 2: Medium priority
 * 3: High priority
 * 4: Critical priority
 */
export type TaskPriority = 0 | 1 | 2 | 3 | 4;

export interface TaskProps {
    id: TaskInfo['id'];
    label: TaskInfo['label'];
    completed?: boolean;
    dueDate?: TaskInfo['dueDate'];
    /**
     * @default 0
     * 0: No priority
     * 1: Low priority
     * 2: Medium priority
     * 3: High priority
     * 4: Critical priority
     */
    priority?: TaskPriority;
    animationDelay?: number;
    onClick?: (id: TaskInfo['id'], e?: React.MouseEvent<HTMLElement>) => void;
    onTaskCompletionChange?: (
        id: TaskInfo['id'],
        e?: React.ChangeEvent<HTMLInputElement>,
    ) => void;
}
