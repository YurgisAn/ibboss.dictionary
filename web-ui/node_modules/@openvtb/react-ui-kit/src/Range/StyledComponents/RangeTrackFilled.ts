import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import { TRANSITION_ANIMATION } from '../constants';

export interface IRangeTrackFilledProps {
  disabled?: boolean;
  animation?: boolean;
}

export const RangeTrackFilled = styled.div<IRangeTrackFilledProps>`
  ${({ disabled, theme, animation }) => css`
    display: ${disabled ? 'none' : 'block'};
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: ${theme.color.primary[70]};
    transition: ${animation ? TRANSITION_ANIMATION : 'none'};
  `}
`;

RangeTrackFilled.defaultProps = {
  theme: DEFAULT_THEME,
};
