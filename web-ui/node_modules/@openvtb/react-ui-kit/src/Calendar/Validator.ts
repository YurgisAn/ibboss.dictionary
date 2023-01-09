import { compareDates } from '../common/utils';

import { valid, outOfBounds } from './date-utils';

const MESSAGE_DATE_UNDEFINED = 'Неверный формат даты';
const MESSAGE_DATE_INVALID = 'Дата не валидна';
const MESSAGE_START_DATE_INVALID = 'Начальная дата не валидна';
const MESSAGE_END_DATE_INVALID = 'Конечная дата не валидна';
const MESSAGE_START_END_DATE_INVALID = 'Даты не валидны';
const MESSAGE_START_DATE_UNDEFINED = 'Неверный формат начальной даты';
const MESSAGE_END_DATE_UNDEFINED = 'Неверный формат конечной даты';
const MESSAGE_START_END_DATE_UNDEFINED = 'Неверный формат дат';
const MESSAGE_DATE_OUTOFRANGE = 'Дата вне диапазона';
const MESSAGE_START_DATE_OUTOFRANGE = 'Начальная дата вне диапазона';
const MESSAGE_END_DATE_OUTOFRANGE = 'Конечная дата вне диапазона';
const MESSAGE_DATES_INCORRECT_RANGE = 'Конечная дата меньше начальной';

/** В случае невалидности даты содержит сообщение ошибки, null - если дата валидна */
type InvalidDateMessage = string | null;

export interface IDateValidator {
  invalidValue: (date?: Date | null) => InvalidDateMessage;
  invalidRange: (startDate?: Date | null, endDate?: Date | null) => InvalidDateMessage;
  invalidYear: (year: number) => InvalidDateMessage;
}

export const getDefaultDateValidator = (minDate?: Date, maxDate?: Date): IDateValidator => {
  return {
    invalidValue: (date?: Date | null): InvalidDateMessage => {
      if (!date) return MESSAGE_DATE_UNDEFINED;
      if (!valid(date)) return MESSAGE_DATE_INVALID;

      if (outOfBounds(date, minDate, maxDate)) return MESSAGE_DATE_OUTOFRANGE;

      return null;
    },
    invalidRange: (startDate?: Date | null, endDate?: Date | null): InvalidDateMessage => {
      if (!startDate && !endDate) return MESSAGE_START_END_DATE_UNDEFINED;
      if (!valid(startDate) && !valid(endDate)) return MESSAGE_START_END_DATE_INVALID;
      if (!startDate) return MESSAGE_START_DATE_UNDEFINED;
      if (!endDate) return MESSAGE_END_DATE_UNDEFINED;
      if (!valid(startDate)) return MESSAGE_START_DATE_INVALID;
      if (!valid(endDate)) return MESSAGE_END_DATE_INVALID;
      if (compareDates(startDate, endDate) >= 0) return MESSAGE_DATES_INCORRECT_RANGE;

      if (outOfBounds(startDate, minDate, maxDate)) return MESSAGE_START_DATE_OUTOFRANGE;
      if (outOfBounds(endDate, minDate, maxDate)) return MESSAGE_END_DATE_OUTOFRANGE;

      return null;
    },
    invalidYear: (year: number): InvalidDateMessage => {
      return !!outOfBounds(new Date(year, 11, 31), minDate) ||
        !!outOfBounds(new Date(year, 0, 1), null, maxDate)
        ? MESSAGE_DATE_OUTOFRANGE
        : null;
    },
  };
};
