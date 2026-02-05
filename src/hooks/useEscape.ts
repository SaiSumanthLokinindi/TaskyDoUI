import { useEffect } from 'react';

export const useEscape = (callback: () => void) => {
    useEffect(() => {
        const onEscKeyPressHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                callback();
            }
        };

        document.addEventListener('keydown', onEscKeyPressHandler);

        return () => {
            document.removeEventListener('keydown', onEscKeyPressHandler);
        };
    }, [callback]);
};
