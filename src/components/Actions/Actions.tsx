import { memo, MouseEvent } from 'react';
import Button, { ButtonProps } from '../Button/button';

export type Action = {
    label: string;
    onClick: (e?: MouseEvent<HTMLElement>) => void;
    variant?: Exclude<ButtonProps['variant'], 'link'>;
};

export interface ActionsProps {
    actions: Action[];
}

const Actions = memo(({ actions }: ActionsProps) => {
    return actions.map((action) => {
        return (
            <Button
                key={action.label}
                onClick={action.onClick}
                variant={action.variant}
            >
                {action.label}
            </Button>
        );
    });
});

export default Actions;
