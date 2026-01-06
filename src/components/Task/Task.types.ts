export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical',
}

export interface TaskProps {
    label: string;
    completed?: boolean;
    dueDate?: Date;
    priority?: Priority;
}
