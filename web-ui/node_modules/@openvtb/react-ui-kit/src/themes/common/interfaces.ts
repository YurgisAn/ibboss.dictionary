import type { IBoxShadow } from './box-shadow';
import type { IButton } from './button';
import type { IColor } from './color';
import type { IMultiSelect } from './multi-select';
import type { ITabs } from './tabs';
import type { IInput } from './input';

export interface ITheme {
  borderRadius: string;
  boxShadow: IBoxShadow;
  button: IButton;
  color: IColor;
  multiSelect: IMultiSelect;
  name: 'corp' | 'front' | 'light';
  tabs: ITabs;
  input: IInput;
}
