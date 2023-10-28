import { ReactNode, Ref, PropsWithoutRef, forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface LinkProps {
    children: ReactNode;
    disabled?: boolean;
    href: string;
    id?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onFocus?: () => void;
}

export const StyledLink = styled.a(({ theme }) => {
    return css`
        appearance: none;
        font-weight: bold;
        color: ${theme.baseColors.secondary};
        text-decoration: none;
        outline: none;

        &:hover {
            cursor: pointer;
            border-bottom: 2px solid ${theme.baseColors.secondary};
            margin-bottom: -2px;
        }

        &:focus-visible {
            outline: 2px solid ${theme.baseColors.secondary};
            outline-offset: 4px;
        }
    `;
});

const Link = forwardRef(
    (
        { children, ...restProps }: PropsWithoutRef<LinkProps>,
        ref?: Ref<HTMLAnchorElement>,
    ) => {
        return (
            <StyledLink ref={ref} {...restProps}>
                {children}
            </StyledLink>
        );
    },
);

export default Link;
