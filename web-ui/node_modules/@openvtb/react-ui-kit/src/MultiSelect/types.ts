import type { Size } from './constants';

export interface IMultiSelectItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type IMultiSelectItemOptions = IMultiSelectItem | React.ReactNode;

export interface IInputProps {
  size: Size;
  disabled?: boolean;
  placeholder?: string;
  clearable?: boolean;
  menuIsOpen?: boolean;
  maxWidthChip?: string;
  currentMultiValue: IMultiSelectItemOptions[];
  onChange: (value: IMultiSelectItemOptions[]) => void;
}

export interface IChipItemProps {
  value: string | number;
  disabled?: boolean;
  maxWidthChip?: string;
  currentMultiValue: IMultiSelectItemOptions[];
  onChange: (value: IMultiSelectItemOptions[]) => void;
}

export interface IDropdownListProps {
  size: Size;
  disabled?: boolean;
  menuIsOpen: boolean;
  error?: boolean;
  classNameDropdownList?: string;
  dropdownListBorders: boolean;
  optionsList: IMultiSelectItemOptions[];
  currentMultiValue: IMultiSelectItemOptions[];
  setOpened: (menuIsOpen: any) => void;
  onChange: (value: IMultiSelectItemOptions[]) => void;
}
