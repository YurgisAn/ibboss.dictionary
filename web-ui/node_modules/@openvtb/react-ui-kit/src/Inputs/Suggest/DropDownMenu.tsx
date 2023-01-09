import React, { FC, Dispatch, RefObject } from 'react';

import { Spinner } from '../../Spinner';
import type { Size } from '../common';

import { isString } from './utils';
import { MenuListWrapper, MenuWrapper, SpinnerWrapper, LabelWrapper } from './styled-components';
import { Option } from './Option';

import type { IOptionSuggest } from './index';
interface IDropDownMenu {
  showMenu: boolean;
  load: boolean;
  options: (string | IOptionSuggest<any>)[];
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  noopMessage: string;
  loadMessage: string;
  tooltipContainer?: Element | null;
  size: Size;
  inputRef?: RefObject<HTMLInputElement>;
  menuMaxHeight: string | number;
  menuIsOpen?: boolean;
  renderElementOption?: (options: string | IOptionSuggest<any>) => any;
  onChange: (value: string | IOptionSuggest<any>) => void;
  setInputValue: Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  selectedItem?: string | IOptionSuggest<any>;
  shouldRenderDropdown: boolean;
}

export const DropDownMenu: FC<IDropDownMenu> = ({
  load,
  options,
  size,
  noopMessage,
  loadMessage,
  tooltipContainer,
  inputRef,
  menuMaxHeight,
  renderElementOption,
  onChange,
  menuIsOpen,
  setShowMenu,
  setInputValue,
  inputValue,
  selectedItem,
  shouldRenderDropdown,
}) => {
  const withPadding = options.length === 0 || options.length === 1;

  const shouldRenderNoopMessage = options.length === 0 && !load;
  const shouldRenderOptions = options.length > 0 && !load;
  const spinnerSize = size === 'micro' ? 'small' : 'medium';

  return (
    <MenuWrapper menuMaxHeight={menuMaxHeight} visible={shouldRenderDropdown}>
      <MenuListWrapper load={load} withPadding={withPadding} menuMaxHeight={menuMaxHeight}>
        {load && (
          <Option size={size} tooltipMessage={loadMessage}>
            <SpinnerWrapper>
              <Spinner size={spinnerSize} />
              <LabelWrapper load>{loadMessage}</LabelWrapper>
            </SpinnerWrapper>
          </Option>
        )}
        {shouldRenderOptions &&
          options.map((item: string | IOptionSuggest<any>, index) => (
            <Option
              key={isString(item) ? index : item.id}
              size={size}
              tooltipContainer={tooltipContainer}
              inputRef={inputRef}
              setShowMenu={menuIsOpen === undefined ? setShowMenu : undefined}
              renderElementOption={renderElementOption}
              onChange={onChange}
              label={isString(item) ? item : item.label}
              item={item}
              setInputValue={setInputValue}
              inputValue={inputValue}
              selectedItem={selectedItem}
            />
          ))}
        {shouldRenderNoopMessage && (
          <Option size={size} tooltipMessage={noopMessage}>
            <LabelWrapper>{noopMessage}</LabelWrapper>
          </Option>
        )}
      </MenuListWrapper>
    </MenuWrapper>
  );
};
