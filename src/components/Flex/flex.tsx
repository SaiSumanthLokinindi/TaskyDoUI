import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import styled, { css } from 'styled-components';

export const StyledFlex = styled.div<{
    $inline?: boolean;
    $direction?: FlexProps['direction'];
    $alignItems?: FlexProps['alignItems'];
    $justifyContent?: FlexProps['justifyContent'];
    $flexWrap?: FlexProps['flexWrap'];
    $alignContent?: FlexProps['alignContent'];
    $gap?: string;
    $rowGap?: string;
    $columnGap?: string;
    $height?: string;
    $width?: string;
    $grow?: number;
    $shrink?: number;
}>(
    ({
        $inline,
        $direction,
        $alignItems,
        $justifyContent,
        $flexWrap,
        $alignContent,
        $gap,
        $rowGap,
        $columnGap,
        $height,
        $width,
        $grow,
        $shrink,
    }) => {
        return css`
            display: ${$inline ? 'inline-flex' : 'flex'};
            flex-direction: ${$direction ?? 'row'};
            align-items: ${$alignItems ?? 'stretch'};
            justify-content: ${$justifyContent ?? 'flex-start'};
            flex-wrap: ${$flexWrap ?? 'nowrap'};
            align-content: ${$alignContent ?? 'normal'};
            ${$gap !== undefined &&
            css`
                gap: ${$gap};
            `}

            ${$rowGap !== undefined &&
            css`
                row-gap: ${$rowGap};
            `}

            ${$columnGap !== undefined &&
            css`
                column-gap: ${$columnGap};
            `}
            ${$height &&
            css`
                height: ${$height};
            `}
            ${$width &&
            css`
                width: ${$width};
            `}
            ${$grow !== undefined &&
            css`
                flex-grow: ${$grow};
            `}
            ${$shrink !== undefined &&
            css`
                flex-shrink: ${$shrink};
            `}
        `;
    },
);

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
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
    grow?: number;
    shrink?: number;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
    (
        {
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
            grow,
            shrink,
            children,
            ...restProps
        },
        ref,
    ) => {
        return (
            <StyledFlex
                ref={ref}
                $inline={inline}
                $direction={direction}
                $alignItems={alignItems}
                $justifyContent={justifyContent}
                $flexWrap={flexWrap}
                $alignContent={alignContent}
                $gap={gap}
                $rowGap={rowGap}
                $columnGap={columnGap}
                $height={height}
                $width={width}
                $grow={grow}
                $shrink={shrink}
                {...restProps}
            >
                {children}
            </StyledFlex>
        );
    },
);

export default Flex;
