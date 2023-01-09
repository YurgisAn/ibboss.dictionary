import React, { FC } from 'react';

import { GridComponent } from './GridComponent';
import { GridContainer } from './GridContainer';
import { GridContext } from './GridContext';
import type { IGridProps, IGridContext } from './types';

export const Grid: FC<IGridProps> = ({
  children,
  noindent,
  nomargin,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  className,
  dataTestId,
}) => {
  const context: IGridContext = {
    noindent: noindent,
  };
  return (
    <GridContainer nomargin={nomargin}>
      <GridComponent
        noindent={noindent}
        nomargin={nomargin}
        justifyContent={justifyContent}
        alignItems={alignItems}
        className={className}
        data-test-id={dataTestId}
      >
        <GridContext.Provider value={context}>{children}</GridContext.Provider>
      </GridComponent>
    </GridContainer>
  );
};
