import { memo, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export const StyledMenu = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Menu = memo(({ children }: { children: ReactNode }) => {
    return <StyledMenu>{children}</StyledMenu>;
});

export default Menu;
