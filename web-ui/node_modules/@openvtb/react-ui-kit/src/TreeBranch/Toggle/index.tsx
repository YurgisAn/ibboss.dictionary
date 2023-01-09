import React from 'react';
import type { FC, KeyboardEvent, MouseEvent } from 'react';

import { KEY_CODES } from '../../common';
import { ReactComponent as ChevronDownOutline } from '../../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronRightOutline } from '../../Icons/system/ChevronRightOutline.svg';
import type { Size } from '../TreeBranchComponent';

import { ToggleComponent } from './ToggleComponent';

const ICON_SIZE = 24;
const ICON_SIZE_SMALL = 20;

interface IToggleProps {
  expanded?: boolean;
  size: Size;
  onChange: () => void;
}

export const Toggle: FC<IToggleProps> = ({ expanded, size, onChange }) => {
  const handleFocusPrevent = (event: MouseEvent<HTMLDivElement>) => event.preventDefault();
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACEBAR) {
      event.preventDefault();
      onChange();
    }
  };

  const Icon = expanded ? ChevronDownOutline : ChevronRightOutline;
  const iconSize = size === 'big' ? ICON_SIZE : ICON_SIZE_SMALL;

  return (
    <ToggleComponent
      size={size}
      tabIndex={1}
      onClick={onChange}
      onKeyDown={handleKeyDown}
      onMouseDown={handleFocusPrevent}
    >
      <Icon height={iconSize} width={iconSize} />
    </ToggleComponent>
  );
};
