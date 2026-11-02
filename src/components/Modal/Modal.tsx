import { ElementType, memo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/button';
import { GrClose } from 'react-icons/gr';
import Text from '../Text/Text';
import Actions, { Action } from '../Actions/Actions';
import useBreakpoint from 'src/hooks/useBreakpoint';
import {
    StyledModalMobile,
    StyledModalDesktop,
    StyledBackdrop,
    StyledModalHeader,
    StyledModalBody,
    StyledModalFooter,
} from './Modal.styles';

export interface ModalProps {
    title: string;
    body: ReactNode;
    actions?: Action[];
    onDismiss?: () => void;
}

export interface ModalViewProps extends ModalProps {
    isClosing: boolean;
    onRequestClose: () => void;
    onExitComplete: () => void;
}

const Modal = memo(
    ({
        body,
        title,
        actions,
        isClosing,
        onRequestClose,
        onExitComplete,
    }: ModalViewProps) => {
        const isMobile = !useBreakpoint('md');

        const ModalComponent: ElementType = isMobile
            ? StyledModalMobile
            : StyledModalDesktop;

        const handleAnimationEnd = (e: AnimationEvent) => {
            if (e.currentTarget !== e.target || !isClosing) return;
            onExitComplete();
        };

        return createPortal(
            <>
                {!isMobile && <StyledBackdrop />}
                <ModalComponent
                    onAnimationEnd={handleAnimationEnd}
                    $closing={isClosing}
                >
                    <StyledModalHeader
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text size="sm">{title}</Text>
                        <Button onClick={onRequestClose} variant="basic">
                            <GrClose />
                        </Button>
                    </StyledModalHeader>
                    <StyledModalBody>{body}</StyledModalBody>

                    {!!actions?.length && (
                        <StyledModalFooter
                            justifyContent="flex-end"
                            columnGap="0.5rem"
                        >
                            <Actions actions={actions} />
                        </StyledModalFooter>
                    )}
                </ModalComponent>
            </>,
            document.getElementById('modal-root')!,
        );
    },
);

export default Modal;
