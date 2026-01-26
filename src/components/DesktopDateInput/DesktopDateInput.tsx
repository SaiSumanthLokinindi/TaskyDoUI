import { memo, useEffect, useState } from 'react';
import Flex from '../Flex/flex';
import { GoCalendar } from 'react-icons/go';
import styled, { css } from 'styled-components';
import { sharedInputStyles } from '../Input/input';

export interface DesktopDateInputProps {
    defaultDate?: string;
    onChange?: (date: string) => void;
    label?: string;
}

const StyledLabel = styled.span`
    color: ${({ theme }) => theme.components.input.placeholderColor};
`;

const StyledDesktopDateInput = styled(Flex)(({ theme }) => {
    return css`
        ${sharedInputStyles}
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        min-height: 40px;
        min-width: 150px;
    `;
});

const DesktopDateInput = memo(
    ({ defaultDate, onChange, label }: DesktopDateInputProps) => {
        const [date, setDate] = useState(defaultDate);

        useEffect(() => {
            setDate(defaultDate);
        }, [defaultDate]);

        return (
            <StyledDesktopDateInput>
                {date ? (
                    <span>{date}</span>
                ) : (
                    <StyledLabel>{label}</StyledLabel>
                )}
                <GoCalendar />
            </StyledDesktopDateInput>
        );
    },
);

export default DesktopDateInput;
