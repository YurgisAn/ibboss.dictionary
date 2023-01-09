export const absenceText = '—';

export const toXXXFormatString = (num: number): string => new Intl.NumberFormat('ru-RU').format(num);

export const dashIfNumIsZero = (num: string | number) => {
    if (Number(num) === 0) return absenceText;
    return num;
};

export const toNumberString = (value: string): string => (parseInt(value) || '').toString();

export const isNumericString = (str: string): boolean => {
    if (typeof str != 'string') return false;
    // https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    // @ts-ignore-next-line:
    return !isNaN(str) && !isNaN(parseFloat(str));
};

export const toDecimalXXXFormatString = (num: number): string => {
    let numVal = toXXXFormatString(num);
    if (Number.isInteger(num)) numVal = `${numVal},0`;
    return numVal;
};
