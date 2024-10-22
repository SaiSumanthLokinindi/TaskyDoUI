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

export interface InputProps {
    defaultValue?: string;
    disabled?: boolean;
    info?: string | string[];
    name?: string;
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e?: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e?: FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    status?: 'error' | 'info' | 'warning';
    type?: string;
}

const StyledInputWrapper = styled.div`
    width: 100%;
`;

export const StyledInput = styled.input<{ status: InputProps['status'] }>(
    ({ status, theme }) => {
        return css`
            background-color: ${theme.components.input.backgroundColor};
            color: ${theme.text.primary};
            appearance: none;
            outline: none;
            border: 2px solid transparent;
            border-radius: 4px;
            height: 40px;
            padding: ${theme.spacing} calc(2 * ${theme.spacing});
            width: 100%;
            font-size: 0.9rem;
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
                background-color: ${theme.components.input
                    .disabledBackgroundColor};

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
        `;
    },
);

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

// StyledInput.defaultProps = Theme

const Input = forwardRef(
    (
        {
            type = 'text',
            defaultValue = '',
            onChange,
            info,
            status,
            ...restProps
        }: PropsWithoutRef<InputProps>,
        ref?: Ref<HTMLInputElement>,
    ) => {
        const [value, setValue] = useState(defaultValue);

        useEffect(() => {
            setValue(defaultValue);
        }, [defaultValue]);

        return (
            <StyledInputWrapper>
                <StyledInput
                    {...restProps}
                    status={status}
                    ref={ref}
                    value={value}
                    type={type}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setValue(e.currentTarget.value);
                        onChange?.(e);
                    }}
                ></StyledInput>
                <StyledInfo>
                    {info &&
                        (Array.isArray(info) ? (
                            info.map((message) => <span>{message}</span>)
                        ) : (
                            <span>{info}</span>
                        ))}
                </StyledInfo>
            </StyledInputWrapper>
        );
    },
);

export default Input;
