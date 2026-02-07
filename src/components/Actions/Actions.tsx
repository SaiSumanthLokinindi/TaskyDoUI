import { memo, MouseEvent, HTMLAttributes } from 'react';
import Button, { ButtonProps } from '../Button/button';
import styled from 'styled-components';
import { BaseCustomProps } from 'src/types/base.types';

export type Action = {
    label: string;
    onClick: (e?: MouseEvent<HTMLElement>) => void;
    variant?: Exclude<ButtonProps['variant'], 'link'>;
};

export const StyledAction = styled(Button)``;
export interface ActionsProps
    extends BaseCustomProps,
        HTMLAttributes<HTMLButtonElement> {
    actions: Action[];
}

const Actions = memo(({ actions, ...restProps }: ActionsProps) => {
    return actions.map((action) => {
        return (
            <StyledAction
                {...restProps}
                key={action.label}
                onClick={action.onClick}
                variant={action.variant}
            >
                {action.label}
            </StyledAction>
        );
    });
});

export default Actions;
