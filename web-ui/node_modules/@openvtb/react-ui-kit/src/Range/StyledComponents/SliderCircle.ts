import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { stylePoint } from './utils-style';
export interface ISliderCirleProps {
  disabled?: boolean;
}

export const SliderCircle = styled.div<ISliderCirleProps>`
  ${({ theme, disabled }) => css`
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${disabled ? theme.color.neutral[20] : theme.color.primary[60]};
    box-shadow: ${theme.boxShadow[2]};
    cursor: ${disabled ? 'default' : 'pointer'};
    ${stylePoint(theme, disabled)}
    pointer-events:${disabled ? 'none' : 'auto'};
  `}
`;

SliderCircle.defaultProps = {
  theme: DEFAULT_THEME,
};
