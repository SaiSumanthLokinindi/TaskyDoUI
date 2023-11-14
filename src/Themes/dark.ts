import { Theme } from './theme.types';

const dark = {
    baseColors: {
        primary: '#080808',
        secondary: '#1EA941',
        error: 'red',
        clicked: '#1C943A',
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
    },
    spacing: '0.5rem',
};

export default dark;
