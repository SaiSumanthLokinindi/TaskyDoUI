export const breakpoints = {
    xs: '375px',
    sm: '480px',
    md: '760px',
    lg: '1280px',
    xl: '1536px',
    xxl: '1920px'
} as const;

export type Breakpoint = keyof typeof breakpoints;