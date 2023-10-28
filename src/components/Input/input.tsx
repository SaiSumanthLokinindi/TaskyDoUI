import { ChangeEvent, FocusEvent, useState, useEffect, Ref, forwardRef, PropsWithoutRef } from "react";
import styled, { css } from "styled-components";
import PolymorphicComponent from "../PolymorphicComponent/polymorphicComponent";

export interface InputProps {
    type?: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input(({theme})=>{
    return css`
        background-color: #3D3D3D;
        color: ${theme.text.primary};
        appearance: none;
        outline: none;
        border: none;
        border-radius: 4px;
        height: 32px;
        padding: ${theme.spacing} calc(2* ${theme.spacing});
        width: 100%;
        max-width: 250px;
        font-size: 0.9rem;
        /* box-shadow: ${theme.components.input.shadow}; */
        
        &::placeholder{
            color: ${theme.components.input.placeholderColor}
        }

        &:focus{
            outline: 2.5px solid ${theme.baseColors.secondary};
            box-shadow: 0 0 8px 4px rgba(30, 169, 65, 0.2);
        }

        &:disabled{
            color: ${theme.text.disabled};
            background-color: ${theme.components.input.disabledBackgroundColor};

            &::placeholder{
                color: ${theme.text.disabled};
            }
        }
    `
})

// StyledInput.defaultProps = Theme

const Input = forwardRef(({ type = 'text', defaultValue = '', onChange, ...restProps }: PropsWithoutRef<InputProps>, ref?: Ref<HTMLInputElement>) => {

    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])
    

    return <StyledInput ref={ref} value={value}  type={type} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value);
        onChange?.(e);
    }} {...restProps}></StyledInput>
})

export default Input;