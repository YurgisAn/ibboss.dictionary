import React, { FC } from 'react';

import { getMonth, startOfWeek, startOfMonth, addWeeks, weekInMonth } from './date-utils';
import { Week } from './Week';
import type { IMonthCalendarProps } from './interfaces';

const FIXED_WEEK_COUNT = 6;

export const Month: FC<IMonthCalendarProps> = ({
  localeName,
  size,
  day,
  startDate,
  endDate,
  selected,
  activeDate,
  range,
  validator,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const weeks: Array<Date> = [];
  const fixCount = false; // to make days matrix size fixed
  const handleMouseEnter = (day: Date, event) => onMouseEnter && onMouseEnter(day, event);
  const handleMouseLeave = () => onMouseLeave && onMouseLeave();
  const handleDayClick = (day: Date, event) => onClick && onClick(day, event);

  let weekIndex = 0;
  let weekStart = startOfWeek(startOfMonth(day), localeName);
  do {
    weekIndex++;
    weeks.push(weekStart);
    weekStart = addWeeks(weekStart, 1);
  } while (
    (!fixCount && weekInMonth(weekStart, day)) ||
    (fixCount && weekIndex < FIXED_WEEK_COUNT)
  );

  return (
    <div onMouseLeave={handleMouseLeave}>
      {weeks.map((week) => (
        <Week
          key={week.valueOf()}
          size={size}
          day={week}
          month={getMonth(day)}
          startDate={startDate}
          endDate={endDate}
          selected={selected}
          activeDate={activeDate}
          range={range}
          localeName={localeName}
          validator={validator}
          onMouseEnter={handleMouseEnter}
          onClick={handleDayClick}
        />
      ))}
    </div>
  );
};
