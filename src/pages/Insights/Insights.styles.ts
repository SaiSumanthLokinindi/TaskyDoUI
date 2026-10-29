import styled, {css} from "styled-components";
import Flex from "src/components/Flex/flex";
import Card from "src/components/Card/card";

export const StyledMyDayProgress = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
    `;
});

export const StyledProgressContainer = styled(Flex)`
    font-size: 0.725rem;
`;

export const StyledHeader = styled(Flex)`
    font-size: 0.875rem;
`;

export const StyledInsights = styled(Flex)`
    grid-area: insights;
`;