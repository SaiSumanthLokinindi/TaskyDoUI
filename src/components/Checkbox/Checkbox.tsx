import { InputHTMLAttributes, memo } from 'react';
import styled, { css } from 'styled-components';

export const StyledCheckbox = styled.input(
    ({
        theme: {
            baseColors: { tertiary },
            text: {
                helperText: { color },
            },
        },
    }) => {
        return css`
            height: 16px;
            width: 16px;
            flex-shrink: 0;
            cursor: pointer;

            /* reset native styles so we can control background + border */
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            accent-color: ${tertiary};
            background-color: transparent;
            border: 1.5px solid #8d8d8d5c;
            border-radius: 4px;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: 4px;
                height: 8px;
                border: solid #8d8d8d5c;
                border-width: 0 2px 2px 0;
                transform: translate(-50%, calc(-50% - 1.5px)) rotate(45deg);
            }

            &:checked {
                background-color: ${tertiary};
                border-color: ${tertiary};
            }

            &:checked::after {
                border-color: white;
            }
        `;
    },
);

const Checkbox = memo((props: InputHTMLAttributes<HTMLInputElement>) => {
    return <StyledCheckbox type="checkbox" {...props} />;
});

export default Checkbox;
