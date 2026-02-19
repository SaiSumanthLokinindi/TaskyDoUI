import { BadgeProps } from '../Badge/Badge';
import { TaskPriority } from './Task.types';

export const PRIORITY_OPTIONS = [
    { value: 1, label: 'Low', type: 'success' },
    { value: 2, label: 'Medium', type: 'warning' },
    { value: 3, label: 'High', type: 'high' },
    { value: 4, label: 'Critical', type: 'error' },
] as const;

export const PRIORITY_CONFIG: Record<
    Exclude<TaskPriority, 0>,
    { label: string; type: BadgeProps['type'] }
> = PRIORITY_OPTIONS.reduce(
    (acc, { value, label, type }) => {
        acc[value as Exclude<TaskPriority, 0>] = { label, type };
        return acc;
    },
    {} as Record<
        Exclude<TaskPriority, 0>,
        { label: string; type: BadgeProps['type'] }
    >,
);

export const PRIORITY_LABEL_MAP = PRIORITY_OPTIONS.reduce(
    (acc, { label, value }) => {
        acc[label] = value as Exclude<TaskPriority, 0>;
        return acc;
    },
    {} as Record<string, Exclude<TaskPriority, 0>>,
);
