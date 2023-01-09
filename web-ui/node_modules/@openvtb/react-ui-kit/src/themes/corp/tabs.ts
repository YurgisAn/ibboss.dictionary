import type { ITabs } from '../common';

import { COLOR } from './color';

export const TABS: ITabs = {
  activeTextColor: COLOR.primary[60],
  focus: `color: ${COLOR.primary[60]};`,
  hover: `color: ${COLOR.primary[60]};`,
  active: `color: ${COLOR.primary[80]};`,
  useMargin: true,
};
