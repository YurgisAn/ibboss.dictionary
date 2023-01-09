import React, { FC } from 'react';

import { StyledDropdownMenuWrapper } from '../StyledComponents/DropdownMenu';
import type { Size } from '../../Inputs/common/types';

import { DropdownScrollColumn } from './DropdownScrollColumn';

export interface IDropdownMenuProps {
  size: Size;
  open: boolean;
  onTimeSelect: any;
  activeTime: any;
  rangeStart: object;
  rangeEnd: object;
}

const generateHoursSequence = (from: number, to: number) => {
  const arr: String[] = [];
  for (let i = from; i <= to; i++) {
    arr.push(i >= 10 ? `${i}` : `0${i}`);
  }
  return arr;
};

const generate30MinutesStep = (hours) => [`${hours} : 00`, `${hours} : 30`];
const generateTimeRange = (rangeStart, rangeEnd) => {
  const startHours = Number(rangeStart.hours);
  const endHours = Number(rangeEnd.hours);
  const hoursSequence = generateHoursSequence(startHours, endHours);
  let res: string[] = [];
  hoursSequence.forEach((hours) => {
    res = res.concat(generate30MinutesStep(hours));
  });

  rangeStart.minutes === '30' && res.shift();
  rangeEnd.minutes === '00' && res.pop();

  return res;
};

export const DropdownMenu: FC<IDropdownMenuProps> = ({
  open,
  onTimeSelect,
  activeTime,
  rangeStart,
  rangeEnd,
  size,
}) => {
  if (!open) return null;

  return (
    <StyledDropdownMenuWrapper size={size}>
      <DropdownScrollColumn
        items={generateTimeRange(rangeStart, rangeEnd)}
        onItemClick={onTimeSelect}
        activeItem={activeTime}
      />
    </StyledDropdownMenuWrapper>
  );
};
