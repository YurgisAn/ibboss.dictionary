import React, { FC } from 'react';

import { Body2Short, Body1Short, Caption1 } from '../../../Typography';
import type { IBreadcrumbsItem } from '../../index';

import { ItemComponent } from './ItemComponent';

interface IItemProps extends IBreadcrumbsItem {
  focused: boolean;
  id: number;
  last: boolean;
  mobile?: boolean;
  small?: boolean;
  onClick: (id: number) => void;
}

export const Item: FC<IItemProps> = ({ focused, id, label, last, mobile, small, onClick }) => {
  const getLabel = () => {
    if (mobile) return Caption1;
    return small ? Body2Short : Body1Short;
  };

  const Label = getLabel();

  return (
    <ItemComponent focused={focused} last={last} onClick={() => onClick(id)}>
      <Label>{label}</Label>
    </ItemComponent>
  );
};
