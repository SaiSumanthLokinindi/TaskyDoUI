import { memo, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Card from '../Card/card';
import { createPortal } from 'react-dom';
import Flex from '../Flex/flex';
import Button, { StyledButton } from '../Button/button';
import { GrClose } from 'react-icons/gr';
import Text from '../Text/Text';
import Actions, { Action } from '../Actions/Actions';

const StyledBackdrop = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const slideUpFadeIn = keyframes`
    from{
        transform: translate(-50%,calc(-50% + 15px));
        opacity: 0;
    }
    to{
        transform: translate(-50%,-50%);
        opacity: 1;
    }
`;

const StyledModal = styled(Card)(({ theme: { spacing } }) => {
    return css`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 600px;
        height: auto;
        max-height: 900px;
        z-index: 1000;
        padding: calc(2 * ${spacing});
        display: flex;
        flex-direction: column;
        row-gap: calc(2 * ${spacing});
        animation: ${slideUpFadeIn} 0.3s ease-in-out forwards;
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.25);
    `;
});

export const StyledModalHeader = styled(Flex)(({ theme }) => {
    return css`
        flex-shrink: 0;
        ${StyledButton} {
            font-size: 0.825rem;
            padding: ${theme.spacing} ${theme.spacing};
            display: flex;
            align-items: center;
            border-radius: 50%;
        }
    `;
});
export const StyledModalBody = styled(Flex)`
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
`;
export const StyledModalFooter = styled(Flex)(({ theme }) => {
    return css`
        flex-shrink: 0;
        ${StyledButton} {
            font-size: 0.8rem;
            padding: calc(1 * ${theme.spacing}) calc(3 * ${theme.spacing});
        }
    `;
});

export interface ModalProps {
    title: string;
    body: ReactNode;
    actions?: Action[];
    onDismiss?: () => void;
}

const Modal = memo(({ body, title, actions, onDismiss }: ModalProps) => {
    return createPortal(
        <>
            <StyledBackdrop />
            <StyledModal>
                <StyledModalHeader justifyContent="space-between">
                    <Text variant="h5">{title}</Text>
                    <Button onClick={onDismiss} variant="basic">
                        <GrClose />
                    </Button>
                </StyledModalHeader>
                <StyledModalBody>{body}</StyledModalBody>

                {actions?.length && (
                    <StyledModalFooter
                        justifyContent="flex-end"
                        columnGap="0.5rem"
                    >
                        <Actions actions={actions} />
                    </StyledModalFooter>
                )}
            </StyledModal>
        </>,
        document.getElementById('modal-root')!,
    );
});

export default Modal;
