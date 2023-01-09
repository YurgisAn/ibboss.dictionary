import {
  addDays,
  addWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getDate,
  getMonth,
  setMonth,
  getYear,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  setYear,
  startOfYear,
  startOfMonth,
  startOfWeek as startOfWeekBase,
  startOfDay,
  endOfWeek as endOfWeekBase,
  endOfDay,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  isValid,
  format,
  parse,
} from 'date-fns';
import { ru, enUS, de } from 'date-fns/locale';

import { LocaleType } from './constants';

export {
  isAfter as after,
  isBefore as before,
  isValid as valid,
  differenceInCalendarDays as differenceDays,
  differenceInCalendarMonths as differenceMonths,
  differenceInCalendarYears as differenceYears,
  addDays,
  addWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
  getDate,
  getMonth,
  setMonth,
  getYear,
  setYear,
  startOfMonth,
  startOfYear,
};

export const outOfBounds = (day: Date, minDate?: Date | null, maxDate?: Date | null) =>
  (minDate && differenceInCalendarDays(day, minDate) < 0) ||
  (maxDate && differenceInCalendarDays(day, maxDate) > 0);

export const sameDay = (date1?: Date | null, date2?: Date | null) => {
  if (date1 && date2) {
    return isSameDay(date1, date2);
  } else {
    return !date1 && !date2;
  }
};

export const sameMonth = (date1?: Date | null, date2?: Date | null) => {
  if (date1 && date2) {
    return isSameMonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
};

export const equal = (date1?: Date | null, date2?: Date | null) => {
  if (date1 && date2) {
    return isEqual(date1, date2);
  } else {
    return !date1 && !date2;
  }
};

export const changeTime = (dateTime: Date, newTime?: Date | null): Date => {
  if (!newTime) return dateTime;
  const hour = getHours(newTime);
  const minute = getMinutes(newTime);
  const second = getSeconds(newTime);
  const msecond = getMilliseconds(newTime);
  return setHours(setMinutes(setSeconds(setMilliseconds(dateTime, msecond), second), minute), hour);
};

export const weekInMonth = (startOfWeek: Date, day: Date) => {
  const endOfWeek = addDays(startOfWeek, 6);
  return sameMonth(startOfWeek, day) || sameMonth(endOfWeek, day);
};

export const dayInRange = (day: Date, startDate: Date, endDate: Date): boolean => {
  let valid = false;
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);

  try {
    valid = isWithinInterval(day, { start, end });
  } catch (err) {
    valid = false;
  }
  return valid;
};

export const yearsRange = (date: Date, yearCount: number) => {
  const end = Math.ceil(getYear(date) / yearCount) * yearCount;
  const start = end - (yearCount - 1);
  return { start, end };
};

// locale: we use date-fns locale object
const locales = {
  ru,
  enUS,
  de,
};

export const startOfWeek = (date: Date, localeName: LocaleType): Date => {
  return startOfWeekBase(date, {
    locale: locales[localeName],
  });
};

export const endOfWeek = (date: Date, localeName: LocaleType): Date => {
  return endOfWeekBase(date, {
    locale: locales[localeName],
  });
};

export const getFormattedValue = (date: Date | null, pattern: string, localeName: LocaleType) => {
  return format(date || new Date(), pattern, {
    locale: locales[localeName],
  });
};

export const getParsedValue = (
  dateString: string,
  formatString: string,
  localeName: LocaleType
) => {
  return parse(dateString, formatString, new Date(), {
    locale: locales[localeName],
  });
};
