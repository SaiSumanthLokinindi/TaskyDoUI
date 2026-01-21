import { createContext, useContext } from 'react';
import { ModalProps } from './Model';

type ModalContextType = {
    openModal: (modalConfig: ModalProps) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return ctx;
};
