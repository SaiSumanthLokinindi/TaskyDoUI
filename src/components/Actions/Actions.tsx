import { memo } from 'react';
import Button, { ButtonProps } from '../Button/button';
import styled from 'styled-components';
import { BaseUIProps } from 'src/types/base.types';

export type Action = {
    label: string;
} & Partial<ButtonProps>;

export const StyledAction = styled(Button)``;
export interface ActionsProps extends BaseUIProps<HTMLButtonElement> {
    actions: Action[];
}

const Actions = memo(({ actions, ...restProps }: ActionsProps) => {
    return actions.map(({ label, ...actionProps }) => {
        return (
            <StyledAction {...restProps} {...actionProps} key={label}>
                {label}
            </StyledAction>
        );
    });
});

export default Actions;
