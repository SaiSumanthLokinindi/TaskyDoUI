import styled from 'styled-components';

export const StyledDialogContainer = styled.div<{
    top: number;
    left: number;
    isVisible: boolean;
}>`
    position: fixed;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
    z-index: 1001;
    background-color: ${({ theme }) => theme.components.input.backgroundColor};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: ${({ theme }) => theme.spacing};
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transform: ${({ isVisible }) =>
        isVisible ? 'translateY(0)' : 'translateY(-10px)'};
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
    max-width: calc(100vw - 20px);
    overflow: auto;
`;
