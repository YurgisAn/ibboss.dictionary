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
import { TableRow, Column, Checkbox } from '@vtb/ui-kit3';   
import { ItemValueDto } from '~/shared/models/itemValue-dto';
import { StickyWrapper, CheckboxCell } from '../styled';

type PropType = {
    rows: DataDto[],
    columns: Column[],
    showLastRowUnderline?:boolean,
    displayRowSelectionColumn?:boolean,
    dimension?: string;
    renderCell?: (row: TableRow, columnName: string) => React.ReactNode;
};


export const TableRows: React.FC<PropType> = ({columns, rows, dimension = 's',  showLastRowUnderline = true, displayRowSelectionColumn = false}) => 
{  
  const checkboxCellRef = React.useRef<HTMLDivElement>(null);
  const checkboxDimension = dimension === 's' || dimension === 'm' ? 's' : 'm'; 

  const renderRow = (row: DataDto, index: number) => {
      return (
        <Row
          disabled={false}
          key={`row_${index}`}
          underline={(index === rows.length - 1 && showLastRowUnderline) || index < rows.length - 1}
          className={`tr`}
        >
          <SimpleRow className="tr-simple">   
             {(displayRowSelectionColumn) && (
                <StickyWrapper>
                    {displayRowSelectionColumn && (
                      <CheckboxCell ref={checkboxCellRef} data-dimension={dimension} className="th_checkbox">
                        <Checkbox
                            dimension={checkboxDimension}                        
                        />
                      </CheckboxCell>
                    )}
                </StickyWrapper>
              )}           
              {row.items.map((row, inx) => renderBodyCell(row, inx, index))}
          </SimpleRow>          
        </Row>
      );
    };

  const renderBodyCell = (row: ItemValueDto, index: number, number:number) => {
      return (
        <Cell key={`${number}_${columns[index].name}`} style={{ width: columns[index].width || DEFAULT_COLUMN_WIDTH }} className="td">
            <CellTextContent cellAlign={columns[index].cellAlign} dangerouslySetInnerHTML={{__html: row.value}}></CellTextContent>
        </Cell>
      );
    };

  return (
            <>{rows.map((row, index) => renderRow(row, index))}</>              
          );
};
