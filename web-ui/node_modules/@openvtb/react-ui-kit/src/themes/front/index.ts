import type { ITheme } from '../common';

import { BOX_SHADOW } from './box-shadow';
import { BUTTON } from './button';
import { COLOR } from './color';
import { INPUT } from './input';
import { MULTI_SELECT } from './multi-select';
import { TABS } from './tabs';

export const FRONT_THEME: ITheme = {
  borderRadius: '4px',
  boxShadow: BOX_SHADOW,
  button: BUTTON,
  color: COLOR,
  input: INPUT,
  multiSelect: MULTI_SELECT,
  name: 'front',
  tabs: TABS,
};
