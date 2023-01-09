import { css } from 'styled-components';

import type { ITheme } from '../../../themes';

/**
 * Дефолтный стиль для иконок
 * @param {theme} theme - Тема
 * @param {boolean} disabled - Выключение иконок
 * @param {boolean} active - Активная иконка
 * @return {css} - Возвращает дефолтный css для иконок
 */

export const getDefaultIconStyled = (theme: ITheme, disabled = false, active = false) => {
  const fill = disabled ? theme.color.neutral[30] : theme.color.neutral[50];
  return css`
    fill: ${active ? theme.color.primary[60] : fill};
    cursor: ${disabled ? 'default' : 'pointer'};
    &:hover {
      fill: ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
    }
  `;
};
