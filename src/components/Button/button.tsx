import styled, {css} from "styled-components";
import PolymorphicComponent from "../PolymorhicComponent/polymorphicComponent";
import { ReactNode, Ref } from "react";

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
    `
})

export interface ButtonProps{
    children: ReactNode;
    id?: string;
    onBlur?: ()=> void;
    onClick?: ()=> void;
    onFocus?: ()=> void;
    disabled?: boolean;
    ref?: Ref<HTMLButtonElement> | null
}

const Button = ({children}:ButtonProps)=>{
    return <PolymorphicComponent as={StyledButton}>{children}</PolymorphicComponent>
}

export default Button;