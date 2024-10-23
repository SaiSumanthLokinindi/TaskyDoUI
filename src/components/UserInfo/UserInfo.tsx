import { memo, FC, ReactNode } from 'react';
import Text, { StyledText } from '../Text/Text';
import Flex from '../Flex/flex';
import styled, { css } from 'styled-components';
import { StyledImage } from '../Image/Image';

export interface UserInfoProps {
    visual?: ReactNode;
    primary: string;
    secondary?: string;
}

const StyledUserInfo = styled(Flex)(({ theme: { spacing } }) => {
    return css`
        padding-inline: ${spacing};
        ${StyledImage} {
            max-height: 56px;
            max-width: 56px;
            border-radius: 100%;
        }
        ${StyledText} {
            font-weight: 600;
            max-width: 15ch;
        }
    `;
});

const StyledInitials = styled(Flex)(({
    theme: {
        spacing,
        components: {
            text: { size },
        },
    },
}) => {
    return css`
        width: 56px;
        height: 56px;
        background-color: gray;
        box-sizing: border-box;
        border-radius: 100%;
        vertical-align: middle;
        padding: calc(0.5 * ${spacing});

        span {
            font-size: ${size.md};
            font-weight: 500;
            letter-spacing: 1px;
        }
    `;
});

const Initials = ({ name }: { name: string }) => {
    return (
        <StyledInitials alignItems="center" justifyContent="center">
            <span>
                {name
                    .split(' ')
                    .map((word) => word.charAt(0))
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
            </span>
        </StyledInitials>
    );
};

const UserInfo: FC<UserInfoProps> = memo(({ visual, primary, secondary }) => {
    return (
        <StyledUserInfo columnGap="0.75rem" alignItems="center">
            {visual || <Initials name={primary} />}
            <Flex direction="column" rowGap="0.125rem" justifyContent="center">
                <Text size="xl">{primary}</Text>
                <Text variant="helper">{secondary}</Text>
            </Flex>
        </StyledUserInfo>
    );
});

export default UserInfo;
