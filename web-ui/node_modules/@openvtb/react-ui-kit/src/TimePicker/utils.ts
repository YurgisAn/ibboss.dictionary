import { DEFAULT_SELECT_RANGE_END, DEFAULT_SELECT_RANGE_START } from './components/constants';

import type { TTime } from './index';

const HOURS_ITEMS = Array.from(Array(24).keys())
  .map(String)
  .map((item) => (item.length === 1 ? `0${item}` : item));

export const parseRangeTime = (time?: TTime) => {
  if (!(time && time.hours && HOURS_ITEMS.includes(time.hours))) return null;

  const { hours, minutes } = time;
  return { hours, minutes: minutes === '00' || minutes === '30' ? minutes : '00' };
};

export const validateUserTimeRange = (rawRangeStart?: TTime, rawRangeEnd?: TTime) => {
  const rangeStart = parseRangeTime(rawRangeStart) || DEFAULT_SELECT_RANGE_START;
  const rangeEnd = parseRangeTime(rawRangeEnd) || DEFAULT_SELECT_RANGE_END;

  if (rangeStart.hours > rangeEnd.hours) {
    return {
      rangeStart,
      rangeEnd: DEFAULT_SELECT_RANGE_END,
    };
  } else if (rangeStart.hours === rangeEnd.hours && rangeStart.minutes > rangeEnd.minutes) {
    return { rangeStart, rangeEnd: rangeStart };
  }

  return { rangeStart, rangeEnd };
};

export const activeTimeParse = (value: { hours: string; minutes: string }) => {
  return value.hours + ' : ' + value.minutes;
};

export const timeValid = (value: { hours: string; minutes: string }, valueInput: string) => {
  if (+value.hours > 24 || +value.minutes > 59 || (valueInput.length < 4 && valueInput !== '')) {
    return true;
  } else {
    return false;
  }
};

export const parseValue = (value: { hours: string; minutes: string }) => {
  const newValue = value.hours + value.minutes;

  return newValue;
};

export const formatValue = (str: { value: string; masked: string }) => {
  return {
    hours: str.value?.slice(0, 2),
    minutes: str.value?.slice(2, 4),
  };
};
