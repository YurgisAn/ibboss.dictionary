import React from 'react';
import type { FC, ReactElement } from 'react';

import { Subtitle2, Subtitle3, Body1Short, Body2Short } from '../../Typography';
import type { Size } from '../TreeBranchComponent';

import { CustomLabelComponent } from './CustomLabelComponent';
import { IconLayout } from './IconLayout';

interface ICustomLabelProps {
  header?: boolean;
  icon?: ReactElement;
  size: Size;
}

export const CustomLabel: FC<ICustomLabelProps> = ({ children, header, icon, size }) => {
  const getLabel = () => {
    if (header) return size === 'big' ? Subtitle2 : Subtitle3;
    return size === 'big' ? Body1Short : Body2Short;
  };

  const Label = getLabel();

  return (
    <CustomLabelComponent>
      {icon && <IconLayout>{icon}</IconLayout>}
      <Label>{children}</Label>
    </CustomLabelComponent>
  );
};
