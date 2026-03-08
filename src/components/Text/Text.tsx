import {
    FC,
    memo,
    PropsWithChildren,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
    CSSProperties,
} from 'react';
import { BaseUIProps } from 'src/types/base.types';
import styled, { css, useTheme } from 'styled-components';
import Flex from '../Flex/flex';

export interface TextProps extends BaseUIProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'helper' | 'p';
    size?:
        | 'xxs'
        | 'xs'
        | 'sm'
        | 'rg'
        | 'md'
        | 'lg'
        | 'xl'
        | 'xxl'
        | 'xxxl'
        | 'title';
    expandable?: boolean;
    linesToShow?: number;
    lineHeight?: number;
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
    $lineHeight?: number;
}>(
    ({
        $variant,
        $size: textSize = 'rg',
        $expandable,
        $isExpanded,
        $isTransitioning,
        $linesToShow = 3,
        $lineHeight = 1.5,
        theme,
    }) => {
        return css`
            font-size: ${theme.components.text.size[textSize]};
            margin: unset;
            color: ${theme.text.primary};
            line-height: ${$lineHeight};

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
                transition: max-height 330ms ease;
                line-height: ${$lineHeight};

                ${$isExpanded
                    ? css`
                          -webkit-line-clamp: unset;
                          max-height: calc(var(--text-height) + 10px);
                      `
                    : css`
                          -webkit-line-clamp: ${$isTransitioning
                              ? 'unset'
                              : $linesToShow};
                          max-height: calc(
                              ${$linesToShow} * ${$lineHeight} * 1em
                          );
                      `}
            `}
        `;
    },
);

export const StyledShowMoreButton = styled.span(({ theme }) => {
    return css`
        color: ${theme.baseColors.tertiary};
        cursor: pointer;
        font-size: ${theme.components.text.size.xxs};
        font-weight: 600;
        margin-top: 4px;

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
        lineHeight = 1.5,
        style,
        ...restProps
    }) => {
        // Tracks whether the text is currently in its full-height state
        const [isExpanded, setIsExpanded] = useState(false);
        // Tracks if the content actually exceeds the allowed lines (to show/hide button)
        const [isTextOverflowing, setIsTextOverflowing] = useState(false);
        // Used to temporarily disable line-clamping during the height transition
        const [isTransitioning, setIsTransitioning] = useState(false);
        // Stores the measured full height of the text for CSS variable injection
        const [textHeight, setTextHeight] = useState(0);

        const textRef = useRef<HTMLSpanElement>(null);
        const theme = useTheme();

        /**
         * Calculates the total height of the text and determines if it
         * overflows the threshold set by 'linesToShow'.
         */
        const updateTextHeight = useCallback(() => {
            if (!textRef.current) return;

            const el = textRef.current;
            const elementStyles = getComputedStyle(el);
            const elLineHeight = parseFloat(elementStyles.lineHeight);
            const fontsize = parseFloat(elementStyles.fontSize);

            // Use calculated pixel height of one line
            const actualLineHeight = isNaN(elLineHeight)
                ? fontsize * (lineHeight || 1.2)
                : elLineHeight;

            const clampedTextHeightThreshold = actualLineHeight * linesToShow;

            setTextHeight(el.scrollHeight);

            // Only show expansion UI if text is truly taller than the threshold (+ adaptive buffer)
            setIsTextOverflowing(
                el.scrollHeight > clampedTextHeightThreshold + 2,
            );
        }, [linesToShow, lineHeight]);

        // Sync height measurement whenever the element resizes (window resize, layout shifts)
        useLayoutEffect(() => {
            if (!textRef.current) return;

            const observer = new ResizeObserver(() => {
                updateTextHeight();
            });

            observer.observe(textRef.current);

            return () => {
                observer.disconnect();
            };
        }, [updateTextHeight]);

        // Re-measure height if children change or expansion state toggles
        useLayoutEffect(() => {
            updateTextHeight();
        }, [isExpanded, children, updateTextHeight]);

        return (
            <Flex
                direction="column"
                rowGap={`calc(0.5 * ${theme.spacing})`}
                alignItems="flex-start"
            >
                <StyledText
                    {...restProps}
                    ref={textRef}
                    as={
                        variant && variantSet.has(variant) ? variant : undefined
                    }
                    $variant={variant}
                    $size={size}
                    $expandable={expandable}
                    $isExpanded={isExpanded}
                    $isTransitioning={isTransitioning}
                    $linesToShow={linesToShow}
                    $lineHeight={lineHeight}
                    style={
                        {
                            '--text-height': `${textHeight}px`,
                            ...style,
                        } as CSSProperties
                    }
                    onTransitionEnd={() => setIsTransitioning(false)}
                    aria-expanded={expandable ? isExpanded : undefined}
                >
                    {children}
                </StyledText>
                {expandable && isTextOverflowing && (
                    <StyledShowMoreButton
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsTransitioning(true);
                            setIsExpanded((prev) => !prev);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setIsTransitioning(true);
                                setIsExpanded((prev) => !prev);
                            }
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
