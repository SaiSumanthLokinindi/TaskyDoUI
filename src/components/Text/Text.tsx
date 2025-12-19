import { FC, memo, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

export interface TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'helper' | 'p';
    size?: 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'title';
}

export const StyledText = styled.span<
    Pick<TextProps, 'variant'> & { textSize: Required<TextProps['size']> }
>(
    ({
        variant,
        textSize,
        theme: {
            text: {
                helperText: {
                    color: helperTextColor,
                    lineHeight: helperTextLineHeight,
                },
            },
            components: {
                text: { size },
            },
        },
    }) => {
        return css`
            font-size: ${size[textSize]};
            margin: unset;

            ${variant === 'h1' &&
            css`
                font-size: ${size.title};
                font-weight: 700;
            `}

            ${variant === 'h2' &&
            css`
                font-size: ${size.xxxl};
                font-weight: 700;
            `}

            ${variant === 'h3' &&
            css`
                font-size: ${size.xxl};
                font-weight: 700;
            `}

            ${variant === 'h4' &&
            css`
                font-size: ${size.xl};
                font-weight: 700;
            `}

            ${variant === 'h5' &&
            css`
                font-size: ${size.lg};
                font-weight: 700;
            `}

            ${variant === 'h6' &&
            css`
                font-size: ${size.md};
                font-weight: 700;
            `}

            ${variant === 'helper' &&
            css`
                font-size: ${size.xs};
                color: ${helperTextColor};
                line-height: ${helperTextLineHeight};
            `}
        `;
    },
);

const Text: FC<PropsWithChildren<TextProps>> = memo(
    ({ children, variant, size = 'rg', ...restProps }) => {
        return (
            <StyledText
                {...restProps}
                as={
                    variant &&
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(variant)
                        ? variant
                        : undefined
                }
                variant={variant}
                textSize={size}
            >
                {children}
            </StyledText>
        );
    },
);

export default Text;
