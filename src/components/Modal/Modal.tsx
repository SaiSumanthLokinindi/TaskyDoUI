import { ElementType, memo, ReactNode, useState } from 'react';
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

const Modal = memo(({ body, title, actions, onDismiss }: ModalProps) => {
    const isMobile = !useBreakpoint('md');
    const [isClosing, setIsClosing] = useState(false);

    const ModalComponent: ElementType = isMobile
        ? StyledModalMobile
        : StyledModalDesktop;

    const handleDismiss = () => {
        if (isClosing) return;
        setIsClosing(true);
    };

    const handleAnimationEnd = (e: AnimationEvent) => {
        if (
            e.animationName === 'mobileExit' ||
            e.animationName === 'desktopExit'
        ) {
            setIsClosing(false);
            onDismiss?.();
        }
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
                    <Button onClick={handleDismiss} variant="basic">
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
});

export default Modal;
