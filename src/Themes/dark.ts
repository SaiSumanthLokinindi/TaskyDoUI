const palette = {
    green500: '#1EA941',
    brandAccent: '#2BEE6C',
    orange400: '#D27D1B',
    red400: '#D14F4F',
    red600: '#ca3535ff',
    white200: '#E0E0E0',
    blue600: '#008BFF',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',
};

const dark = {
    spacing: '0.5rem',
    baseColors: {
        primary: '#0D0D0D',
        secondary: '#1C1C1C',
        tertiary: palette.brandAccent,
        clicked: '#1C943A',
        secondaryHover: 'rgba(171,171,171,0.25)',
        success: palette.green500,
        warning: palette.orange400,
        danger: palette.red400,
        error: palette.red600,
        info: palette.blue600,
        neutral: palette.gray200,
        default: palette.white200,
        fadedGray: palette.gray300,
    },
    priority: {
        colors: {
            general: palette.white200,
            low: palette.green500,
            medium: palette.orange400,
            high: palette.red400,
            critical: palette.red600,
        },
    },
    text: {
        primary: palette.white200,
        heading: '#FFFFFF',
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
            placeholderColor: 'rgba(255, 255, 255, 0.2)',
            textColor: palette.white200,
            shadow: '0 0 4px 1px rgba(0,0,0,0.15)',
            disabledBackgroundColor: 'rgba(61, 61, 61, 0.3)',
            info: {
                size: '0.75rem',
            },
        },
        button: {},
        text: {
            size: {
                xxs: '0.694rem',
                xs: '0.75rem',
                sm: '0.833rem',
                rg: '1rem',
                md: '1.2rem',
                lg: '1.44rem',
                xl: '1.728rem',
                xxl: '2.074rem',
                xxxl: '2.488rem',
                title: '2.2986rem',
            },
        },
        badge: {
            colors: {
                info: palette.white200,
            },
        },
    },
    breakpoints: {
        sm: '480px',
        md: '759px',
        lg: '1280px',
        xl: '1536px',
        xxl: '1980px',
    },
};

export default dark;
