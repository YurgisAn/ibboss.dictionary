import { useEffect } from 'react';

export const useMousedownOutside = (ref: any, action: () => void, condition = true) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (condition && ref.current && !ref.current.contains(event.target)) action();
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, action, condition]);
};
