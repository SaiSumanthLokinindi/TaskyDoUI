export enum TaskPriority {
    CRITICAL = 'critical',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

export type TasksState = {
    entities: Record<TaskInfo['id'], TaskInfo>;
    ids: TaskInfo['id'][];
    taskCompletionRequests: Record<string, string>;

    myDayState: {
        loading: boolean;
        error?: string;
    };
    upcomingState: {
        loading: boolean;
        error?: string;
    };
    overdueState: {
        loading: boolean;
        error?: string;
    };
};

export type TaskInfo = {
    id: string;
    label: string;
    description?: string;
    scheduleDate?: string;
    dueDate?: string;
    category?: string;
    priority?: TaskPriority;
    status?: { completed?: boolean; completedOn?: string };
};
