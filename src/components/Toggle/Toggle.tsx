import { HTMLAttributes, InputHTMLAttributes, memo } from 'react';
import Flex from 'src/components/Flex/flex';
import { BaseUIProps } from 'src/types/base.types';
import styled, { css } from 'styled-components';

const StyledToggleFormField = styled(Flex)(({ theme: { spacing } }) => {
    return css`
        font-size: 0.825rem;
    `;
});

const StyledToggle = styled.input(({ theme }) => {
    return css`
        appearance: none;
        width: 2.8rem;
        height: 1.5rem;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.05);
        cursor: pointer;
        position: relative;
        transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);

        &::before {
            content: '';
            position: absolute;
            top: 0.125rem;
            left: 0.125rem;
            width: 1.15rem;
            height: 1.15rem;
            border-radius: 50%;
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
            box-shadow:
                0 2px 4px rgba(0, 0, 0, 0.3),
                0 1px 2px rgba(0, 0, 0, 0.2);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        &:focus-visible {
            outline: none;
            box-shadow:
                inset 0 2px 4px rgba(0, 0, 0, 0.2),
                0 0 0 1px ${theme.baseColors.tertiary},
                0 0 12px 2px rgba(30, 169, 65, 0.3);
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }

        &:checked {
            background-color: ${theme.baseColors.tertiary};
            border-color: rgba(255, 255, 255, 0.1);
        }

        &:checked::before {
            transform: translateX(1.3rem);
            background: #ffffff;
        }

        &:checked:hover {
            filter: brightness(1.1);
        }

        &:active::before {
            width: 1.3rem; /* Squash effect on click */
        }
    `;
});

export interface ToggleProps
    extends BaseUIProps<
        HTMLInputElement,
        InputHTMLAttributes<HTMLInputElement>
    > {
    label?: string;
}

const Toggle = memo(({ label, ...restProps }: ToggleProps) => {
    return (
        <StyledToggleFormField
            alignItems="center"
            justifyContent="space-between"
        >
            {label && <label htmlFor={restProps.id}>{label}</label>}
            <StyledToggle {...restProps} type="checkbox" />
        </StyledToggleFormField>
    );
});

export default Toggle;
