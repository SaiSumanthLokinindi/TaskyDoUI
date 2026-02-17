import {
    ChangeEvent,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import Input, { InputProps } from '../Input/input';
import Flex from '../Flex/flex';
import styled, { useTheme } from 'styled-components';
import Dialog from '../Dialog/Dialog';
import MenuItem, { type MenuItemProps } from '../Menu/MenuItem';
import Menu from '../Menu/Menu';
import Loader from '../Loader/Loader';

export interface FilterableListProps extends InputProps {
    menuItems: MenuItemProps[];
    /**
     * @default false
     */
    menuLoading?: boolean;
}

export const StyledDialog = styled(Dialog)<{ $maxWidth?: number }>`
    padding: 0;
    width: 50%;
    max-height: 300px;
    overflow: auto;
    max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : '100%')};
`;

const FilterableListInput = memo(
    ({
        menuItems,
        value,
        onChange,
        style,
        className,
        menuLoading = false,
        ...restProps
    }: FilterableListProps) => {
        const inputRef = useRef<HTMLInputElement | null>(null);
        const theme = useTheme();
        const [inputValue, setInputValue] = useState(value);
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        useEffect(() => {
            setInputValue(value ?? '');
        }, [value]);

        useEffect(() => {
            if (menuLoading || menuItems.length) {
                setIsMenuOpen(true);
            }
        }, [menuLoading, menuItems.length]);

        const menuItemSelectHandler = useCallback(
            (id: MenuItemProps['id']) => {
                const menuItem = menuItems.find((item) => item.id === id);
                if (menuItem) {
                    setInputValue(menuItem.label);
                    if (inputRef.current)
                        onChange?.({
                            target: inputRef.current,
                            currentTarget: inputRef.current,
                        } as ChangeEvent<HTMLInputElement>);
                }
                setIsMenuOpen(false);
            },
            [menuItems],
        );

        return (
            <Flex direction="column" style={style} className={className}>
                <Input
                    {...restProps}
                    ref={inputRef}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setInputValue(e.target.value);
                        onChange?.(e);
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
                    <Menu>
                        {menuItems.map((menuItem) => (
                            <MenuItem
                                key={menuItem.id}
                                {...menuItem}
                                onSelect={(id) => {
                                    menuItemSelectHandler(id);
                                    menuItem.onSelect?.(id);
                                }}
                            />
                        ))}
                        {menuLoading && (
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                style={{ padding: theme.spacing }}
                            >
                                <Loader />
                            </Flex>
                        )}
                    </Menu>
                </StyledDialog>
            </Flex>
        );
    },
);

export default FilterableListInput;
