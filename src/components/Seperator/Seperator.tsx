import { memo } from 'react';
import styled from 'styled-components';

const StyledSeparator = styled.hr`
    border: none;
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.baseColors.secondaryHover};
    margin-block: -8px;
`;

const Separator = memo(() => {
    return <StyledSeparator />;
});

export default Separator;
