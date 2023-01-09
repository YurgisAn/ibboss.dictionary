import React, { useContext } from 'react';

import { GridCellComponent } from './GridCellComponent';
import { GridContext } from './GridContext';
import { getDeviceClass } from './utils';
import { Devices } from './types';
import type { IGridContext, IGridCellProps } from './types';

export const GridCell = (props: IGridCellProps) => {
  const { children, className } = props;
  const gridContext: IGridContext = useContext(GridContext);

  const classNames = Devices.map((device) => getDeviceClass(device, props[device]));
  className && classNames.push(className);
  return (
    <GridCellComponent
      {...props}
      context={gridContext}
      className={classNames.filter((className) => !!className).join(' ')}
    >
      {children}
    </GridCellComponent>
  );
};
