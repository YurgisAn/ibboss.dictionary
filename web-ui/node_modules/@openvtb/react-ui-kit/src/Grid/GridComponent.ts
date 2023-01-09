import styled, { css } from 'styled-components';

import { DEVICE_BREAKPOINTS, DEVICE_INDENTS } from './constants';
import { Devices } from './types';
import type { IGridProps, Device } from './types';

const mediaGrid = (device: Device, props: IGridProps) => css`
  @media ${DEVICE_BREAKPOINTS[device]} {
    ${props.noindent
      ? ''
      : `
      margin-left: -${DEVICE_INDENTS[device] / 2}px;
      margin-right: -${DEVICE_INDENTS[device] / 2}px;

      & > * {
        margin-left: ${DEVICE_INDENTS[device] / 2}px;
        margin-right: ${DEVICE_INDENTS[device] / 2}px;
      }
    `}
  }
`;

export const GridComponent = styled.div<IGridProps>`
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  position: relative;

  ${({ justifyContent, alignItems }) => `
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `}

  ${(props) => Devices.map((device) => mediaGrid(device, props))}
`;
