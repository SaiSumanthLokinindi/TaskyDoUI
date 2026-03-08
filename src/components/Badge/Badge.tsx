import { memo } from 'react';
import { Intent } from 'src/types/base.types';
import styled, { css } from 'styled-components';

export const StyledBadge = styled.span<{ $type?: BadgeProps['type'] }>(
    ({ $type, theme }) => {
        return css`
            padding: calc(0.25 * ${theme.spacing}) ${theme.spacing};
            border-radius: calc(2 * ${theme.spacing});
            color:;
            ${theme.baseColors.default};
            background-color: ${theme.components.badge.colors.info};
            font-weight: 500;
            font-size: 0.675rem;

            ${$type === 'neutral' &&
            css`
                color: ${theme.baseColors.primary};
                background-color: ${theme.baseColors.neutral};
            `};
            ${$type === 'default' &&
            css`
                color: ${theme.baseColors.primary};
                background-color: ${theme.baseColors.default};
            `};
            ${$type === 'info' &&
            css`
                background-color: ${theme.baseColors.info};
            `}
            ${$type === 'success' &&
            css`
                background-color: ${theme.baseColors.success};
            `}
            ${$type === 'warning' &&
            css`
                background-color: ${theme.baseColors.warning};
            `}
            ${$type === 'danger' &&
            css`
                background-color: ${theme.baseColors.danger};
            `}
            ${$type === 'error' &&
            css`
                background-color: ${theme.baseColors.error};
            `};
        `;
    },
);

export interface BadgeProps {
    /**
     * @default 'info'
     */
    type?: Intent;
    label: string;
}

const Badge = memo(({ type = 'neutral', label }: BadgeProps) => {
    return <StyledBadge $type={type}>{label}</StyledBadge>;
});

export default Badge;
