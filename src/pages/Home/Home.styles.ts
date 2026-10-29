import styled, { css } from 'styled-components';
import Card from 'src/components/Card/card';

export const StyledTaskList = styled(Card)<{gridArea: string}>(({ gridArea, theme:{spacing, breakpoints} }) => {
    return css`
        padding: calc(1.5 * ${spacing});
        ${gridArea && css`
            grid-area: ${gridArea};
        `}
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
            'insights myday overdue'
            'insights myday overdue'
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
                'insights insights'
                'myday overdue'
                'recentlycompleted upcoming';
                
        }

        /** Single row column layout for mobile devices */
        @media (max-width: calc(${breakpoints.md} - 1px)){
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto;

            grid-template-areas:
                'insights';

            overflow-y: auto;
            overflow-x: hidden;
        }
    `;
});




