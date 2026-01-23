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
`;

// Shared styles for input, textarea, and select
export const sharedInputStyles = css<{ status?: InputProps['status'] }>`
    ${({ status, theme }) => css`
        background-color: ${theme.components.input.backgroundColor};
        color: ${theme.text.primary};
        appearance: none;
        outline: none;
        border: 2px solid transparent;
        border-radius: 4px;
        padding: ${theme.spacing} calc(2 * ${theme.spacing});
        width: 100%;
        font-size: 0.9rem;
        font-family: inherit;
        box-sizing: border-box;

        &::placeholder {
            color: ${theme.components.input.placeholderColor};
        }

        &:focus {
            outline: 2.5px solid ${theme.baseColors.tertiary};
            box-shadow: 0 0 8px 4px rgba(30, 169, 65, 0.2);
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
                border: 2px solid red;
            }
        `}
    `}
`;

export const StyledInput = styled.input<{
    status: InputProps['status'];
}>`
    ${sharedInputStyles}
    height: 40px;
`;

export const StyledTextarea = styled.textarea<{
    status: InputProps['status'];
}>`
    ${sharedInputStyles}
    display: block;
    height: auto;
    min-height: 100px;
    max-height: 300px;
    resize: vertical;
    line-height: 1.5;
    border: none;
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
            ...restProps
        },
        ref,
    ) => {
        const [value, setValue] = useState(defaultValue);

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
                {isTextarea ? (
                    <StyledTextarea
                        {...restProps}
                        status={status}
                        ref={ref as Ref<HTMLTextAreaElement>}
                        value={value}
                        onChange={handleChange}
                    />
                ) : (
                    <StyledInput
                        {...restProps}
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
