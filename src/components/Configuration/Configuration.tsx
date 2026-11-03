import { ReactNode } from 'react';
import { createGlobalStyle, css, ThemeProvider } from 'styled-components';
import darkTheme from '../../themes/dark.js';

interface ConfigurationProps {
    children: ReactNode | string | null;
}

const GlobalStyles = createGlobalStyle(({ theme }) => {
    return css`
        :root {
            font-size: 16px;
            height: 100%;
            margin: 0;

            --mobile-nav-height: 48px;
            --mobile-nav-bottom-offset: 12px;
            --mobile-nav-gap: 12px;

            --mobile-nav-clearance: calc(
                var(--mobile-nav-height) + var(--mobile-nav-bottom-offset) +
                    var(--mobile-nav-gap) + env(safe-area-inset-bottom, 0px)
            );
        }

        * {
            font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
            font-weight: 400;
        }

        body {
            background-color: ${theme.baseColors.primary};
            color: ${theme.text.primary};
            margin: 0;
            height: 100%;
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
