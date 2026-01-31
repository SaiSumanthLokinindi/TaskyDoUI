import { memo, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import Flex from '../Flex/flex';
import { GrClose } from 'react-icons/gr';
import Button, { StyledButton } from '../Button/button';

export interface TagProps {
    label: string;
    onRemove?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export const StyledTag = styled(Flex)(({ theme }) => {
    return css`
        background-color: ${theme.baseColors.tertiary};
        color: ${theme.text.primary};
        padding: calc(0.5 * ${theme.spacing}) ${theme.spacing};
        border-radius: 16px;
        font-size: 0.825rem;
        font-weight: 500;

        ${StyledButton} {
            padding: calc(0.5 * ${theme.spacing});
            font-size: 0.625rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
    `;
});

const Tag = memo(({ label, onRemove, ...restProps }: TagProps) => {
    return (
        <StyledTag
            {...restProps}
            inline
            alignItems="center"
            columnGap={'0.25rem'}
        >
            <span>#{label}</span>
            <Button variant="simple" onClick={onRemove}>
                <GrClose />
            </Button>
        </StyledTag>
    );
});

export default Tag;
