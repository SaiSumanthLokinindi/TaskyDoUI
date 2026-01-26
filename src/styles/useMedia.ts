import { useEffect, useState } from 'react';

const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)',
    portrait: '(orientation: portrait)',
    landscape: '(orientation: landscape)',
};

type MediaState = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
    isLandscape: boolean;
};

const getState = (): MediaState => ({
    isMobile: matchMedia(queries.mobile).matches,
    isTablet: matchMedia(queries.tablet).matches,
    isDesktop: matchMedia(queries.desktop).matches,
    isPortrait: matchMedia(queries.portrait).matches,
    isLandscape: matchMedia(queries.landscape).matches,
});

export const useMedia = () => {
    const [state, setState] = useState(getState());

    useEffect(() => {
        const mqls = Object.values(queries).map((query) => matchMedia(query));

        const handler = () => {
            setState(getState());
        };
        mqls.forEach((mq) => mq.addEventListener('change', handler));

        return () => {
            mqls.forEach((mq) => mq.removeEventListener('change', handler));
        };
    }, []);

    return state;
};
