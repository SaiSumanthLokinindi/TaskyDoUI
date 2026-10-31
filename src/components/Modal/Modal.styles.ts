import styled, { keyframes, css } from "styled-components";
import { StyledButton } from "../Button/button";
import Card from "../Card/card";
import Flex from "../Flex/flex";
import { StyledText } from "../Text/Text";

export const StyledBackdrop = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const desktopEnter = keyframes`
    from{
        transform: translate(-50%,calc(-50% + 15px));
        opacity: 0;
    }
    to{
        transform: translate(-50%,-50%);
        opacity: 1;
    }
`;

export const desktopExit = keyframes`
    from{
        transform: translate(-50%, -50%);
        opacity: 1;
    }
    to{
        transform: translate(-50%,calc(-50% + 15px));
        opacity: 0;
    }
`

export const mobileEnter = keyframes`
    from{
        opacity: 0;
        transform: translateY(15px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;

export const mobileExit = keyframes`
    from{
        opacity: 1;
        transform: translateY(0);
    }
    to{
        opacity: 0;
        transform: translateY(15px);
    }
`

export const StyledModalDesktop = styled(Card)<{$closing: boolean}>(({ theme: { spacing }, $closing }) => {
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
        animation: ${$closing ? desktopExit :desktopEnter} 0.3s ease-in-out forwards;
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.25);
    `;
});

export const StyledModalMobile = styled(Card)<{$closing: boolean}>(({ theme: { spacing }, $closing }) => {
    return css`
        position: fixed;
        inset: 0;
        height: 100%;
        width: 100%;
        z-index: 1000;
        padding: calc(2 * ${spacing});
        display: flex;
        flex-direction: column;
        row-gap: calc(2 * ${spacing});
        animation: ${$closing ? mobileExit : mobileEnter} 0.3s ease-in-out forwards;
    `;
});

export const StyledModalHeader = styled(Flex)(({ theme }) => {
    return css`
        flex-shrink: 0;

        ${StyledText} {
            font-weight: 700;
        }

        ${StyledButton} {
            font-size: 0.625rem;
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