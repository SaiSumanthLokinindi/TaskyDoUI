import { TaskPriority } from 'src/components/Task/Task.types';

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
    tags?: string[];
    priority?: TaskPriority;
    status?: { completed?: boolean; completedOn?: string };
};
