import { FC, memo, PropsWithChildren } from 'react';
import { BaseUIProps } from 'src/types/base.types';
import styled, { css } from 'styled-components';

export interface TextProps extends BaseUIProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'helper' | 'p';
    size?: 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'title';
    expandable?: boolean;
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
}>(({ $variant, $size: textSize = 'rg', theme }) => {
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
    `;
});

const Text: FC<PropsWithChildren<TextProps>> = memo(
    ({ children, variant, size = 'rg', expandable = false, ...restProps }) => {
        return (
            <StyledText
                {...restProps}
                as={variant && variantSet.has(variant) ? variant : undefined}
                $variant={variant}
                $size={size}
                $expandable={expandable}
            >
                {children}
            </StyledText>
        );
    },
);

export default Text;
