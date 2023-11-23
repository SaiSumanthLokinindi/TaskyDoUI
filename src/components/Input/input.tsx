import {
    ChangeEvent,
    FocusEvent,
    useState,
    useEffect,
    Ref,
    forwardRef,
    PropsWithoutRef,
} from 'react';
import styled, { css } from 'styled-components';

export interface InputProps {
    defaultValue?: string;
    disabled?: boolean;
    info?: string | string[];
    name?: string;
    onBlur?: (e?: FocusEvent<HTMLInputElement>) => void;
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
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

export const StyledInput = styled.input(({ theme }) => {
    return css`
        background-color: ${theme.components.input.backgroundColor};
        color: ${theme.text.primary};
        appearance: none;
        outline: none;
        border: none;
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
            outline: 2.5px solid ${theme.baseColors.secondary};
            box-shadow: 0 0 8px 4px rgba(30, 169, 65, 0.2);
        }

        &:disabled {
            color: ${theme.text.disabled};
            background-color: ${theme.components.input.disabledBackgroundColor};

            &::placeholder {
                color: ${theme.text.disabled};
            }
        }
    `;
});

export const StyledInfo = styled.div(({ theme }) => {
    return css`
        font-size: ${theme.text.helperText.size.md};
        color: ${theme.text.helperText.color};
        overflow-wrap: anywhere;
    `;
});

// StyledInput.defaultProps = Theme

const Input = forwardRef(
    (
        {
            type = 'text',
            defaultValue = '',
            onChange,
            info,
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
                            info.map((message) => <div>{message}</div>)
                        ) : (
                            <div>{info}</div>
                        ))}
                </StyledInfo>
            </StyledInputWrapper>
        );
    },
);

export default Input;
