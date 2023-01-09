export const checkPhoneMask = (mask: string) => {
  return mask.indexOf('(') !== -1;
};

export const getCodePhoneLength = (mask = '') => {
  return mask.slice(0, mask.indexOf('(') + 1).length;
};

export const getPhoneNumber = (mask = '') => {
  return formatValueOnlyNum(mask.slice(0, getCodePhoneLength(mask)));
};

export const formatValueOnlyNum = (val: string) => {
  return val.replace(/\D+/g, '');
};

export const checkValidationMask = (mask: string, value: string) => {
  const maskLength = formatValueOnlyNum(mask).length;
  const valueLength = value.length;

  return valueLength > maskLength;
};

export const formatValue = (str: string) => {
  if (typeof str !== 'string') {
    return '';
  } else {
    return str.replace(/[^\d+a-zA-ZА-Яа-яЁё]/gi, '').trim();
  }
};

export const checkMaskFilled = (mask: string, value: string) => {
  return mask.length === value?.length;
};

export const searchPhoneMask = (mask: string) => mask.search(/[+()]/) !== -1;

export const searchSymbols = (value: string) => value.search(/[1-9()+)]/) === -1;
