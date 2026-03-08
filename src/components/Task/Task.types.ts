import { TaskInfo } from 'src/store/Task/Task.types';
import { PriorityValue } from '../Priority/constants';

export interface TaskProps {
    id: TaskInfo['id'];
    label: TaskInfo['label'];
    completed?: boolean;
    dueDate?: TaskInfo['dueDate'];
    priority?: PriorityValue;
    animationDelay?: number;
    onClick?: (id: TaskInfo['id'], e?: React.MouseEvent<HTMLElement>) => void;
    onTaskCompletionChange?: (
        id: TaskInfo['id'],
        e?: React.ChangeEvent<HTMLInputElement>,
    ) => void;
}
