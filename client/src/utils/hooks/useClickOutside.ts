import { useEffect, useRef } from 'react';

const useClickOutside = (handler: (event: MouseEvent | TouchEvent) => void) => {
    const ref = useRef(null);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !(ref.current as HTMLElement).contains(event.target as Node)) {
                handler(event);
            }
        };

        document.addEventListener('mousedown', listener as EventListener);
        document.addEventListener('touchstart', listener as EventListener);

        return () => {
            document.removeEventListener('mousedown', listener as EventListener);
            document.removeEventListener('touchstart', listener as EventListener);
        };
    }, [handler]);

    return ref;
};

export default useClickOutside;
