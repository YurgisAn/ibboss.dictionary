import React, { useCallback } from 'react';

import {
  ChipItemWrapper,
  CloseIconContainer,
  CloseSolidIconChip,
  ChipItemLabel,
} from '../styled-components/chipComponents';
import { IChipItemProps } from '../types';

import { removeOption } from './DropdownList';

const ChipItem: React.FC<IChipItemProps> = ({
  children,
  value,
  disabled,
  currentMultiValue,
  maxWidthChip,
  onChange,
  ...restProps
}) => {
  const handleRemoveChipClick = useCallback(
    (e) => {
      const { value } = e.currentTarget.dataset;

      e.stopPropagation();
      onChange(removeOption(currentMultiValue, value));
    },
    [currentMultiValue]
  );

  return (
    <ChipItemWrapper disabled={disabled} {...restProps}>
      <ChipItemLabel maxWidthChip={maxWidthChip}>{children}</ChipItemLabel>
      <CloseIconContainer onClick={handleRemoveChipClick} data-value={value}>
        <CloseSolidIconChip />
      </CloseIconContainer>
    </ChipItemWrapper>
  );
};

export default ChipItem;
