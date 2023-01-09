import styled, { css } from 'styled-components';

import { DEVICE_INDENTS, DEVICE_BREAKPOINTS, DEVICE_COLUMN_COUNTS } from './constants';
import { getDeviceClass } from './utils';
import { Devices } from './types';
import type { IGridCellProps, IGridContext, Device } from './types';

interface IGridCellComponentProps extends IGridCellProps {
  context: IGridContext;
}

const mediaGridCell = (device: Device, count: number | undefined, indent: number) => css`
  @media ${DEVICE_BREAKPOINTS[device]} {
    ${count === undefined
      ? `width: ${indent ? `calc(100% - ${indent}px)` : '100%'};`
      : `
      &.${getDeviceClass(device, count)} {
        ${
          count > 0 /* flex: 0 0 ...; */
            ? `width: calc(${count} * 100% / ${DEVICE_COLUMN_COUNTS[device]} - ${indent}px);`
            : `display: none;`
        }
      }
    `}
  }
`;

export const GridCellComponent = styled.div<IGridCellComponentProps>`
  display: block;
  position: relative;
  box-sizing: border-box;

  ${(props) =>
    Devices.map((device) => {
      const count = props[device];
      const indent = props.context.noindent ? 0 : DEVICE_INDENTS[device];
      return mediaGridCell(device, count, indent);
    })}
`;
