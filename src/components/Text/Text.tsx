import { FC, memo, PropsWithChildren, useState } from 'react';
import { BaseUIProps } from 'src/types/base.types';
import styled, { css, useTheme } from 'styled-components';
import Flex from '../Flex/flex';

export interface TextProps extends BaseUIProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'helper' | 'p';
    size?: 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'title';
    expandable?: boolean;
    linesToShow?: number;
}

const variantSet = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']);

const variantStyles = {
    h1: css`
        font-size: ${({ theme }) => theme.components.text.size.title};
        font-weight: 700;
    `,
    h2: css`
        font-size: ${({ theme }) => theme.components.text.size.xxxl};
        font-weight: 700;
    `,
    h3: css`
        font-size: ${({ theme }) => theme.components.text.size.xxl};
        font-weight: 700;
    `,
    h4: css`
        font-size: ${({ theme }) => theme.components.text.size.xl};
        font-weight: 700;
    `,
    h5: css`
        font-size: ${({ theme }) => theme.components.text.size.lg};
        font-weight: 700;
    `,
    h6: css`
        font-size: ${({ theme }) => theme.components.text.size.md};
        font-weight: 700;
    `,
    helper: css`
        font-size: ${({ theme }) => theme.components.text.size.xs};
        color: ${({ theme }) => theme.text.helperText.color};
        line-height: ${({ theme }) => theme.text.helperText.lineHeight};
    `,
};

export const StyledText = styled.span<{
    $variant?: TextProps['variant'];
    $size?: TextProps['size'];
    $expandable?: boolean;
    $isExpanded?: boolean;
    $isTransitioning?: boolean;
    $linesToShow?: number;
}>(
    ({
        $variant,
        $size: textSize = 'rg',
        $expandable,
        $isExpanded,
        $isTransitioning,
        $linesToShow = 3,
        theme,
    }) => {
        return css`
            font-size: ${theme.components.text.size[textSize]};
            margin: unset;
            color: ${theme.text.primary};

            ${$variant &&
            variantSet.has($variant) &&
            css`
                color: ${theme.text.heading};
            `}

            ${$variant && variantStyles[$variant as keyof typeof variantStyles]}

            ${$expandable &&
            css`
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                transition: max-height 1000ms ease;
                line-height: 1.5;

                ${$isExpanded
                    ? css`
                          -webkit-line-clamp: unset;
                          max-height: 1000px;
                      `
                    : css`
                          -webkit-line-clamp: ${$isTransitioning
                              ? 'unset'
                              : $linesToShow};
                          max-height: calc(${$linesToShow} * 1.5em);
                      `}
            `}
        `;
    },
);

export const StyledShowMoreButton = styled.span(({ theme }) => {
    return css`
        color: ${theme.text.helperText.color};
        cursor: pointer;
        font-size: 0.725rem;
        font-weight: 600;
        margin-top: 4px;
        display: block;

        &:hover {
            text-decoration: underline;
        }
    `;
});

const Text: FC<PropsWithChildren<TextProps>> = memo(
    ({
        children,
        variant,
        size = 'rg',
        expandable = false,
        linesToShow = 3,
        ...restProps
    }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const [isTransitioning, setIsTransitioning] = useState(false);
        const theme = useTheme();

        return (
            <Flex direction="column" rowGap={`calc(0.5 * ${theme.spacing})`}>
                <StyledText
                    {...restProps}
                    as={
                        variant && variantSet.has(variant) ? variant : undefined
                    }
                    $variant={variant}
                    $size={size}
                    $expandable={expandable}
                    $isExpanded={isExpanded}
                    $isTransitioning={isTransitioning}
                    $linesToShow={linesToShow}
                    onTransitionEnd={() => setIsTransitioning(false)}
                >
                    {children}
                </StyledText>
                {expandable && (
                    <StyledShowMoreButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsTransitioning(true);
                            setIsExpanded((prev) => !prev);
                        }}
                    >
                        {isExpanded ? 'Show Less' : 'View More'}
                    </StyledShowMoreButton>
                )}
            </Flex>
        );
    },
);

export default Text;
