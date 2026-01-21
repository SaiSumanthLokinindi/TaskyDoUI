import { HTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export const StyledCard = styled.article(({ theme }) => {
    return css`
        width: 100%;
        box-sizing: border-box;
        padding: calc(2 * ${theme.spacing});
        background-color: #1c1c1c;
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

export interface CardProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className, ...restProps }: CardProps) => {
    return (
        <StyledCard {...restProps} className={className}>
            {children}
        </StyledCard>
    );
};

export default Card;
