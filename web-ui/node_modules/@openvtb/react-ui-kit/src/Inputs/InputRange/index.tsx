import React, { FC } from 'react';

import { Range, IRangeProps } from '../../Range';
import { IInputDefaultProps } from '../common';

export interface IInputRangeprops {
  /** Добавление суффикса в поле инпута */
  suffix?: string;
  /** Дефолтное значение  */
  defaultValue?: any;
}

export const InputRange: FC<IRangeProps & IInputDefaultProps & IInputRangeprops> = ({
  ...props
}) => {
  return <Range inInput {...props} />;
};
