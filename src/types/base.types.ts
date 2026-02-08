import { HTMLAttributes } from 'react';

/**
 * Custom company-specific properties that should exist
 * on EVERY component in the design system.
 */
export interface BaseCustomProps {
    /** Testing identifier for automated tests */
    'data-testid'?: string;

    /** Tracking identifier for analytics */
    'data-analytics-id'?: string;

    /** Manual visibility toggle */
    hidden?: boolean;
}

/**
 * The Master Contract for all UI components.
 *
 * @template T The HTML element type (e.g., HTMLDivElement)
 * @template A Additional attributes to include (defaults to HTMLAttributes<T>)
 */
export type BaseUIProps<
    T = HTMLElement,
    A = HTMLAttributes<T>,
> = BaseCustomProps & A;
