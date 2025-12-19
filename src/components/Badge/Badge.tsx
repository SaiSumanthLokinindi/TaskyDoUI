import { memo } from 'react';
import Text from '../Text/Text';
import styled, { css } from 'styled-components';

export const StyledBadge = styled.span<Pick<BadgeProps, 'type'>>(
    ({ type, theme }) => {
        return css`
            padding: calc(0.25 * ${theme.spacing}) ${theme.spacing};
            border-radius: calc(2 * ${theme.spacing});
            color: ${theme.text.primary};
            background-color: ${theme.components.badge.colors.info};
            font-weight: 500;
            font-size: 0.675rem;

            ${type === 'info' &&
            css`
                color: black;
            `}
            ${type === 'success' &&
            css`
                background-color: ${theme.baseColors.success};
            `}
            ${type === 'warning' &&
            css`
                background-color: ${theme.baseColors.warning};
            `}
            ${type === 'error' &&
            css`
                background-color: ${theme.baseColors.danger};
            `}
            ${type === 'high' &&
            css`
                background-color: ${theme.components.badge.colors.high};
            `};
        `;
    },
);

export interface BadgeProps {
    /**
     * @default 'info'
     */
    type?: 'info' | 'success' | 'warning' | 'error' | 'high';
    label: string;
}

const Badge = memo(({ type = 'info', label }: BadgeProps) => {
    return <StyledBadge type={type}>{label}</StyledBadge>;
});

export default Badge;
