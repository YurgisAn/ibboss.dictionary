import { OPACITY, ATTENTION } from '../common';
import type { IColor, INeutral, IPrimary, IError, ISuccess, IWarning, IExtraOne } from '../common';

const NEUTRAL: INeutral = {
  white: '#FFFFFF',
  5: '#F3F4F7',
  10: '#E5E8ED',
  20: '#D5D8DF',
  30: '#B0B5BE',
  40: '#999EA9',
  50: '#7A7E88',
  60: '#686C75',
  70: '#50525A',
  80: '#37383E',
  90: '#22242A',
  black: '#000000',
};

const PRIMARY: IPrimary = {
  10: '#EDF6FF',
  20: '#CFE6FF',
  30: '#9FCEFF',
  40: '#5CABFF',
  50: '#3391F5',
  60: '#2375E1',
  70: '#1556BB',
  80: '#003C96',
  90: '#002882',
  100: '#011A52',
};

const ERROR: IError = {
  10: '#FFF0EC',
  20: '#FFD4CB',
  30: '#FFAA96',
  40: '#FF7E5F',
  50: '#F65240',
  60: '#D82C11',
  70: '#A51C07',
  80: '#781000',
  90: '#500B00',
  100: '#310700',
};

const SUCCESS: ISuccess = {
  10: '#E9FBEE',
  20: '#C1EDD0',
  30: '#85DCA2',
  40: '#2EC160',
  50: '#05A13A',
  60: '#00832C',
  70: '#006221',
  80: '#004517',
  90: '#003111',
  100: '#00230C',
};

const WARNING: IWarning = {
  10: '#FFF3E0',
  20: '#FFDFB3',
  30: '#FFBB5B',
  40: '#FF991F',
  50: '#EF7015',
  60: '#CB5600',
  70: '#B73D03',
  80: '#982704',
  90: '#791C00',
  100: '#4B1200',
};

const EXTRA_ONE: IExtraOne = {
  10: '#FDF1F7',
  20: '#F8D7E6',
  30: '#F5B2CF',
  40: '#F089B2',
  50: '#F25893',
  60: '#EE2478',
  70: '#B11663',
  80: '#930055',
  90: '#600037',
  100: '#400025',
};

export const COLOR: IColor = {
  neutral: NEUTRAL,
  primary: PRIMARY,
  error: ERROR,
  success: SUCCESS,
  warning: WARNING,
  opacity: OPACITY,
  attention: ATTENTION,
  extraOne: EXTRA_ONE,
};
