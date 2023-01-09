import React from 'react';
import type { FC, KeyboardEvent, MouseEvent } from 'react';

import { ReactComponent as ChevronDownOutline } from '../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../Icons/system/ChevronUpOutline.svg';
import { Subtitle2, Subtitle3 } from '../Typography';
import { KEY_CODES } from '../common';

import { Body } from './Body';
import { Header } from './Header';
import { ItemComponent } from './ItemComponent';

import type { IAccordionListItem } from './index';

const ICON_SIZE = 20;

interface IItemProps extends IAccordionListItem {
  small: boolean;
  onChange: (id: number | string, expanded: boolean) => void;
}

export const Item: FC<IItemProps> = ({ content, expanded = false, id, small, title, onChange }) => {
  const handleFocusPrevent = (event: MouseEvent<HTMLDivElement>) => event.preventDefault();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACEBAR) {
      event.preventDefault();
      onChange(id, !expanded);
    }
  };

  const Title = small ? Subtitle3 : Subtitle2;
  const Icon = expanded ? ChevronUpOutline : ChevronDownOutline;

  return (
    <ItemComponent>
      <Header
        small={small}
        tabIndex={1}
        onClick={() => onChange(id, !expanded)}
        onKeyDown={handleKeyDown}
        onMouseDown={handleFocusPrevent}
      >
        <Title>{title}</Title>
        <Icon height={ICON_SIZE} width={ICON_SIZE} />
      </Header>
      {expanded && <Body small={small}>{content}</Body>}
    </ItemComponent>
  );
};
