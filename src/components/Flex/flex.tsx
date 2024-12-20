import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export const StyledFlex = styled.div<FlexProps>(
    ({
        inline,
        direction,
        alignItems,
        justifyContent,
        flexWrap,
        alignContent,
        gap,
        rowGap,
        columnGap,
        height,
        width,
    }) => {
        return css`
            display: ${inline ? 'inline-flex' : 'flex'};
            flex-direction: ${direction ?? 'row'};
            align-items: ${alignItems ?? 'stretch'};
            justify-content: ${justifyContent ?? 'flex-start'};
            flex-wrap: ${flexWrap ?? 'nowrap'};
            align-content: ${alignContent ?? 'normal'};
            gap: ${gap ?? 'normal'};
            row-gap: ${rowGap ?? 'normal'};
            column-gap: ${columnGap ?? 'normal'};
            ${height &&
            css`
                height: ${height};
            `}
            ${width &&
            css`
                width: ${width};
            `}
        `;
    },
);

interface FlexProps {
    inline?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'start'
        | 'end'
        | 'left'
        | 'right'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    alignContent?:
        | 'normal'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'start'
        | 'space-between'
        | 'space-around';
    gap?: string;
    rowGap?: string;
    columnGap?: string;
    children?: ReactNode;
    height?: string;
    width?: string;
}

const Flex = ({ children, ...restProps }: FlexProps) => {
    return <StyledFlex {...restProps}>{children}</StyledFlex>;
};

export default Flex;
