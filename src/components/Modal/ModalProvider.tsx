import { ReactNode, useCallback, useState } from 'react';
import Modal, { ModalProps } from './Modal';
import { ModalContext } from './ModalContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalConfig, setModalConfig] = useState<ModalProps | null>(null);

    const openModal = useCallback((modalConfig: ModalProps) => {
        setModalConfig(modalConfig);
    }, []);

    const closeModal = useCallback(() => {
        setModalConfig(null);
        modalConfig?.onDismiss?.();
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalConfig && <Modal {...modalConfig} onDismiss={closeModal} />}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
