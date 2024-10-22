import styled, { css } from 'styled-components';
import { PropsWithoutRef, ReactNode, Ref, forwardRef } from 'react';

export interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'link';
    id?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onFocus?: () => void;
    progress?: boolean;
    type?: 'submit' | 'reset';
}

const StyledButton = styled.button<{
    $progress: ButtonProps['progress'];
    $variant: ButtonProps['variant'];
}>(({ $progress, $variant, theme }) => {
    const backgroundColor: string =
        $variant === 'link'
            ? 'transparent'
            : (theme.baseColors.tertiary as string);

    return css`
        appearance: none;
        position: relative;
        background-color: ${backgroundColor};
        border-radius: 4px;
        border: none;
        color: ${theme.text.primary};
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        outline: none;
        min-height: 2.5rem;
        min-width: 6rem;
        padding: 8px calc(3 * ${theme.spacing});

        &:hover {
            background-color: #1dbe45;
            cursor: pointer;
        }

        &:active {
            background-color: #169135;
        }

        &:focus-visible {
            outline: 2px solid ${theme.baseColors.tertiary};
            outline-offset: 2px;
        }

        &:disabled {
            background-color: #5d8b68;
            color: rgba(255, 255, 255, 0.65);
            cursor: default;
        }

        ${$variant === 'link' &&
        css`
            appearance: none;
            font-weight: bold;
            color: ${theme.baseColors.tertiary};
            text-decoration: none;
            padding: unset;
            border-radius: unset;
            border: unset;
            min-height: unset;
            min-width: unset;

            &:hover,
            &:focus-visible {
                background-color: transparent;
                border-bottom: 2px solid ${theme.baseColors.tertiary};
                margin-bottom: -2px;
                outline: none;
            }
        `}

        ${$progress &&
        $variant !== 'link' &&
        css`
            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -11.5px;
                margin-left: -11.5px;
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: 3px solid currentColor;
                border-top-color: transparent;
                animation: rotate 1s infinite linear;
            }

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(180deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `}
    `;
});

const Button = forwardRef(
    (
        {
            children,
            progress,
            variant = 'primary',
            ...restProps
        }: PropsWithoutRef<ButtonProps>,
        ref?: Ref<HTMLButtonElement>,
    ) => {
        return (
            <StyledButton
                ref={ref}
                {...restProps}
                $progress={progress}
                $variant={variant}
            >
                {!progress && children}
            </StyledButton>
        );
    },
);

export default Button;
