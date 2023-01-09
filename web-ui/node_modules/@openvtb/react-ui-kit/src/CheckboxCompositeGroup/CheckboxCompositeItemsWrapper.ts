import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { CheckboxSize } from '../Checkbox/constants';

import { CheckboxCompositeItem } from './CheckboxCompositeItem';
import {
  COMPOSITEGROUP_BEFORE_HEIGHT_BIG,
  COMPOSITEGROUP_BEFORE_HEIGHT_SMALL,
  COMPOSITEGROUP_BEFORE_LEFT_BIG,
  COMPOSITEGROUP_BEFORE_LEFT_SMALL,
  COMPOSITEGROUP_BEFORE_TOP,
  COMPOSITEGROUP_PADDING_TOP_BIG,
  COMPOSITEGROUP_PADDING_TOP_SMALL,
} from './constants';

interface ICheckboxCompositeItemsWrapper {
  size?: CheckboxSize;
}

export const CheckboxCompositeItemsWrapper = styled.div<ICheckboxCompositeItemsWrapper>`
  padding-top: ${({ size }) =>
    size === 'small' ? COMPOSITEGROUP_PADDING_TOP_SMALL : COMPOSITEGROUP_PADDING_TOP_BIG};
  position: relative;
  box-sizing: border-box;

  & ${CheckboxCompositeItem}:last-child {
    margin-bottom: 0px;
  }

  &::before {
    position: absolute;
    content: '';
    ${({ size, theme }) => css`
      background: ${theme.color.neutral[20]};
      width: 1px;
      height: calc(
        100% -
          ${size === 'small'
            ? COMPOSITEGROUP_BEFORE_HEIGHT_SMALL
            : COMPOSITEGROUP_BEFORE_HEIGHT_BIG}
      );
      left: ${size === 'small' ? COMPOSITEGROUP_BEFORE_LEFT_SMALL : COMPOSITEGROUP_BEFORE_LEFT_BIG};
    `}
    top: ${COMPOSITEGROUP_BEFORE_TOP};
  }
`;

CheckboxCompositeItemsWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
