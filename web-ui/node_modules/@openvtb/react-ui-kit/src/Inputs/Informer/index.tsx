import React, { useState, ReactNode, FC } from 'react';

import { ReactComponent as HelpSolid } from '../../Icons/service/HelpSolid.svg';
import { createHintHOC } from '../../HintHOC';
import { Input } from '../BaseField';
import { getIconSize } from '../common';
import type { IInputDefaultProps } from '../common/interface';

import { StyledQuestionSolidIcon } from './StyledQuestionSolidIcon';

export interface IInputInformer extends IInputDefaultProps {
  /** Значение инпута */
  value?: string;
  /** Текст информера */
  message?: string;
  /** Дополнительная иконка */
  icon?: ReactNode;
}

export const InputInformer: FC<IInputInformer> = ({
  value = '',
  disabled,
  size = 'big',
  message = '',
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const iconSize = getIconSize(size);
  const IconWrapper = ({ onClick }: { onClick: () => void }): JSX.Element => (
    <StyledQuestionSolidIcon active={visible} disabled={disabled} onMouseDown={onClick}>
      <HelpSolid width={iconSize} height={iconSize} />
    </StyledQuestionSolidIcon>
  );

  const ButtonWithHint = createHintHOC(IconWrapper);
  const handleRequestHide = () => {
    !disabled && setVisible(false);
  };

  const handleClick = () => {
    !disabled && setVisible(true);
  };

  const iconServices = (
    <ButtonWithHint
      message={message}
      offset={16}
      size={'small'}
      visible={!disabled ? visible : false}
      onClick={handleClick}
      onRequestHide={handleRequestHide}
    />
  );

  return (
    <Input
      size={size}
      disabled={disabled}
      iconServices={iconServices}
      activeInformer={visible}
      value={value}
      {...props}
    />
  );
};
