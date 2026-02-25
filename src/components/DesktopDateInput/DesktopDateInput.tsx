import {
    ChangeEvent,
    FocusEvent,
    memo,
    useEffect,
    useState,
    useRef,
} from 'react';
import Flex from '../Flex/flex';
import { GoCalendar } from 'react-icons/go';
import styled from 'styled-components';
import {
    sharedInputStyles,
    sharedLableStyles,
    StyledInfo,
} from '../Input/input';
import Dialog from '../Dialog/Dialog';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export interface DesktopDateInputProps {
    defaultDate?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
    label?: string;
    name?: string;
    placeholder?: string;
    status?: 'error' | 'info' | 'warning';
    info?: string | string[];
}

const StyledInputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 0.825rem;
`;

const StyledLabel = styled.label`
    ${sharedLableStyles}
`;

const StyledPlaceholderLabel = styled.span`
    color: ${({ theme }) => theme.components.input.placeholderColor};
    font-size: 0.725rem;
`;

const StyledDesktopDateInput = styled(Flex)<{
    $status?: DesktopDateInputProps['status'];
}>`
    ${sharedInputStyles}
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    min-height: 48px;
    min-width: 150px;

    /* Custom styles for react-day-picker to match theme */
    .rdp {
        --rdp-cell-size: 40px;
        --rdp-accent-color: ${({ theme }) => theme.baseColors.tertiary};
        --rdp-background-color: transparent;
        margin: 0;
    }

    .rdp-day_selected,
    .rdp-day_selected:focus-visible,
    .rdp-day_selected:hover {
        background: linear-gradient(
            145deg,
            ${({ theme }) => theme.baseColors.tertiary},
            ${({ theme }) => theme.baseColors.clicked}
        );
        box-shadow: 0 4px 10px rgba(30, 169, 65, 0.3);
        color: white;
    }
`;

const DesktopDateInput = memo(
    ({
        defaultDate,
        onChange,
        onBlur,
        label,
        name,
        placeholder,
        status,
        info,
    }: DesktopDateInputProps) => {
        const [date, setDate] = useState(defaultDate);
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [id] = useState(
            () =>
                name || `date-input-${Math.random().toString(36).substr(2, 9)}`,
        );
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setDate(defaultDate);
        }, [defaultDate]);

        const handleDateSelect = (selectedDate: Date | undefined) => {
            if (selectedDate) {
                const monthNames = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ];

                const day = String(selectedDate.getDate()).padStart(2, '0');
                const month = monthNames[selectedDate.getMonth()];
                const year = selectedDate.getFullYear();

                const formattedDate = `${day} ${month} ${year}`;

                setDate(formattedDate);
                if (onChange) {
                    const event = {
                        target: {
                            name,
                            value: selectedDate.toISOString(),
                        },
                        currentTarget: {
                            name,
                            value: selectedDate.toISOString(),
                        },
                    } as unknown as ChangeEvent<HTMLInputElement>;
                    onChange(event);
                }
                setIsDialogOpen(false);
            }
        };

        return (
            <StyledInputWrapper>
                {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
                <StyledDesktopDateInput
                    id={id}
                    tabIndex={0}
                    ref={containerRef}
                    $status={status}
                    onClick={() => setIsDialogOpen(true)}
                    onBlur={onBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsDialogOpen(true);
                        }
                    }}
                >
                    {date ? (
                        <span>{date}</span>
                    ) : (
                        <StyledPlaceholderLabel>
                            {placeholder || label}
                        </StyledPlaceholderLabel>
                    )}
                    <GoCalendar />
                </StyledDesktopDateInput>

                <Dialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    anchor={containerRef.current}
                >
                    <DayPicker
                        mode="single"
                        selected={date ? new Date(date) : undefined}
                        onSelect={handleDateSelect}
                    />
                </Dialog>
                <StyledInfo>
                    {info &&
                        (Array.isArray(info) ? (
                            info.map((message, index) => (
                                <span key={index}>{message}</span>
                            ))
                        ) : (
                            <span>{info}</span>
                        ))}
                </StyledInfo>
            </StyledInputWrapper>
        );
    },
);

export default DesktopDateInput;
