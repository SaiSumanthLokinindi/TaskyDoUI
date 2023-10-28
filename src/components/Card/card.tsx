import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const StyledCard = styled.article(({ theme }) => {
    return css`
        padding: calc(3 * ${theme.spacing});
        background-color: #1e1e1e;
        /* box-shadow:
            0px 0px 2.2px rgba(0, 0, 0, 0.027),
            0px 0px 5.3px rgba(0, 0, 0, 0.043),
            0px 0px 10px rgba(0, 0, 0, 0.056),
            0px 0px 17.9px rgba(0, 0, 0, 0.068),
            0px 0px 33.4px rgba(0, 0, 0, 0.084),
            0px 0px 80px rgba(0, 0, 0, 0.12); */
        border-radius: 8px;
    `;
});

export interface CardProps {
    children: ReactNode;
}

const Card = ({ children }: CardProps) => {
    return <StyledCard>{children}</StyledCard>;
};

export default Card;
