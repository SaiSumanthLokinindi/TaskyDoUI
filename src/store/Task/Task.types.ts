import { PriorityValue } from 'src/components/Priority/constants';

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
    recentlyCompletedState:{
        loading: boolean;
        error?: string;
    }
    taskDeleteState: Record<TaskInfo['id'], {loading: boolean;task?: TaskInfo}>
};

export type TaskInfo = {
    id: string;
    label: string;
    description?: string;
    scheduleDate?: string;
    dueDate?: string;
    tags?: string[];
    priority?: PriorityValue;
    status?: { completed?: boolean; completedOn?: string };
};
