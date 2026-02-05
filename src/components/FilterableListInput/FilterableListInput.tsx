import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Input, { InputProps } from '../Input/input';
import Flex from '../Flex/flex';
import styled, { css } from 'styled-components';
import Dialog from '../Dialog/Dialog';
import MenuItem, { type MenuItemProps } from '../Menu/MenuItem';

export interface FilterableListProps extends InputProps {
    menuItems: MenuItemProps[];
}

export const StyledMenu = styled.ul(({ theme }) => {
    return css`
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0;
        padding: 0;
    `;
});

export const StyledDialog = styled(Dialog)<{ $maxWidth?: number }>`
    padding: 0;
    width: 50%;
    max-height: 300px;
    overflow: auto;
    max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : '100%')};
`;

const FilterableListInput = memo(
    ({ menuItems, value, ...restProps }: FilterableListProps) => {
        const inputRef = useRef<HTMLInputElement | null>(null);
        const [inputValue, setInputValue] = useState(value);
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        useEffect(() => {
            setInputValue(value ?? '');
        }, [value]);

        const menuItemSelectHandler = useCallback((id: MenuItemProps['id']) => {
            const menuItem = menuItems.find((item) => item.id === id);
            if (menuItem) {
                setInputValue(menuItem.label);
            }
            setIsMenuOpen(false);
        }, []);

        return (
            <Flex direction="column">
                <Input
                    {...restProps}
                    ref={inputRef}
                    onClick={() => {
                        setIsMenuOpen(true);
                    }}
                    value={inputValue}
                />
                <StyledDialog
                    anchor={inputRef.current}
                    isOpen={isMenuOpen}
                    onClose={() => {
                        setIsMenuOpen(false);
                    }}
                    $maxWidth={inputRef.current?.offsetWidth}
                >
                    <StyledMenu>
                        {menuItems.map((menuItem) => (
                            <MenuItem
                                key={menuItem.id}
                                {...menuItem}
                                onSelect={menuItemSelectHandler}
                            />
                        ))}
                    </StyledMenu>
                </StyledDialog>
            </Flex>
        );
    },
);

export default FilterableListInput;
