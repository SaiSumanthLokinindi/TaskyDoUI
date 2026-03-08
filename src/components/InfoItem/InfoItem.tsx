import { ReactElement } from 'react';
import Flex from '../Flex/flex';
import Text from '../Text/Text';
import styled, { css, useTheme } from 'styled-components';
import { BaseUIProps } from 'src/types/base.types';

export interface InfoItemProps extends BaseUIProps {
    label: string;
    info: string | ReactElement;
    inline?: boolean;
}

export const StyledInfoItem = styled(Flex)(({ theme }) => {
    return css`
        gap: ${theme.spacing};
    `;
});

export const StyledInfoContent = styled.div``;

const InfoItem = ({
    label,
    info,
    inline = false,
    ...restProps
}: InfoItemProps) => {
    const theme = useTheme();
    return (
        <StyledInfoItem
            direction={inline ? 'row' : 'column'}
            alignItems={inline ? 'center' : 'stretch'}
            {...restProps}
        >
            <Text
                size="xs"
                variant="helper"
                style={{
                    color: theme.text.helperText.color,
                    fontWeight: 700,
                }}
            >
                {label}
            </Text>
            <StyledInfoContent>
                {typeof info === 'string' ? <Text>{info}</Text> : info}
            </StyledInfoContent>
        </StyledInfoItem>
    );
};

export default InfoItem;
