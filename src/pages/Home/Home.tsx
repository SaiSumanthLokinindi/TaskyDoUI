import { memo } from 'react';
import DueCard from './DueCard';
import Flex, { StyledFlex } from 'src/components/Flex/flex';
import styled, { css } from 'styled-components';
import Card from 'src/components/Card/card';
import Text from 'src/components/Text/Text';
import Progress from 'src/components/Progress/Progress';

const StyledHomeContainer = styled(Flex)(({
    theme: {
        spacing,
        breakpoints: { xl, lg, sm },
    },
}) => {
    return css`
        padding-block: calc(3 * ${spacing});
        width: 100%;

        & > ${StyledFlex} {
            width: 20%;
        }

        @media (max-width: ${xl}) {
            & > ${StyledFlex} {
                width: 30%;
            }
        }

        @media (max-width: ${lg}) {
            & > ${StyledFlex} {
                width: 40%;
            }
        }

        @media (max-width: ${sm}) {
            & > ${StyledFlex} {
                width: 100%;
            }
        }
    `;
});

const StyledHeader = styled(Flex)`
    font-size: 0.875rem;
`;

const StyledProgressContainer = styled(Flex)`
    font-size: 0.725rem;
`;

const StyledMyDayProgress = styled(Card)(({ theme }) => {
    return css`
        padding: calc(1.5 * ${theme.spacing});
    `;
});

const Home = memo(() => {
    return (
        <StyledHomeContainer>
            <Flex direction="column" rowGap="16px">
                <Flex gap="16px">
                    <DueCard
                        label="Due Today"
                        count={8}
                        helperText="Tasks Pending"
                    />
                    <DueCard
                        label="Overdue"
                        count={15}
                        helperText="Tasks Pending"
                    />
                </Flex>
                <StyledMyDayProgress>
                    <Flex direction="column" rowGap="24px">
                        <StyledHeader
                            justifyContent="space-between"
                            alignItems="baseline"
                        >
                            <Text variant="h5">My Day</Text>
                            <span>12 tasks</span>
                        </StyledHeader>
                        <Flex direction="column" rowGap="8px">
                            <Flex direction="column">
                                <StyledProgressContainer justifyContent="space-between">
                                    <span>Progress</span>
                                    <span>32%</span>
                                </StyledProgressContainer>
                                <Progress value="65" />
                            </Flex>
                            <Text size="xs" variant="helper">
                                5 tasks completed
                            </Text>
                        </Flex>
                    </Flex>
                </StyledMyDayProgress>
            </Flex>
        </StyledHomeContainer>
    );
});

export default Home;
