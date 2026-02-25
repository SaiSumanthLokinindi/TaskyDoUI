import Flex from 'src/components/Flex/flex';
import Text, { StyledText } from 'src/components/Text/Text';

import styled, { css, useTheme } from 'styled-components';

const StyledTaskDetailsContainer = styled(Flex)(({ theme }) => {
    return css`
        ${StyledText}:nth-of-type {
            color: red;
        }
    `;
});

const TaskDetails = () => {
    const theme = useTheme();
    return (
        <StyledTaskDetailsContainer
            direction="column"
            rowGap={`calc(3 * ${theme.spacing})`}
        >
            <Text variant="h6" size="lg">
                Test Decision Panel reconnect and refresh scenarios in mobile
                platforms
            </Text>
            <Text size="sm">
                {' '}
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum
            </Text>
        </StyledTaskDetailsContainer>
    );
};

export default TaskDetails;
