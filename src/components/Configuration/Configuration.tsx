import { ReactNode } from 'react';
import { createGlobalStyle, css, ThemeProvider } from 'styled-components';
import darkTheme from '../../Themes/dark.js';

interface ConfigurationProps {
    children: ReactNode | string | null;
}

const GlobalStyles = createGlobalStyle(({ theme }) => {
    return css`
        :root {
            font-size: 16px;
            height: 100%;
            margin: 0;
        }

        * {
            font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
            font-weight: 400;
        }

        body {
            background-color: ${theme.baseColors.primary};
            color: ${theme.text.primary};
            margin: 0;
            box-sizing: border-box;
        }

        /* Global scrollbar styles for all scrollable elements */
        *::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        *::-webkit-scrollbar-track {
            background: transparent;
        }

        *::-webkit-scrollbar-thumb {
            background: ${theme.baseColors.secondaryHover};
            border-radius: 4px;
        }

        *::-webkit-scrollbar-thumb:hover {
            background: ${theme.text.secondary};
        }

        #root {
            height: 100%;
        }
    `;
});

const Configuration = ({ children }: ConfigurationProps) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    );
};

export default Configuration;
