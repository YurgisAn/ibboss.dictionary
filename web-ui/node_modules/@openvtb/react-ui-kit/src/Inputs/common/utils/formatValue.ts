/**
 * Убирает разряды в строке
 * @param {string} value - Текст из инпута.
 * @return {string} - Строка в формате 1000000
 */

export const formatValue = (value: string): string => value.replace(/\D+/g, '');

/**
 * Форматирует строку на разряды
 * @param {string} value - Текст из инпута.
 * @return {string} - Строка в формате 1 000 000
 */

export const formatValueWithSeparator = (value: string): string => {
  return value.replace(/[^0-9]/gi, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

export const joinIntegerWithFraction = (integer: string, fraction: string) => {
  return integer ? `${integer}.${fraction || '00'}` : '';
};
