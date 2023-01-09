import React, { FC, useRef, Fragment, useCallback } from 'react';

import { ReactComponent as ChevronDownOutline } from '../../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../../Icons/system/ChevronUpOutline.svg';
import { ReactComponent as CloseOutline } from '../../Icons/service/CloseOutline.svg';
import { IInputProps } from '../types';
import { ICON_MICRO_SIZE, ICON_DEFAULT_SIZE } from '../constants';
import {
  CurrentValue,
  ChipItemChecbox,
  PlaceholderWrapper,
  ValueContainerWrapper,
} from '../styled-components/inputComponents';
import {
  CloseIcon,
  ArrowDownIcon,
  IndicatorsContainerWrapper,
} from '../styled-components/inputIndicatorComponents';

import ChipItem from './ChipItem';

const Input: FC<IInputProps> = ({
  size,
  disabled,
  placeholder,
  clearable,
  menuIsOpen,
  currentMultiValue,
  maxWidthChip,
  onChange,
}) => {
  const valueContainerWrapperRef = useRef();

  const Icon = menuIsOpen && !disabled ? ChevronUpOutline : ChevronDownOutline;
  const iconSize = size === 'micro' ? ICON_MICRO_SIZE : ICON_DEFAULT_SIZE;

  // Удалить чипсы
  const handleRemoveAllClick = useCallback((e) => {
    onChange([]);
    e.stopPropagation();
  }, []);

  // Вывод для подсчета счетчика
  const setCounterChip = (index: number) => ' + ' + index;

  return (
    <CurrentValue>
      <ValueContainerWrapper ref={valueContainerWrapperRef}>
        {currentMultiValue.length ? (
          currentMultiValue.map((item: any, index: number) => {
            const label = item.$$typeof ? item.props['data-label'] : item.label;
            const value = item.$$typeof ? item.props['data-value'] : item.value;

            return (
              <Fragment key={value}>
                <ChipItemChecbox>
                  {setCounterChip(currentMultiValue.length - index)}
                </ChipItemChecbox>
                <ChipItem
                  key={value}
                  value={value}
                  data-is-chip
                  disabled={disabled}
                  currentMultiValue={currentMultiValue}
                  maxWidthChip={maxWidthChip}
                  onChange={onChange}
                >
                  {label}
                </ChipItem>
              </Fragment>
            );
          })
        ) : (
          <PlaceholderWrapper menuIsOpen={menuIsOpen} disabled={disabled}>
            {placeholder}
          </PlaceholderWrapper>
        )}
      </ValueContainerWrapper>

      <IndicatorsContainerWrapper>
        {currentMultiValue.length !== 0 && clearable && !disabled && (
          <CloseIcon onClick={handleRemoveAllClick} menuIsOpen={menuIsOpen} disabled={disabled}>
            <CloseOutline width={iconSize} height={iconSize} />
          </CloseIcon>
        )}
        <ArrowDownIcon menuIsOpen={menuIsOpen} disabled={disabled}>
          <Icon width={iconSize} height={iconSize} />
        </ArrowDownIcon>
      </IndicatorsContainerWrapper>
    </CurrentValue>
  );
};

export default Input;
