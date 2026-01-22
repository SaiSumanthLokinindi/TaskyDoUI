import styled, { css } from 'styled-components';

export const StyledLoader = styled.div<{ strokeThickness?: string }>(
    ({ strokeThickness }) => {
        return css`
            height: 1rem;
            width: 1rem;
            border-radius: 50%;
            border: 3px solid white;
            border-top-color: transparent;
            animation: rotate 1s infinite linear;

            ${strokeThickness && `border: ${strokeThickness}px solid white;`}

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(180deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
    },
);

export interface LoaderProps {
    strokeThickness?: string;
}

const Loader = ({ strokeThickness }: LoaderProps) => {
    return <StyledLoader />;
};

export default Loader;
