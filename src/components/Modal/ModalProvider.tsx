import { ReactNode, useCallback, useState } from 'react';
import Modal, { ModalProps } from './Modal';
import { ModalContext } from './ModalContext';
import { Action } from '../Actions/Actions';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalConfig, setModalConfig] = useState<ModalProps | null>(null);
    const [dynamicActions, setDynamicActions] = useState<Action[]>([]);
    const [isClosing, setIsClosing] = useState(false);

    const openModal = useCallback((modalConfig: ModalProps) => {
        setModalConfig(modalConfig);
    }, []);

    const closeModal = useCallback(() => {
        if (isClosing) return;
        setIsClosing(true);
    }, [isClosing]);

    const onModalClose = useCallback(() => {
        if (!isClosing) return;
        setModalConfig(null);
        modalConfig?.onDismiss?.();
        setIsClosing(false);
    }, [isClosing, modalConfig]);

    return (
        <ModalContext.Provider
            value={{ openModal, closeModal, setActions: setDynamicActions }}
        >
            {children}
            {modalConfig && (
                <Modal
                    {...modalConfig}
                    actions={
                        modalConfig.actions
                            ? [...modalConfig.actions, ...dynamicActions]
                            : dynamicActions
                    }
                    isClosing={isClosing}
                    onRequestClose={closeModal}
                    onExitComplete={onModalClose}
                />
            )}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
