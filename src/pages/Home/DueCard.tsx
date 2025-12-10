import Card from 'src/components/Card/card';
import styled, { css } from 'styled-components';
import Text from 'src/components/Text/Text';

const StyledDueToday = styled(Card)(({
    theme: {
        spacing,
        breakpoints: { sm },
    },
}) => {
    return css`
        padding: calc(1.5 * ${spacing});
        height: 120px;
        width: 100%;
        display: flex;
        flex-grow: 1;
        flex-direction: column;

        & > span:nth-child(1) {
            font-size: 0.75rem;
            opacity: 0.75;
        }

        & > span:nth-child(2) {
            font-size: 2.5rem;
            font-weight: bold;
            margin-top: auto;
        }

        @media (max-width: ${sm}) {
            width: 100%;
            flex-grow: 1;
        }
    `;
});

interface DueCardProps {
    label: string;
    count: number;
    helperText: string;
}

const DueCard = ({ label, count, helperText }: DueCardProps) => {
    return (
        <StyledDueToday>
            <span>{label}</span>
            <span>{count}</span>
            <Text variant="helper" size="xs">
                {helperText}
            </Text>
        </StyledDueToday>
    );
};

export default DueCard;
