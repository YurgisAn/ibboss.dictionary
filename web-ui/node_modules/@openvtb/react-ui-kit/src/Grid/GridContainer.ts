import styled, { css } from 'styled-components';

import { DEVICE_BREAKPOINTS, DEVICE_MARGINS } from './constants';
import { Device, Devices } from './types';

const mediaGridContainer = (device: Device, nomargin?: boolean) => css`
  @media ${DEVICE_BREAKPOINTS[device]} {
    width: 100%;

    ${nomargin
      ? ''
      : `
      margin-left: ${DEVICE_MARGINS[device]}px;
      margin-right: ${DEVICE_MARGINS[device]}px;
    `}
  }
`;

export const GridContainer = styled.div<{ nomargin?: boolean }>`
  overflow: visible; /* 'hidden' option hides box-shadow etc. */

  ${({ nomargin }) => Devices.map((device) => mediaGridContainer(device, nomargin))}
`;
