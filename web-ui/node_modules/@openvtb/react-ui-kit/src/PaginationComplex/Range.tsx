import React, { FC } from 'react';

import { Body2Long } from '../Typography';

import { Dropdown } from './Dropdown';
import { Group } from './Group';
import { Separator } from './Separator';
import { Spacer } from './Spacer';
import { calculateRange } from './calculateRange';

const LABEL = 'Записей на странице:';

interface IRangeProps {
  disableItemsPerPageSelect: boolean;
  itemsPerPage: number;
  lastPage: number;
  mobile: boolean;
  page: number;
  ranges: Array<number>;
  totalItems: number;
  onChange?: (newItemsPerPage: number) => void;
}

export const Range: FC<IRangeProps> = ({
  disableItemsPerPageSelect,
  itemsPerPage,
  lastPage,
  mobile,
  page,
  ranges,
  totalItems,
  onChange,
}) => {
  const { start, end } = calculateRange({
    itemsPerPage,
    lastPage,
    page,
    totalItems,
  });

  return (
    <Group>
      {!mobile && (
        <>
          <Body2Long>{LABEL}</Body2Long>
          <Spacer $size={4} />
          <Dropdown
            disabled={disableItemsPerPageSelect}
            list={ranges}
            value={itemsPerPage}
            onChange={onChange}
          />
          <Separator />
          <Spacer $size={16} />
        </>
      )}
      <Body2Long>{`${start}-${end} записей из ${totalItems}`}</Body2Long>
    </Group>
  );
};
