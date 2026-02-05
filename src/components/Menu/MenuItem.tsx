import styled, { css } from 'styled-components';

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

export interface MenuItemProps {
    id: string;
    label: string;
    selected?: boolean;
    onSelect?: (id: MenuItemProps['id']) => void;
}

const MenuItem = ({ id, label, selected, onSelect }: MenuItemProps) => {
    return (
        <StyledMenuItem
            onClick={() => {
                onSelect?.(id);
            }}
        >
            {label}
        </StyledMenuItem>
    );
};

export default MenuItem;
