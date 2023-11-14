import styled, { css } from 'styled-components';
import Flex from '../../components/Flex/flex';

export const StyledAuthWrapper = styled(Flex)`
    margin-block-start: 10vh;

    width: 20%;

    @media all and (max-width: 1652px) and (orientation: landscape) {
        width: 30%;
    }

    @media all and (max-width: 1024px) and (orientation: portrait) {
        width: 50%;
    }

    @media all and (max-width: 599px) {
        width: 90%;
    }
`;

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
            font-size: ${helperText.size.md};
            padding-block-end: ${spacing};
            line-height: ${helperText.lineHeight};
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
