export const Priority = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
};

export type Priority = (typeof Priority)[keyof typeof Priority];

export interface TaskProps {
    label: string;
    completed?: boolean;
    dueDate?: Date;
    priority?: Priority;
    animationDelay?: number;
}
