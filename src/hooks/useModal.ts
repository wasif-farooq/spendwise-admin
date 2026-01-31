import { useState, useCallback } from 'react';

/**
 * Hook to manage modal open/close state.
 * Semantically similar to useToggle but intended for Modals/Dialogs.
 * @param initialOpen Initial open state (default: false)
 */
export function useModal<T = any>(initialOpen: boolean = false) {
    const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
    const [data, setData] = useState<T | null>(null);

    const open = useCallback((modalData?: T) => {
        if (modalData) setData(modalData);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setData(null);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return {
        isOpen,
        data,
        open,
        close,
        toggle,
    };
}

export default useModal;
