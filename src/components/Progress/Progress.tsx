import { memo } from 'react';
import styled, { css } from 'styled-components';

const StyledProgress = styled.progress(
    ({
        theme: {
            baseColors: { tertiary },
            spacing,
        },
    }) => {
        return css`
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
            height: 4px;
            border: none;
            border-radius: 999px;
            overflow: hidden;
            margin-block: ${spacing} calc(0.5 * ${spacing});

            &::-webkit-progress-bar {
                background-color: #3a3a3a;
                border-radius: 999px;
            }

            &::-webkit-progress-value {
                background-color: ${tertiary};
                border-radius: 999px;
                transition: width 0.2s ease;
            }

            &::-moz-progress-bar {
                background-color: ${tertiary};
                border-radius: 999px;
                transition: width 0.2s ease;
            }
        `;
    },
);

interface ProgressProps {
    value: string;
    /**
     * @default 100
     */
    max?: string;
}

const Progress = memo(({ value, max = '100' }: ProgressProps) => {
    return <StyledProgress max={max} value={value}></StyledProgress>;
});

export default Progress;
