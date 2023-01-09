import React, { FC } from 'react';
import styled from 'styled-components';

import { DAY_NUMBERS } from './constants';
import { startOfWeek, addDays } from './date-utils';
import { Day } from './Day';
import type { IWeekCalendarProps } from './interfaces';

const WeekComponent = styled.div`
  white-space: nowrap;
`;

export const Week: FC<IWeekCalendarProps> = ({
  localeName,
  size,
  day,
  month,
  startDate,
  endDate,
  selected,
  activeDate,
  range,
  validator,
  onMouseEnter,
  onClick,
}) => {
  const handleMouseEnter = (day, e) => onMouseEnter && onMouseEnter(day, e);
  const handleDayClick = (day, e) => onClick && onClick(day, e);
  const weekStart = startOfWeek(day, localeName);
  return (
    <WeekComponent>
      {DAY_NUMBERS.map((offset) => {
        const nextDay = addDays(weekStart, offset);
        return (
          <Day
            key={nextDay.valueOf()}
            size={size}
            day={nextDay}
            month={month}
            startDate={startDate}
            endDate={endDate}
            selected={selected}
            activeDate={activeDate}
            range={range}
            localeName={localeName}
            validator={validator}
            onMouseEnter={(_, e) => handleMouseEnter(nextDay, e)}
            onClick={(_, e) => handleDayClick(nextDay, e)}
          />
        );
      })}
    </WeekComponent>
  );
};
