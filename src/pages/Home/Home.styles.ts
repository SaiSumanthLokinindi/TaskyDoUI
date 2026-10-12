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

export const StyledRecentlyCompletedTasksList = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
        grid-area: recentlycompleted;
        display: flex;
        flex-direction: column;
        min-height: 0;
    `;
});

export const StyledHomeContainer = styled.div(({ theme: { spacing, breakpoints } }) => {
    return css`
        width: 100%;
        display: grid;
        box-sizing: border-box;
        margin-block-start: calc(2 * ${spacing});

        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(6, minmax(0, 1fr));

        grid-template-areas:
            'quickinfo myday overdue'
            'quickinfo myday overdue'
            'recentlycompleted  myday overdue'
            'recentlycompleted  myday upcoming'
            'recentlycompleted  myday upcoming'
            'recentlycompleted  myday upcoming';

        gap: calc(2 * ${spacing});

        /** Tablet 2 columns */
        @media (min-width: ${breakpoints.md}) and (max-width : calc(${breakpoints.lg} - 1px)){
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: auto repeat(2, minmax(0, 1fr));

            grid-template-areas:
                'quickinfo quickinfo'
                'myday overdue'
                'recentlycompleted upcoming';
                
        }

        /** Single row column layout for mobile devices */
        @media (max-width: calc(${breakpoints.md} - 1px)){
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto;

            grid-template-areas:
                'quickinfo';

            overflow-y: auto;
            overflow-x: hidden;
        }
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
