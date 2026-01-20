import styled, { css } from 'styled-components';
import Card from 'src/components/Card/card';
import Flex from 'src/components/Flex/flex';

export const StyledQuickStats = styled(Flex)`
    grid-area: quickinfo;
`;

export const StyledMyDayTasksList = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
        grid-area: myday;
        display: flex;
        flex-direction: column;
        min-height: 0;
    `;
});

export const StyledOverdueTasksList = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
        grid-area: overdue;
        display: flex;
        flex-direction: column;
        min-height: 0;
    `;
});

export const StyledUpcomingTasksList = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
        grid-area: upcoming;
        display: flex;
        flex-direction: column;
        min-height: 0;
    `;
});

export const StyledCalender = styled(Card)(({ theme: { spacing } }) => {
    return css`
        padding: calc(1.5 * ${spacing});
        grid-area: calender;
    `;
});

export const StyledHomeContainer = styled.div(({ theme: { spacing } }) => {
    return css`
        width: 100%;
        display: grid;
        box-sizing: border-box;
        margin-block-start: calc(2 * ${spacing});

        grid-template-columns: 20% 1fr 1fr;
        grid-template-rows: repeat(6, 1fr);

        grid-template-areas:
            'quickinfo myday overdue'
            'quickinfo myday overdue'
            'calender  myday overdue'
            'calender  myday upcoming'
            'calender  myday upcoming'
            'calender  myday upcoming';

        gap: calc(2 * ${spacing});
    `;
});

export const StyledHeader = styled(Flex)`
    font-size: 0.875rem;
`;

export const StyledProgressContainer = styled(Flex)`
    font-size: 0.725rem;
`;

export const StyledMyDayProgress = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
    `;
});
