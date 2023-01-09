import styled, { css } from 'styled-components';

import { Subtitle2, Subtitle3 } from '../Typography';

import {
  CalendarSize,
  PANEL_DAY_VIEW_PADDINGS,
  PANEL_YEAR_VIEW_PADDINGS,
  NAVIGATION_PANEL_SIZES,
  NAVIGATION_YEAR_SIZES,
} from './constants';
import { NavigationPanel } from './Navigation';

export const PanelComponent = styled.div<{ size: CalendarSize; yearView: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: transparent;
  border: 0 none;
  padding-top: 0;
  text-align: left;

  ${({ size, yearView }) => css`
    padding: ${yearView ? PANEL_YEAR_VIEW_PADDINGS[size] : PANEL_DAY_VIEW_PADDINGS[size]};

    ${NavigationPanel} {
      width: ${NAVIGATION_PANEL_SIZES[size]}px;
    }
    ${Subtitle2}, ${Subtitle3} {
      div {
        margin-left: ${NAVIGATION_YEAR_SIZES[size]}px;
      }
    }
  `}
`;
