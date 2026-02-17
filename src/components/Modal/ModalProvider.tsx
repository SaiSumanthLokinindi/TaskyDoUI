import { ReactNode, useCallback, useState } from 'react';
import Modal, { ModalProps } from './Modal';
import { ModalContext } from './ModalContext';
import { Action } from '../Actions/Actions';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalConfig, setModalConfig] = useState<ModalProps | null>(null);
    const [dynamicActions, setDynamicActions] = useState<Action[]>([]);

    const openModal = useCallback((modalConfig: ModalProps) => {
        setModalConfig(modalConfig);
    }, []);

    const closeModal = useCallback(() => {
        setModalConfig(null);
        modalConfig?.onDismiss?.();
    }, []);

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
                    onDismiss={closeModal}
                />
            )}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
