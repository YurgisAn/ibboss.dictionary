import type { ITabs } from '../common';

import { COLOR } from './color';

export const TABS: ITabs = {
  activeTextColor: COLOR.neutral[90],
  focus: `background-color: ${COLOR.opacity.blackFocus};`,
  hover: `background-color: ${COLOR.opacity.blackHover};`,
  active: `background-color: ${COLOR.opacity.blackPressed};`,
};
