export const debounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number,
): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | undefined = undefined;

    return function (this: any, ...args: Parameters<T>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
};
