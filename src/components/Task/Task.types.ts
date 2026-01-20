import { TaskInfo } from 'src/store/Task/Task.types';

export const Priority = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
};

export type Priority = (typeof Priority)[keyof typeof Priority];

export interface TaskProps {
    id: TaskInfo['id'];
    label: TaskInfo['label'];
    completed?: boolean;
    dueDate?: TaskInfo['dueDate'];
    priority?: string;
    animationDelay?: number;
    onClick?: (
        id: TaskInfo['id'],
        e?: React.MouseEvent<HTMLDivElement>,
    ) => void;
    onTaskCompletionChange?: (
        id: TaskInfo['id'],
        e?: React.ChangeEvent<HTMLInputElement>,
    ) => void;
}
