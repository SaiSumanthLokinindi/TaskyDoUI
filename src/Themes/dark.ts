import { Theme } from './theme.types';

const dark = {
    spacing: '0.5rem',
    baseColors: {
        primary: '#0D0D0D',
        secondary: '#1C1C1C',
        tertiary: '#1EA941',
        error: 'red',
        clicked: '#1C943A',
        secondaryHover: 'rgba(171,171,171,0.25)',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#8D8D8D',
        disabled: 'rgba(143, 143, 143, 0.2)',
        helperText: {
            size: {
                lg: '1rem',
                md: '0.75rem',
                sm: '0.5rem',
            },
            color: '#8D8D8D',
            lineHeight: 1,
        },
    },
    components: {
        input: {
            backgroundColor: '#2a2a2a',
            placeholderColor: 'rgba(255, 255, 255, 0.3)',
            textColor: '#FFFFFF',
            shadow: '0 0 4px 1px rgba(0,0,0,0.15)',
            disabledBackgroundColor: 'rgba(61, 61, 61, 0.3)',
            info: {
                size: '0.75rem',
            },
        },
        button: {},
        text: {
            size: {
                xs: '0.694rem',
                sm: '0.833',
                rg: '1rem',
                md: '1.2rem',
                lg: '1.44rem',
                xl: '1.728rem',
                xxl: '2.074rem',
                xxxl: '2.488rem',
                title: '2.2986rem',
            },
        },
    },
    breakpoints: {
        sm: '480px',
        md: '759px',
        lg: '1280px',
        xl: '1980px',
    },
};

export default dark;
