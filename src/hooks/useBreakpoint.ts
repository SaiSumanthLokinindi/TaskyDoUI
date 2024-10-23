import { useLayoutEffect, useState } from 'react';
import { debounce } from 'src/shared/utils';

const windowIsAvailable = typeof window !== 'undefined';

const breakpointsMap = {
    sm: '480px',
    md: '759px',
    lg: '1280px',
    xl: '1980px',
};

const useBreakpoint = (breakpoint: 'sm' | 'md' | 'lg' | 'xl') => {
    const [matches, setMatches] = useState(
        windowIsAvailable
            ? window.matchMedia(`(min-width:${breakpointsMap[breakpoint]})`)
                  .matches
            : false,
    );

    const onResize = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
    };

    const resizeHandler = debounce(() => {
        setMatches(
            window.innerWidth >=
                parseInt(breakpointsMap[breakpoint].split('p')[0]),
        );
    });

    useLayoutEffect(() => {
        if (windowIsAvailable) {
            const mediaMatch = window.matchMedia(
                `(min-width:${breakpointsMap[breakpoint]})`,
            );
            const mediaMatchAvailable = 'addEventListener' in mediaMatch;

            if (mediaMatchAvailable) {
                mediaMatch.addEventListener('change', onResize);
            } else {
                window.addEventListener('resize', resizeHandler);
            }

            return () => {
                if (mediaMatchAvailable)
                    mediaMatch.removeEventListener('change', onResize);
                else window.removeEventListener('resize', resizeHandler);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return matches;
};

export default useBreakpoint;
