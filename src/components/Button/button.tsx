import styled, { css } from 'styled-components';
import {
    ButtonHTMLAttributes,
    PropsWithoutRef,
    ReactNode,
    Ref,
    forwardRef,
} from 'react';
import Loader, { StyledLoader } from '../Loader/Loader';
import Flex from '../Flex/flex';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'link' | 'basic' | 'simple';
    progress?: boolean;
}

export const StyledButtonChildren = styled(Flex)``;

export const StyledButton = styled.button<{
    $progress: ButtonProps['progress'];
    $variant: ButtonProps['variant'];
}>(({ $progress, $variant, theme }) => {
    let backgroundColor: string = theme.baseColors.tertiary;
    let color: string = theme.text.primary;

    switch ($variant) {
        case 'primary':
            backgroundColor = theme.baseColors.tertiary;
            break;
        case 'secondary':
            backgroundColor = theme.baseColors.secondary;
            color = theme.baseColors.tertiary;
            break;
        case 'link':
            backgroundColor = 'transparent';
            break;
        default:
            backgroundColor = theme.baseColors.tertiary;
    }

    return css`
        appearance: none;
        position: relative;
        background: ${backgroundColor};
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: ${color};
        font-size: 0.9rem;
        font-weight: 500;
        white-space: nowrap;
        outline: none;
        padding: 10px calc(3 * ${theme.spacing});
        transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        display: flex;
        column-gap: ${theme.spacing};
        align-items: center;

        &:hover {
            filter: brightness(1.1);
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        &:active {
            transform: scale(0.98);
        }

        &:focus-visible {
            outline: none;
            box-shadow:
                0 0 0 2px ${theme.baseColors.primary},
                0 0 0 4px ${theme.baseColors.tertiary},
                0 0 16px 4px rgba(30, 169, 65, 0.3);
        }

        &:disabled {
            background: #5d8b68;
            opacity: 0.6;
            color: rgba(255, 255, 255, 0.65);
            cursor: default;
            box-shadow: none;
            pointer-events: none;
        }

        ${$variant === 'primary' &&
        css`
            background: linear-gradient(
                145deg,
                ${theme.baseColors.tertiary},
                ${theme.baseColors.clicked}
            );
            box-shadow: 0 4px 14px rgba(30, 169, 65, 0.3);
            border-color: rgba(255, 255, 255, 0.2);

            &:hover {
                box-shadow: 0 6px 20px rgba(30, 169, 65, 0.4);
            }
        `}

        ${$variant === 'basic' &&
        css`
            background: rgba(67, 66, 66, 0.7);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: white;

            &:hover {
                background: rgba(87, 86, 86, 0.8);
            }

            &:focus-visible {
                outline: 2px solid #ababab;
                outline-offset: 2px;
                box-shadow:
                    0 0 0 2px ${theme.baseColors.primary},
                    0 0 0 4px #ababab,
                    0 0 16px 4px rgba(255, 255, 255, 0.2);
            }

            &:disabled {
                background: rgba(43, 43, 43, 0.5);
                color: rgba(255, 255, 255, 0.25);
            }
        `}

        ${$variant === 'simple' &&
        css`
            background: transparent;
            border: none;
            box-shadow: none;
            color: ${theme.text.secondary};
            font-weight: bold;

            &:hover {
                background: ${theme.baseColors.secondaryHover};
            }

            &:disabled {
                background: transparent;
                opacity: 0.5;
            }
        `}

        ${$variant === 'link' &&
        css`
            appearance: none;
            background: transparent;
            border: none;
            box-shadow: none;
            font-weight: bold;
            color: ${theme.baseColors.tertiary};
            text-decoration: none;
            padding: unset;
            border-radius: unset;

            &:hover,
            &:focus-visible {
                filter: none;
                background-color: transparent;
                border-bottom: 2px solid ${theme.baseColors.tertiary};
                margin-bottom: -2px;
                outline: none;
                box-shadow: none;
            }
        `}

        ${$variant === 'secondary' &&
        css`
            background: rgba(30, 169, 65, 0.05);
            border: 1.75px solid ${theme.baseColors.tertiary};
            color: ${theme.baseColors.tertiary};

            &:hover {
                background: rgba(30, 169, 65, 0.1);
            }
        `}

        ${$progress &&
        css`
            pointer-events: none;

            & > ${StyledButtonChildren} {
                opacity: 0.7;
            }
        `}

        ${StyledLoader} {
            height: 0.625rem;
            width: 0.625rem;
            border-width: 2px;
        }
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
                <StyledButtonChildren>{children}</StyledButtonChildren>

                {progress && <Loader />}
            </StyledButton>
        );
    },
);

export default Button;
