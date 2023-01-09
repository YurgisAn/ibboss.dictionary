import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DataDto } from '~/shared/models';
import { 
  Row,
  SimpleRow,
  Cell,
  CellTextContent,
  ScrollTableBody
} from '../styled';

import { DEFAULT_COLUMN_WIDTH } from '../constants';
import { TableRow, Column } from '@vtb/ui-kit3';   
import { ItemValueDto } from '~/shared/models/itemValue-dto';
import { EmptyWrapper } from '../styled';

type PropType = {
    rows: DataDto[],
    columns: Column[],
    showLastRowUnderline?:boolean,

    renderCell?: (row: TableRow, columnName: string) => React.ReactNode;
};


export const TableRows: React.FC<PropType> = ({columns, rows,  showLastRowUnderline = true,}) => 
{  
  const scrollBodyRef = React.useRef<HTMLDivElement>(null);
  const renderRow = (row: DataDto, index: number) => {
      return (
        <Row
          key={`row_${index}`}
          underline={(index === rows.length - 1 && showLastRowUnderline) || index < rows.length - 1}
          className={`tr`}
        >
          <SimpleRow className="tr-simple">
            {row.items.map((row, inx) => renderBodyCell(row, inx, index))}
          </SimpleRow>          
        </Row>
      );
    };

  const renderBodyCell = (row: ItemValueDto, index: number, number:number) => {
      return (
        <Cell key={`${number}_${columns[index].name}`} style={{ width: columns[index].width || DEFAULT_COLUMN_WIDTH }} className="td">
            <CellTextContent cellAlign={columns[index].cellAlign}>{row.value}</CellTextContent>
        </Cell>
      );
    };

  return (
            rows.length ? 
            (<ScrollTableBody ref={scrollBodyRef} className="tbody">
              {rows.map((row, index) => renderRow(row, index))}
            </ScrollTableBody>) 
            : (<EmptyWrapper>Нет данных</EmptyWrapper>)
          );
};
