import { ReactNode } from "react";
import { createGlobalStyle, css, ThemeProvider } from "styled-components";
import darkTheme from '../../Themes/dark.js';
import { Theme } from "../../Themes/theme.types.js";


interface ConfigurationProps{
    children: ReactNode | string | null;
}

const GlobalStyles = createGlobalStyle(({theme})=>{
    return css`
        * {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
    }

    body{
        background-color: ${theme.baseColors.primary};
        color: ${theme.text.primary}
    }

    `
})

    


const Configuration = ({children}: ConfigurationProps) =>{
    return (
    <>
    <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        {children}
        </ThemeProvider>
    </>
    )
}

export default Configuration;