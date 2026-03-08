import Flex from 'src/components/Flex/flex';
import InfoItem, {
    StyledInfoContent,
    StyledInfoItem,
} from 'src/components/InfoItem/InfoItem';
import Priority from 'src/components/Priority/Priority';
import Tag from 'src/components/Tag/Tag';
import Text, { StyledText } from 'src/components/Text/Text';
import useBreakpoint from 'src/hooks/useBreakpoint';

import styled, { css, useTheme } from 'styled-components';

const StyledTaskDetailsContainer = styled(Flex)(({ theme }) => {
    return css`
        ${StyledInfoItem} ${StyledInfoContent} ${StyledText} {
            font-size: 0.9rem;
        }
    `;
});

const StyleInfoGrid = styled.div(({ theme }) => {
    return css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        row-gap: calc(3 * ${theme.spacing});

        @media (width <= 375px) {
            grid-template-columns: 1fr;
        }
    `;
});

const TaskDetails = () => {
    const theme = useTheme();
    const isXSScreen = useBreakpoint('xs');
    return (
        <StyledTaskDetailsContainer
            direction="column"
            rowGap={`calc(3 * ${theme.spacing})`}
        >
            <Text variant="h6" size="lg" lineHeight={1.5}>
                Test Decision Panel reconnect and refresh scenarios in mobile
                platforms
            </Text>
            <Text
                size="sm"
                expandable
                lineHeight={1.5}
                style={{ color: theme.baseColors.fadedGray }}
            >
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
            <StyleInfoGrid>
                <InfoItem label="Priority" info={<Priority priority={2} />} />
                <InfoItem label="Schedule Date" info="28 Nov 2026" />
                <InfoItem label="Due Date" info="30 Nov 2026" />
            </StyleInfoGrid>
            <InfoItem
                label="Tags"
                info={
                    <Flex gap={theme.spacing} flexWrap="wrap">
                        {new Array(5).fill('work').map((tag) => (
                            <Tag id={tag} label={tag} readOnly />
                        ))}
                    </Flex>
                }
            />
        </StyledTaskDetailsContainer>
    );
};

export default TaskDetails;
