import styled, { css } from 'styled-components';

import { TRANSITION_ANIMATION } from '../constants';

export interface IRangeSliderProps {
  disabled?: boolean;
  animation?: boolean;
}

export const RangeSlider = styled.div<IRangeSliderProps>`
  ${({ animation }) => css`
    position: absolute;
    width: 14px;
    height: 14px;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 50%;
    top: 1px;
    transition: ${animation ? TRANSITION_ANIMATION : 'none'};
  `}
`;
