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
    onSelect?: (menuItem: MenuItemProps) => void;
}

const MenuItem = (props: MenuItemProps) => {
    return (
        <StyledMenuItem
            onClick={function () {
                props.onSelect?.(props);
            }}
        >
            {props.label}
        </StyledMenuItem>
    );
};

export default MenuItem;
