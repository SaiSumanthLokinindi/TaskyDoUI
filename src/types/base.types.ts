/**
 * The "Custom Contract" for all UI components in the design system.
 * This interface contains ONLY company-specific properties that we want
 * to exist on every component.
 */
export interface BaseCustomProps {
    /**
     * Optional testing identifier for automated tests (Cypress/Jest/Playwright)
     */
    'data-testid'?: string;

    /**
     * Optional tracking identifier for analytics.
     */
    'data-analytics-id'?: string;

    /**
     * Optional toggle for visibility without removing from DOM
     */
    hidden?: boolean;
}
