import { Intent } from 'src/types/base.types';

export const PRIORITY_LEVELS = [0, 1, 2, 3, 4] as const;
export const PRIORITY_LABELS = [
    'General',
    'Low',
    'Medium',
    'High',
    'Critical',
] as const;

export type PriorityValue = (typeof PRIORITY_LEVELS)[number];
export type PriorityLabel = (typeof PRIORITY_LABELS)[number];

export interface PriorityMeta {
    value: PriorityValue;
    label: PriorityLabel;
    colorCode: string;
}

export const PRIORITY_MAP: Record<PriorityValue, PriorityMeta> = {
    0: { value: 0, label: 'General', colorCode: 'general' },
    1: { value: 1, label: 'Low', colorCode: 'low' },
    2: { value: 2, label: 'Medium', colorCode: 'medium' },
    3: { value: 3, label: 'High', colorCode: 'high' },
    4: { value: 4, label: 'Critical', colorCode: 'critical' },
};

export const PRIORITY_LABEL_MAP = Object.fromEntries(
    Object.values(PRIORITY_MAP).map((entry) => [entry.label, entry.value]),
) as Record<PriorityLabel, PriorityValue>;

export const PRIORITY_STATE_MAP: Record<PriorityValue, Intent> = {
    0: 'neutral',
    1: 'success',
    2: 'warning',
    3: 'danger',
    4: 'error',
};
