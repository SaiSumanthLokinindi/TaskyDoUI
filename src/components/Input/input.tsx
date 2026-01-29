import {
    ChangeEvent,
    useState,
    useEffect,
    Ref,
    forwardRef,
    PropsWithoutRef,
    FocusEvent,
} from 'react';
import styled, { css } from 'styled-components';

// Union type for both input and textarea elements
type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface InputProps {
    defaultValue?: string;
    disabled?: boolean;
    info?: string | string[];
    label?: string;
    name?: string;
    onChange?: (e?: ChangeEvent<InputElement>) => void;
    onBlur?: (e?: FocusEvent<InputElement>) => void;
    onFocus?: (e?: FocusEvent<InputElement>) => void;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    status?: 'error' | 'info' | 'warning';
    type?: string;
}

const StyledInputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const sharedLableStyles = css`
    font-size: 0.75rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: ${({ theme }) => theme.spacing};
    text-align: left;
`;

const StyledLabel = styled.label`
    ${sharedLableStyles}
`;

// Shared styles for input, textarea, and select
export const sharedInputStyles = css<{ status?: InputProps['status'] }>`
    ${({ status, theme }) => css`
        background-color: rgba(42, 42, 42, 0.7);
        color: ${theme.text.primary};
        appearance: none;
        outline: none;
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: ${theme.spacing} calc(2 * ${theme.spacing});
        width: 100%;
        font-size: 0.825rem;
        font-family: inherit;
        box-sizing: border-box;
        transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);

        &::placeholder {
            color: ${theme.components.input.placeholderColor};
            font-size: 0.825rem;
        }

        &:hover {
            background-color: rgba(50, 50, 50, 0.8);
            border-color: rgba(255, 255, 255, 0.1);
        }

        &:focus {
            outline: none;
            border-color: ${theme.baseColors.tertiary};
            box-shadow:
                inset 0 2px 4px rgba(0, 0, 0, 0.3),
                0 0 0 1px ${theme.baseColors.tertiary},
                0 0 12px 2px rgba(30, 169, 65, 0.3);
        }

        &:disabled {
            color: ${theme.text.disabled};
            background-color: ${theme.components.input.disabledBackgroundColor};

            &::placeholder {
                color: ${theme.text.disabled};
            }
        }

        ${status === 'error' &&
        css`
            &:not(:focus) {
                border: 1px solid ${theme.baseColors.danger};
            }
        `}
    `}
`;

export const StyledInput = styled.input<{
    status: InputProps['status'];
}>`
    ${sharedInputStyles}
    height: 48px; /* Standardize height */
`;

export const StyledTextarea = styled.textarea<{
    status: InputProps['status'];
}>`
    ${sharedInputStyles}
    display: block;
    height: auto;
    min-height: 120px;
    max-height: 400px;
    resize: vertical;
    line-height: 1.6;
    border: 1px solid rgba(255, 255, 255, 0.05); /* Match boarder */
    margin: 0; /* Reset margins to help clipping */
    vertical-align: top;
`;

export const StyledInfo = styled.div(
    ({
        theme: {
            spacing,
            text: { helperText },
        },
    }) => {
        return css`
            font-size: ${helperText.size.md};
            color: ${helperText.color};
            overflow-wrap: anywhere;

            span:first-of-type {
                display: inline-block;
                margin-block-start: calc(0.25 * ${spacing});
            }
        `;
    },
);

const Input = forwardRef<InputElement, PropsWithoutRef<InputProps>>(
    (
        {
            type = 'text',
            defaultValue = '',
            onChange,
            info,
            status,
            label,
            ...restProps
        },
        ref,
    ) => {
        const [value, setValue] = useState(defaultValue);
        const [id] = useState(
            () => `input-${Math.random().toString(36).substr(2, 9)}`,
        );

        useEffect(() => {
            setValue(defaultValue);
        }, [defaultValue]);

        const handleChange = (e: ChangeEvent<InputElement>) => {
            setValue(e.currentTarget.value);
            onChange?.(e);
        };

        const isTextarea = type === 'textarea';

        return (
            <StyledInputWrapper>
                {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
                {isTextarea ? (
                    <StyledTextarea
                        {...restProps}
                        id={id}
                        status={status}
                        ref={ref as Ref<HTMLTextAreaElement>}
                        value={value}
                        onChange={handleChange}
                    />
                ) : (
                    <StyledInput
                        {...restProps}
                        id={id}
                        status={status}
                        ref={ref as Ref<HTMLInputElement>}
                        value={value}
                        type={type}
                        onChange={handleChange}
                    />
                )}
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

export default Input;
