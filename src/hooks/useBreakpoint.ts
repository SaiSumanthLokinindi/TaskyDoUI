import { useLayoutEffect, useState } from 'react';
import { debounce } from 'src/shared/utils';
import {breakpoints, type Breakpoint} from 'src/styles/breakpoints'

const windowIsAvailable = typeof window !== 'undefined';



const useBreakpoint = (breakpoint: Breakpoint) => {
    const [matches, setMatches] = useState(
        windowIsAvailable
            ? window.matchMedia(`(min-width:${breakpoints[breakpoint]})`)
                  .matches
            : false,
    );

    const onResize = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
    };

    const resizeHandler = debounce(() => {
        setMatches(
            window.innerWidth >=
                parseInt(breakpoints[breakpoint].split('p')[0]),
        );
    });

    useLayoutEffect(() => {
        if (windowIsAvailable) {
            const mediaMatch = window.matchMedia(
                `(min-width:${breakpoints[breakpoint]})`,
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
