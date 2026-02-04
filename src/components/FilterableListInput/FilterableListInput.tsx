import { memo, useRef, useState } from 'react';
import Input, { InputProps } from '../Input/input';
import Flex from '../Flex/flex';
import styled, { css } from 'styled-components';
import Dialog from '../Dialog/Dialog';

export interface FilterableListProps extends InputProps {}

export const StyledMenu = styled.ul(({ theme }) => {
    return css`
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0;
        padding: 0;
    `;
});

export const StyledMenuItem = styled.li(({ theme }) => {
    return css`
        padding: ${theme.spacing};
        border-bottom: 1px solid #393939;
        font-size: 0.825rem;
        border-radius: 4px;
        color: ${theme.baseColors.dimWhite};

        &:hover {
            background-color: ${theme.baseColors.secondaryHover};
            cursor: pointer;
        }
    `;
});

export const StyledDialog = styled(Dialog)`
    padding: 0;
    width: 50%;
`;

const FilterableListInput = memo((props: FilterableListProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Flex direction="column">
            <Input
                {...props}
                ref={inputRef}
                onClick={() => {
                    setIsMenuOpen(true);
                }}
            />
            <StyledDialog
                anchor={inputRef.current}
                isOpen={isMenuOpen}
                onClose={() => {
                    setIsMenuOpen(false);
                }}
            >
                <StyledMenu>
                    <StyledMenuItem>#work</StyledMenuItem>
                    <StyledMenuItem>#work</StyledMenuItem>
                    <StyledMenuItem>#work</StyledMenuItem>
                    <StyledMenuItem>#work</StyledMenuItem>
                </StyledMenu>
            </StyledDialog>
        </Flex>
    );
});

export default FilterableListInput;
