export enum TaskPriority {
    CRITICAL = 'critical',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

export type TasksState = {
    tasks: TaskInfo[];
    loading: boolean;
    error?: string;
};

export type TaskInfo = {
    id: string;
    label: string;
    description?: string;
    scheduleDate?: Date;
    dueDate?: Date;
    category?: string;
    priority?: TaskPriority;
    status?: { completed?: boolean; completedOn?: Date };
};
