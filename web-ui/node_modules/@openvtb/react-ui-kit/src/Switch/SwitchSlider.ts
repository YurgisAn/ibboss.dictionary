import styled, { css } from 'styled-components';
import { size as Size } from 'polished';

import { DEFAULT_THEME } from '../common';

const BORDER_RADIUS_BIG = '10px';
const BORDER_RADIUS_SMALL = '12px';

const INNER_CIRCLE_BORDER_WIDTH = '2px';
const INNER_CIRCLE_SIZE_BIG = '20px';
const INNER_CIRCLE_SIZE_SMALL = '16px';

const LABEL_MARGIN = '8px';

const OUTER_CIRCLE_LEFT_BIG = '14px';
const OUTER_CIRCLE_LEFT_SMALL = '10px';

const OUTER_CIRCLE_SIZE_BIG = '48px';
const OUTER_CIRCLE_SIZE_SMALL = '36px';

const OUTER_CIRCLE_TOP_BIG = '14px';
const OUTER_CIRCLE_TOP_SMALL = '10px';

const SWITCH_HEIGHT_BIG = '20px';
const SWITCH_HEIGHT_SMALL = '16px';

const SWITCH_WIDTH_BIG = '36px';
const SWITCH_WIDTH_SMALL = '28px';

export type LabelPosition = 'right' | 'left';
export type Size = 'big' | 'small';

interface ISwitchSliderProps {
  checked: boolean;
  disabled: boolean;
  labelPosition: LabelPosition;
  size: Size;
}

export const SwitchSlider = styled.div<ISwitchSliderProps>`
  object-fit: contain;
  position: relative;
  box-sizing: content-box !important;
  transition: 0.2s;

  ${({ size, labelPosition }) => css`
    ${size === 'small'
      ? Size(SWITCH_HEIGHT_SMALL, SWITCH_WIDTH_SMALL)
      : Size(SWITCH_HEIGHT_BIG, SWITCH_WIDTH_BIG)}
    border-radius: ${size === 'small' ? BORDER_RADIUS_SMALL : BORDER_RADIUS_BIG};
    ${labelPosition === 'right'
      ? `margin-right: ${LABEL_MARGIN};`
      : `margin-left: ${LABEL_MARGIN};`}
  `}

  ${({ checked, disabled, theme }) =>
    disabled
      ? css`
          background-color: ${theme.color.neutral[30]};
        `
      : css`
          background-color: ${checked ? theme.color.primary[60] : theme.color.neutral[50]};
          &:hover {
            background-color: ${checked ? theme.color.primary[70] : theme.color.neutral[60]};
            &:before {
              border-color: ${checked ? theme.color.primary[70] : theme.color.neutral[60]};
            }
          }
        `};

  &:before {
    content: '';
    position: relative;
    display: inline-block;
    transition: 0.2s;
    box-sizing: border-box;

    ${({ size, theme }) => css`
      ${size === 'small' ? Size(INNER_CIRCLE_SIZE_SMALL) : Size(INNER_CIRCLE_SIZE_BIG)}
      background-color: ${theme.color.neutral.white};
    `}
    border-radius: 50%;
    border: ${INNER_CIRCLE_BORDER_WIDTH} solid
      ${({ checked, disabled, theme }) => {
        if (disabled) {
          return theme.color.neutral[30];
        }
        return checked ? theme.color.primary[60] : theme.color.neutral[50];
      }};
  }

  &:after {
    content: '';
    position: absolute;
    transition: 0.2s;
    box-sizing: border-box;
    ${({ size }) => css`
      ${size === 'small' ? Size(OUTER_CIRCLE_SIZE_SMALL) : Size(OUTER_CIRCLE_SIZE_BIG)}
      top: -${size === 'small' ? OUTER_CIRCLE_TOP_SMALL : OUTER_CIRCLE_TOP_BIG};
      left: -${size === 'small' ? OUTER_CIRCLE_LEFT_SMALL : OUTER_CIRCLE_LEFT_BIG};
    `}
    border-radius: 50%;
    background-color: transparent;
  }
`;

SwitchSlider.defaultProps = {
  theme: DEFAULT_THEME,
};
