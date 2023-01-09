import React, { FC } from 'react';

import { CalendarSize, LocaleType, DAY_NUMBERS } from './constants';
import { startOfWeek, addDays, getFormattedValue } from './date-utils';
import { DayNameComponent } from './DayNameComponent';

interface IDayNamesProps {
  size: CalendarSize;
  date: Date;
  localeName: LocaleType;
}

export const DayNames: FC<IDayNamesProps> = ({ size, date, localeName }) => {
  const weekStart = startOfWeek(date, localeName);
  return (
    <div>
      {DAY_NUMBERS.map((offset) => {
        const day = addDays(weekStart, offset);
        const weekDayName = getFormattedValue(day, 'EEEEEE', localeName);
        return (
          <DayNameComponent key={day.valueOf()} size={size}>
            {weekDayName}
          </DayNameComponent>
        );
      })}
    </div>
  );
};
