import { formatValue, formatValueWithSeparator } from '../common/utils';
import { DECREMENT, INCREMENT } from '../constants';

export const getResultValue = (valueInput: string, step: number, name: string) => {
  const decimalValue = valueInput.split('.');
  const value = +formatValue(decimalValue[0]);
  let resultValue: string | number = 0;

  if (name === INCREMENT) {
    resultValue = decimalValue[1] ? `${value + step}.${decimalValue[1]}` : value + step;
  }

  if (name === DECREMENT) {
    if (+valueInput <= 0) {
      resultValue = 0;
    } else {
      resultValue = decimalValue[1] ? `${value - step}.${decimalValue[1]}` : value - step;
    }
  }

  return String(resultValue);
};

const simulatedMaxValueInput = (maxIntLength: number) => {
  let value = '';
  while (formatValueWithSeparator(value).length < maxIntLength) {
    value += '9';
  }

  return value;
};

export const getIntegerMaxValue = (maxIntLength: number) => {
  const maxPossibleMaskedValue = simulatedMaxValueInput(maxIntLength);
  return +formatValue(maxPossibleMaskedValue);
};
