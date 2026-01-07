import { InputHTMLAttributes, memo } from 'react';
import styled, { css } from 'styled-components';

export const StyledCheckbox = styled.input(({ theme }) => {
    return css`
        height: 14px;
        width: 14px;
        flex-shrink: 0;
        cursor: pointer;
        accent-color: ${theme.baseColors.tertiary};
    `;
});

const Checkbox = memo((props: InputHTMLAttributes<HTMLInputElement>) => {
    return <StyledCheckbox type="checkbox" {...props} />;
});

export default Checkbox;
