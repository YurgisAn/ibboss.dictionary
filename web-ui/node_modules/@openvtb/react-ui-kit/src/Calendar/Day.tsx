import React, { FC } from 'react';

import {
  after,
  dayInRange,
  equal,
  getDate,
  getMonth,
  sameDay,
  startOfWeek,
  endOfWeek,
  differenceDays,
} from './date-utils';
import { DAY_NUMBERS } from './constants';
import { DayComponent } from './DayComponent';
import type { Corners } from './constants';
import type { IDayCalendarProps } from './interfaces';

const DAY_COUNT = DAY_NUMBERS.length;

export const Day: FC<IDayCalendarProps> = ({
  size,
  day,
  month,
  startDate,
  endDate,
  selected,
  activeDate,
  range,
  localeName,
  validator,
  onMouseEnter,
  onClick,
}) => {
  const disabled = !!validator?.invalidValue(day);
  const outsideMonth = month !== undefined && month !== getMonth(day);
  const inSelectingRange =
    !disabled &&
    !!range &&
    !!startDate &&
    !!activeDate &&
    !endDate &&
    (after(activeDate, startDate) || equal(activeDate, startDate)) &&
    dayInRange(day, startDate, activeDate);
  const inRange = !!startDate && !!endDate && dayInRange(day, startDate, endDate);
  const rangeStart = !!startDate && sameDay(day, startDate);
  const rangeEnd = !!startDate && !!endDate && sameDay(day, endDate);
  const rangeSelectingStart = inSelectingRange && sameDay(day, startDate);
  const rangeSelectingEnd = inSelectingRange && sameDay(day, activeDate);

  const corners: Corners = {};
  if (startDate) {
    const weekStart = sameDay(day, startOfWeek(day, localeName));
    const weekEnd = sameDay(day, endOfWeek(day, localeName));
    const diffDayStart = differenceDays(day, startDate) < DAY_COUNT;
    const diffStartEnd =
      !!(endDate || activeDate) &&
      differenceDays((endDate || activeDate) as Date, startDate) < DAY_COUNT;
    const diffDayEnd =
      !!(endDate || activeDate) && differenceDays((endDate || activeDate) as Date, day) < DAY_COUNT;
    const start = rangeStart || rangeSelectingStart;
    const end = rangeEnd || rangeSelectingEnd;
    const inside = inRange || inSelectingRange;
    corners['top-left'] =
      start || (end && weekStart && diffStartEnd) || (inside && weekStart && diffDayStart);
    corners['bottom-left'] =
      (start && (!weekStart || diffStartEnd)) ||
      (end && weekStart) ||
      (inside && weekStart && diffDayEnd);
    corners['top-right'] =
      (start && weekEnd) ||
      (end && (!weekEnd || diffStartEnd)) ||
      (inside && weekEnd && diffDayStart);
    corners['bottom-right'] =
      (start && weekEnd && diffStartEnd) || end || (inside && weekEnd && diffDayEnd);
  }

  return (
    <DayComponent
      size={size}
      today={sameDay(day, new Date())}
      selected={sameDay(day, selected) || rangeStart || rangeEnd}
      corners={corners}
      inRange={inRange || inSelectingRange}
      disabled={disabled || outsideMonth}
      onMouseEnter={(e) => !disabled && onMouseEnter && onMouseEnter(day, e)}
      onMouseDown={(e) => {
        e.preventDefault();
        !disabled && onClick && onClick(day, e);
      }}
    >
      {getDate(day)}
    </DayComponent>
  );
};
