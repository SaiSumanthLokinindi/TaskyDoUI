import styled, {css} from "styled-components";
import PolymorphicComponent from "../PolymorhicComponent/polymorphicComponent";
import { PropsWithoutRef, ReactNode, Ref, forwardRef } from "react";

const StyledButton = styled.button(({theme})=>{
    return css`
        font-size: 0.85rem;
        appearance: none;
        height: 40px;
        width: auto;
        border: none;
        outline: none;
        padding: ${theme.spacing} calc(2 * ${theme.spacing});
        background-color: ${theme.baseColors.secondary};
        border-radius: 4px;
        font-weight: 500;
        min-width: 90px;
        color: ${theme.text.primary};
        box-shadow: 0 0 1px 4px rgba(0,0,0, 0.15);
        
        &:hover{
            background-color: #26BC4C;
            box-shadow: 0 0 2px 6px rgba(0,0,0, 0.25);
            cursor: pointer;
        }

        &:active{
            background-color: #1B9339;
            box-shadow:  0 0 1px 4px rgba(0,0,0, 0.15);
        }

        &:focus{
            outline: 2px solid ${theme.baseColors.secondary};
            outline-offset: 2px;
        }

        &:disabled{
            background-color: #5D8B68;
            color: rgba(255, 255, 255, 0.65);
            cursor: default;
        }
        
        `
})

export interface ButtonProps{
    children: ReactNode;
    disabled?: boolean;
    id?: string;
    onBlur?: ()=> void;
    onClick?: ()=> void;
    onFocus?: ()=> void;
}

const Button = forwardRef(({children, ...restProps}:PropsWithoutRef<ButtonProps>, ref?:Ref<HTMLButtonElement | null>)=>{
    return <PolymorphicComponent as={StyledButton} ref={ref} {...restProps}>{children}</PolymorphicComponent>
})

export default Button;