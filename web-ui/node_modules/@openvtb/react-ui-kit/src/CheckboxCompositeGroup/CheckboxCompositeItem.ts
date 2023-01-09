import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { CheckboxSize } from '../Checkbox/constants';

import {
  ITEM_BEFORE_LEFT_BIG,
  ITEM_BEFORE_LEFT_SMALL,
  ITEM_BEFORE_WIDTH_BIG,
  ITEM_BEFORE_WIDTH_SMALL,
  ITEM_MARGIN_BOTTOM_BIG,
  ITEM_MARGIN_BOTTOM_SMALL,
  ITEM_PADDING_LEFT_BIG,
  ITEM_PADDING_LEFT_SMALL,
} from './constants';

interface ICheckboxCompositeItem {
  size?: CheckboxSize;
}

export const CheckboxCompositeItem = styled.div<ICheckboxCompositeItem>`
  box-sizing: border-box;
  position: relative;
  ${({ size }) => css`
    padding-left: ${size === 'small' ? ITEM_PADDING_LEFT_SMALL : ITEM_PADDING_LEFT_BIG};
    margin-bottom: ${size === 'small' ? ITEM_MARGIN_BOTTOM_SMALL : ITEM_MARGIN_BOTTOM_BIG};
  `}
  ::before {
    position: absolute;
    content: '';
    ${({ size, theme }) => css`
      width: ${size === 'small' ? ITEM_BEFORE_WIDTH_SMALL : ITEM_BEFORE_WIDTH_BIG};
      left: ${size === 'small' ? ITEM_BEFORE_LEFT_SMALL : ITEM_BEFORE_LEFT_BIG};
      background: ${theme.color.neutral[20]};
      height: 1px;
    `}
    top: 50%;
    transform: translateY(-50%);
  }
`;

CheckboxCompositeItem.defaultProps = {
  theme: DEFAULT_THEME,
};
