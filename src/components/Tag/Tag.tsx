import { memo, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import Flex from '../Flex/flex';
import { GrClose } from 'react-icons/gr';
import Button, { StyledButton } from '../Button/button';

export interface TagProps {
    id: string;
    label: string;
    onRemove?: (id: TagProps['id'], e?: MouseEvent<HTMLButtonElement>) => void;
}

export const StyledTag = styled(Flex)(({ theme }) => {
    return css`
        background-color: #393939;
        color: ${theme.baseColors.dimWhite};
        padding: calc(0.5 * ${theme.spacing}) ${theme.spacing};
        border-radius: 16px;
        line-height: 1.45;
        font-size: 0.8rem;
        font-weight: 500;
        padding-inline-end: calc(0.5 * ${theme.spacing});

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

const Tag = memo(({ id, label, onRemove, ...restProps }: TagProps) => {
    return (
        <StyledTag
            {...restProps}
            id={id}
            inline
            alignItems="center"
            columnGap={'0.25rem'}
        >
            <span>#{label}</span>
            <Button
                variant="simple"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    onRemove?.(id, e);
                }}
            >
                <GrClose />
            </Button>
        </StyledTag>
    );
});

export default Tag;
