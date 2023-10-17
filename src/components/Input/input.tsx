import { ChangeEvent, FocusEvent, useState, useEffect, Ref, forwardRef } from "react";
import styled, { css } from "styled-components";
import {Theme} from '../../Themes/theme.types'
import PolymorphicComponent from "../PolymorhicComponent/polymorphicComponent";

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
    ref?: Ref<HTMLInputElement> | null;
}

const StyledInput = styled.input(({theme})=>{
    return css`
        background-color: ${theme.components.input.backgroundColor};
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
        box-shadow: ${theme.components.input.shadow};
        
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
        }
    `
})

// StyledInput.defaultProps = Theme

const Input = forwardRef(({ type = 'text', defaultValue = '', placeholder, required, readOnly, disabled, onChange, onFocus, onBlur }: InputProps, ref: Ref<HTMLInputElement>) => {

    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])
    

    return <PolymorphicComponent as={StyledInput} ref={ref} value={value} required={required} readOnly={readOnly} disabled={disabled} type={type} placeholder={placeholder} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value);
        onChange?.(e);
    }} onFocus={onFocus} onBlur={onBlur}></PolymorphicComponent>
})

export default Input;