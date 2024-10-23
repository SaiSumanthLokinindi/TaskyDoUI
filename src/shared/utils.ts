/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounce = <F extends (...args: any[]) => any>(
    fn: F,
    waitTime = 200,
): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return function debounced(this: any, ...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = undefined;
            fn.apply(this, args);
        }, waitTime);
    };
};
