import { memo, useState, useRef, useEffect, KeyboardEvent } from 'react';
import styled, { css } from 'styled-components';
import { sharedInputStyles } from '../Input/input';

export interface SelectProps {
    options: string[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    status?: 'error' | 'info' | 'warning';
    disabled?: boolean;
}

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const SelectTrigger = styled.button<{
    status?: SelectProps['status'];
    isOpen: boolean;
}>`
    ${sharedInputStyles}
    height: 40px;
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
        stroke: white;
        stroke-width: 2;
        fill: none;
    }
`;

const Dropdown = styled.ul<{ isOpen: boolean }>`
    ${({ theme, isOpen }) => css`
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background-color: ${theme.components.input.backgroundColor};
        border-radius: 4px;
        border: 2px solid ${theme.baseColors.tertiary};
        list-style: none;
        margin: 0;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        padding: 4px;
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
        opacity: ${isOpen ? 1 : 0};
        visibility: ${isOpen ? 'visible' : 'hidden'};
        transform: ${isOpen ? 'translateY(0)' : 'translateY(-8px)'};
        transition:
            opacity 0.2s ease,
            transform 0.2s ease,
            visibility 0.2s;
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

const Select = memo(
    ({
        options,
        value,
        placeholder = 'Select an option',
        onChange,
        status,
        disabled = false,
    }: SelectProps) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState(value || '');
        const [highlightedIndex, setHighlightedIndex] = useState(-1);
        const wrapperRef = useRef<HTMLDivElement>(null);
        const triggerRef = useRef<HTMLButtonElement>(null);

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

        // Update selected value when value prop changes
        useEffect(() => {
            if (value !== undefined) {
                setSelectedValue(value);
            }
        }, [value]);

        const handleSelect = (option: string) => {
            setSelectedValue(option);
            onChange?.(option);
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
                        setIsOpen(!isOpen);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!isOpen) {
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

        return (
            <SelectWrapper ref={wrapperRef}>
                <SelectTrigger
                    ref={triggerRef}
                    type="button"
                    status={status}
                    isOpen={isOpen}
                    disabled={disabled}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    {selectedValue ? (
                        selectedValue
                    ) : (
                        <Placeholder>{placeholder}</Placeholder>
                    )}
                    <Arrow isOpen={isOpen}>
                        <svg viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </Arrow>
                </SelectTrigger>

                <Dropdown isOpen={isOpen} role="listbox">
                    {options.map((option, index) => (
                        <Option
                            key={index}
                            role="option"
                            isSelected={option === selectedValue}
                            isHighlighted={index === highlightedIndex}
                            aria-selected={option === selectedValue}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {option}
                        </Option>
                    ))}
                </Dropdown>
            </SelectWrapper>
        );
    },
);

export default Select;
