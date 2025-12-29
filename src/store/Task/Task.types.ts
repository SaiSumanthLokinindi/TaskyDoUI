export enum TaskPriority {
    CRITICAL = 'critical',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

export type Task = {
    id: string;
    label: string;
    description?: string;
    scheduleDate?: Date;
    dueDate?: Date;
    category?: string;
    priority?: TaskPriority;
    status: { completed: boolean; completedOn?: Date };
};
