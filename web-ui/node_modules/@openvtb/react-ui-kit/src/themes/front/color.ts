import { OPACITY, ATTENTION } from '../common';
import type { IColor, INeutral, IPrimary, IError, ISuccess, IWarning, IExtraOne } from '../common';

const NEUTRAL: INeutral = {
  white: '#FFFFFF',
  5: '#F1F2F5',
  10: '#DEE2E8',
  20: '#BCC0C8',
  30: '#979DA8',
  40: '#818692',
  50: '#666B77',
  60: '#555A65',
  70: '#464954',
  80: '#363841',
  90: '#21242C',
  black: '#000000',
};

const PRIMARY: IPrimary = {
  10: '#EDF5FF',
  20: '#D6E4FE',
  30: '#A7C7FF',
  40: '#6FA3FF',
  50: '#307FFF',
  60: '#0062FF',
  70: '#0142D3',
  80: '#022D9A',
  90: '#001D6D',
  100: '#001144',
};

const ERROR: IError = {
  10: '#FFEFEF',
  20: '#FFD4D4',
  30: '#FFA7A7',
  40: '#FF7C7C',
  50: '#F64E4E',
  60: '#D92020',
  70: '#A71212',
  80: '#780A0A',
  90: '#520606',
  100: '#320000',
};

const SUCCESS: ISuccess = {
  10: '#EAFCF1',
  20: '#B6F1C9',
  30: '#73E49A',
  40: '#32C665',
  50: '#1BA049',
  60: '#128238',
  70: '#096227',
  80: '#04451A',
  90: '#003111',
  100: '#00230C',
};

const WARNING: IWarning = {
  10: '#FFF1E5',
  20: '#FFD7C3',
  30: '#FFB799',
  40: '#FF8D64',
  50: '#FF5C22',
  60: '#D63F09',
  70: '#A63208',
  80: '#7A2503',
  90: '#591C04',
  100: '#3D1100',
};

const EXTRA_ONE: IExtraOne = {
  10: '#F6F2FF',
  20: '#E8DAFF',
  30: '#D4BBFF',
  40: '#BE95FF',
  50: '#A56EFF',
  60: '#8A3FFC',
  70: '#6929C4',
  80: '#491D8B',
  90: '#31135E',
  100: '#1C0F30',
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
