import styled, { css } from 'styled-components';
import { PropsWithoutRef, ReactNode, Ref, forwardRef } from 'react';

const StyledButton = styled.button(({ theme }) => {
    return css`
        appearance: none;
        background-color: ${theme.baseColors.secondary};
        border-radius: 4px;
        border: none;
        box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.15);
        color: ${theme.text.primary};
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        outline: none;
        padding: 8px calc(3 * ${theme.spacing});

        &:hover {
            background-color: #26bc4c;
            box-shadow: 0 0 2px 6px rgba(0, 0, 0, 0.25);
            cursor: pointer;
        }

        &:active {
            background-color: #1b9339;
            box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.15);
        }

        &:focus-visible {
            outline: 2px solid ${theme.baseColors.secondary};
            outline-offset: 2px;
        }

        &:disabled {
            background-color: #5d8b68;
            color: rgba(255, 255, 255, 0.65);
            cursor: default;
        }
    `;
});

export interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    id?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onFocus?: () => void;
    type?: 'submit' | 'reset';
}

const Button = forwardRef(
    (
        { children, ...restProps }: PropsWithoutRef<ButtonProps>,
        ref?: Ref<HTMLButtonElement>,
    ) => {
        return (
            <StyledButton ref={ref} {...restProps}>
                {children}
            </StyledButton>
        );
    },
);

export default Button;
