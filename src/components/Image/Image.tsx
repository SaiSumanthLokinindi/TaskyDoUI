import { FC, memo } from 'react';
import styled, { css } from 'styled-components';

export interface ImageProps {
    src: string;
    alt?: string;
}

export const StyledImage = styled.img(() => {
    return css`
        max-width: 100%;
    `;
});

const Image: FC<ImageProps> = memo((props) => {
    return <StyledImage {...props} />;
});

export default Image;
