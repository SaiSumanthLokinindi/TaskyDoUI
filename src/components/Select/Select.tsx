import {
    memo,
    useState,
    useRef,
    useEffect,
    KeyboardEvent,
    FocusEvent,
} from 'react';
import styled, { css } from 'styled-components';
import {
    sharedInputStyles,
    sharedLableStyles,
    StyledInfo,
} from '../Input/input';

export interface SelectOption<T = string> {
    label: string;
    value: T;
}

export interface SelectProps<T = string> {
    options: string[] | SelectOption<T>[];
    value?: T;
    name?: string;
    placeholder?: string;
    onChange?: (event: { target: { name?: string; value: T } }) => void;
    onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
    status?: 'error' | 'info' | 'warning';
    disabled?: boolean;
    label?: string;
    info?: string | string[];
}

const StyledInputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledLabel = styled.label`
    ${sharedLableStyles}
`;

const SelectContainer = styled.div`
    position: relative;
    width: 100%;
`;

const SelectTrigger = styled.button<{
    status?: SelectProps['status'];
    isOpen: boolean;
}>`
    ${sharedInputStyles}
    height: 48px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;

    ${({ isOpen, theme }) =>
        isOpen &&
        css`
            outline: 2.5px solid ${theme.baseColors.tertiary};
            box-shadow: 0 0 8px 4px rgba(30, 169, 65, 0.2);
        `}

    &:disabled {
        cursor: not-allowed;
    }
`;

const Arrow = styled.span<{ isOpen: boolean }>`
    display: inline-flex;
    transition: transform 0.2s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

    svg {
        width: 16px;
        height: 16px;
        stroke: rgba(255, 255, 255, 0.8);
        stroke-width: 2.5;
        fill: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

const Dropdown = styled.ul<{ isOpen: boolean; openAbove: boolean }>`
    ${({ isOpen, openAbove }) => css`
        position: absolute;
        ${openAbove
            ? css`
                  bottom: calc(100% + 8px);
                  top: auto;
              `
            : css`
                  top: calc(100% + 8px);
                  bottom: auto;
              `}
        left: 0;
        right: 0;
        background-color: rgba(30, 30, 30, 0.85);
        backdrop-filter: blur(4px);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        list-style: none;
        margin: 0;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        padding: 6px;
        z-index: 1200;
        max-height: 250px;
        overflow-y: auto;
        opacity: ${isOpen ? 1 : 0};
        visibility: ${isOpen ? 'visible' : 'hidden'};
        transform: ${isOpen
            ? 'translateY(0)'
            : openAbove
            ? 'translateY(12px)'
            : 'translateY(-12px)'};
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: ${openAbove
            ? '0 -10px 30px rgba(0, 0, 0, 0.5)'
            : '0 10px 30px rgba(0, 0, 0, 0.5)'};
    `}
`;

const Option = styled.li<{ isSelected: boolean; isHighlighted: boolean }>`
    ${({ theme, isSelected, isHighlighted }) => css`
        padding: ${theme.spacing};
        min-height: 20px;
        display: flex;
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
        color: ${theme.text.primary};
        background-color: transparent;
        transition: background-color 0.15s ease;

        ${isSelected &&
        css`
            background-color: ${theme.baseColors.tertiary};
            color: white;
        `}

        ${isHighlighted &&
        css`
            background-color: ${theme.baseColors.secondaryHover};
            color: white;
        `}

        &:hover {
            background-color: ${theme.baseColors.secondaryHover};
            color: white;
        }
    `}
`;

const Placeholder = styled.span`
    ${({ theme }) => css`
        color: ${theme.components.input.placeholderColor};
    `}
`;

const Select = <T extends string | number>({
    options,
    value,
    name,
    placeholder = 'Select an option',
    onChange,
    onBlur,
    status,
    disabled = false,
    label,
    info,
}: SelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<T | undefined>(value);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [openAbove, setOpenAbove] = useState(false);
    const [id] = useState(
        () => name || `select-${Math.random().toString(36).substr(2, 9)}`,
    );
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownHeight = 250; // max-height of dropdown

    // Update selected value when value prop changes
    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    // Find the nearest scrollable ancestor container
    const getScrollableParent = (
        element: HTMLElement | null,
    ): HTMLElement | null => {
        if (!element) return null;
        let parent = element.parentElement;
        while (parent) {
            const overflowY = window.getComputedStyle(parent).overflowY;
            if (overflowY === 'auto' || overflowY === 'scroll') {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null; // No scrollable parent found, use viewport
    };

    const calculateDirection = () => {
        if (!triggerRef.current) return false;
        const triggerRect = triggerRef.current.getBoundingClientRect();

        // Find the scrollable container (modal body)
        const scrollableParent = getScrollableParent(triggerRef.current);

        let spaceBelow: number;
        let spaceAbove: number;

        if (scrollableParent) {
            // Calculate space relative to the scrollable container
            const containerRect = scrollableParent.getBoundingClientRect();
            spaceBelow = containerRect.bottom - triggerRect.bottom;
            spaceAbove = triggerRect.top - containerRect.top;
        } else {
            // Fall back to viewport if no scrollable container
            spaceBelow = window.innerHeight - triggerRect.bottom;
            spaceAbove = triggerRect.top;
        }

        // Open above if not enough space below and more space above
        return spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getOptionLabel = (option: string | SelectOption<T>) =>
        typeof option === 'string' ? option : option.label;

    const getOptionValue = (option: string | SelectOption<T>) =>
        typeof option === 'string' ? (option as unknown as T) : option.value;

    const handleSelect = (option: string | SelectOption<T>) => {
        const optionValue = getOptionValue(option);
        const oldValue = selectedValue;
        setSelectedValue(optionValue);

        if (onChange && oldValue !== optionValue) {
            onChange({
                target: {
                    name,
                    value: optionValue,
                },
            });
        }
        setIsOpen(false);
        triggerRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (isOpen && highlightedIndex >= 0) {
                    handleSelect(options[highlightedIndex]);
                } else {
                    if (!isOpen) {
                        setOpenAbove(calculateDirection());
                    }
                    setIsOpen(!isOpen);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setOpenAbove(calculateDirection());
                    setIsOpen(true);
                } else {
                    setHighlightedIndex((prev) =>
                        prev < options.length - 1 ? prev + 1 : 0,
                    );
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setHighlightedIndex((prev) =>
                        prev > 0 ? prev - 1 : options.length - 1,
                    );
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const currentLabel = options.find(
        (opt) => getOptionValue(opt) === selectedValue,
    );

    return (
        <StyledInputWrapper>
            {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
            <SelectContainer ref={wrapperRef}>
                <SelectTrigger
                    id={id}
                    ref={triggerRef}
                    type="button"
                    name={name}
                    status={status}
                    isOpen={isOpen}
                    disabled={disabled}
                    onBlur={onBlur}
                    onClick={() => {
                        if (!disabled) {
                            if (!isOpen) {
                                setOpenAbove(calculateDirection());
                            }
                            setIsOpen(!isOpen);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    {selectedValue !== undefined && currentLabel ? (
                        getOptionLabel(currentLabel)
                    ) : (
                        <Placeholder>{placeholder}</Placeholder>
                    )}
                    <Arrow isOpen={isOpen}>
                        <svg viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </Arrow>
                </SelectTrigger>

                {isOpen && (
                    <Dropdown
                        isOpen={isOpen}
                        openAbove={openAbove}
                        role="listbox"
                    >
                        {options.map((option, index) => {
                            const optValue = getOptionValue(option);
                            const isSelected = optValue === selectedValue;
                            return (
                                <Option
                                    key={index}
                                    role="option"
                                    isSelected={isSelected}
                                    isHighlighted={index === highlightedIndex}
                                    aria-selected={isSelected}
                                    onClick={() => handleSelect(option)}
                                    onMouseEnter={() =>
                                        setHighlightedIndex(index)
                                    }
                                >
                                    {getOptionLabel(option)}
                                </Option>
                            );
                        })}
                    </Dropdown>
                )}
            </SelectContainer>
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
};

export default memo(Select) as typeof Select;
