import styled, { css } from 'styled-components';
import Flex from '../../components/Flex/flex';

export const StyledHeader = styled(Flex)(() => {
    return css`
        height: 120px;
    `;
});

export const StyledSeparator = styled(Flex)(({ theme }) => {
    return css`
        margin-block: calc(3 * ${theme.spacing});
        hr {
            appearance: none;
            border: 0;
            outline: none;
            width: 30%;
            height: 0.05rem;
            background: white;
            margin: 0;
        }
    `;
});

export const StyledError = styled.div(
    ({
        theme: {
            spacing,
            text: { helperText },
        },
    }) => {
        return css`
            color: ${helperText.color};
            font-size: ${helperText.size};
            padding-block-end: ${spacing};
            line-height: ${helperText.lineHeight};
            height: calc(2 * ${spacing});
        `;
    },
);

export const StyledFooter = styled(Flex)(({ theme }) => {
    return css`
        p {
            font-size: 0.85rem;
            margin-block: 0 ${theme.spacing};
        }
    `;
});
