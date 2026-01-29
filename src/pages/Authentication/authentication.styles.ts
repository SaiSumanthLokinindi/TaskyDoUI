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
        opacity: 0.4;
        font-size: 0.725rem;

        hr {
            appearance: none;
            border: 0;
            outline: none;
            width: 40%;
            height: 0.05rem;
            background: ${({ theme }) => theme.text.primary};
            margin: 0;
            opacity: 0.2;
        }
    `;
});

export const StyledError = styled.div(
    ({
        theme: {
            spacing,
            text: { helperText },
            baseColors: { danger },
        },
    }) => {
        return css`
            font-size: ${helperText.size.md};
            margin-block: calc(0.5 * ${spacing}) calc(4 * ${spacing});
            display: flex;
            align-items: center;
            padding-inline: calc(2 * ${spacing});
            height: 40px;
            color: ${danger};
            background-color: rgba(202, 53, 53, 0.2);
            border: 1px solid ${danger};
            border-radius: 5px;
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
