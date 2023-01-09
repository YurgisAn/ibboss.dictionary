import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { stylePoint } from './utils-style';

export interface IPointItemProps {
  animation?: boolean;
  active?: boolean;
  disabled?: boolean;
}

const getBackGroundPoint = (disabled = false, active = false, theme) => {
  if (disabled) return 'none';
  if (active) return theme.color.primary[70];
  return theme.color.primary[30];
};

export const PointItem = styled.div<IPointItemProps>`
  ${({ animation, theme, active, disabled }) => css`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    cursor: ${disabled ? 'default' : 'pointer'};
    transition: ${disabled ? 'none' : animation ? 'all  ease-in 0.3s' : 'none'};
    background: ${getBackGroundPoint(disabled, active, theme)};
    ${stylePoint(theme, disabled)}
  `}
`;

PointItem.defaultProps = {
  theme: DEFAULT_THEME,
};
