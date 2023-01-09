import React, { FC } from 'react';

import { DEFAULT_YEAR_COUNT } from './constants';
import { getYear, yearsRange, setYear, startOfYear } from './date-utils';
import { YearComponent } from './YearComponent';
import type { IYearsCalendarProps } from './interfaces';

export const Years: FC<IYearsCalendarProps> = ({
  size,
  viewDate,
  startDate,
  selected,
  validator,
  onClick,
}) => {
  const { start, end } = yearsRange(viewDate, DEFAULT_YEAR_COUNT);
  const years = Array(end - start + 1)
    .fill(0)
    .map((_, index) => start + index);
  return (
    <>
      {years.map((year) => {
        const disabled = !!validator?.invalidYear(year);
        const handleClick = (e) => {
          e.preventDefault();
          const day = startOfYear(setYear(viewDate, year));
          !disabled && onClick && onClick(day, e);
        };
        return (
          <YearComponent
            key={year}
            size={size}
            today={year === getYear(new Date())}
            selected={
              !!(selected || startDate) && year === getYear((selected || startDate) as Date)
            }
            disabled={disabled}
            onMouseDown={handleClick}
          >
            {year}
          </YearComponent>
        );
      })}
    </>
  );
};
