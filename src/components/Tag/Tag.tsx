import { memo, MouseEvent } from 'react';
import styled, { css, useTheme } from 'styled-components';
import Flex from '../Flex/flex';
import { GrClose } from 'react-icons/gr';
import Button, { StyledButton } from '../Button/button';
import { BaseUIProps } from 'src/types/base.types';

export interface TagProps extends BaseUIProps {
    id: string;
    label: string;
    readOnly?: boolean;
    onRemove?: (id: TagProps['id'], e?: MouseEvent<HTMLButtonElement>) => void;
}

export const StyledTag = styled(Flex)(({ theme }) => {
    return css`
        background-color: #393939;
        color: ${theme.baseColors.dimWhite};
        padding: ${theme.spacing} calc(2 * ${theme.spacing});
        border-radius: 24px;
        font-size: 0.8rem;
        font-weight: 500;

        ${StyledButton} {
            padding: calc(0.5 * ${theme.spacing});
            font-size: 0.625rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
    `;
});

const Tag = memo(
    ({ id, label, onRemove, readOnly = false, ...restProps }: TagProps) => {
        const theme = useTheme();

        return (
            <StyledTag
                {...restProps}
                id={id}
                inline
                alignItems="center"
                columnGap={`calc(0.5 * ${theme.spacing})`}
                style={{
                    paddingInlineEnd:
                        !readOnly && onRemove
                            ? `calc(0.5 * ${theme.spacing})`
                            : `calc(2 * ${theme.spacing})`,
                }}
            >
                <span>#{label}</span>
                {!readOnly && onRemove && (
                    <Button
                        variant="simple"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            onRemove?.(id, e);
                        }}
                    >
                        <GrClose />
                    </Button>
                )}
            </StyledTag>
        );
    },
);

export default Tag;
