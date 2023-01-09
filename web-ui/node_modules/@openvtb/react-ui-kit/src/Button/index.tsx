import React from 'react';
import type { FC, MouseEvent, ReactNode } from 'react';

import { Button1, Button2 } from '../Typography';

import { IconLayout } from './IconLayout';
import { ButtonComponent } from './ButtonComponent';
import type { ButtonBasicProps, Kind, Size } from './ButtonComponent';

type Type = 'button' | 'submit' | 'reset';

export interface IButtonProps extends ButtonBasicProps {
  /** Элементы содержимого */
  children?: ReactNode;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Отключение кнопки */
  disabled?: boolean;
  /** Растягивает кнопку на всю ширину контейнера */
  fullWidth?: boolean;
  /** Внешний вид кнопки */
  kind?: Kind;
  /** Размер кнопки */
  size?: Size;
  /** Тип кнопки */
  type?: Type;
  /** Коллбэк на клик */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  className,
  dataTestId,
  disabled = false,
  fullWidth = false,
  kind = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
  ...props
}) => {
  const isObject = (element: ReactNode) => typeof element === 'object';

  const onlyIcon = Boolean(children) && !Array.isArray(children) && isObject(children);
  const rightIcon = Array.isArray(children) && isObject(children[children.length - 1]);

  const Text = size === 'big' || size === 'medium' ? Button1 : Button2;

  const handleFocusPrevent = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const renderChild = (child: ReactNode, key?: number) =>
    isObject(child) ? (
      <IconLayout key={key} onlyIcon={onlyIcon} rightIcon={rightIcon}>
        {child}
      </IconLayout>
    ) : (
      <Text key={key}>{child}</Text>
    );

  const renderChildren = () =>
    Array.isArray(children) ? children.map(renderChild) : renderChild(children);

  return (
    <ButtonComponent
      {...props}
      className={className}
      data-test-id={dataTestId}
      disabled={disabled}
      fullWidth={fullWidth}
      kind={kind}
      multipleChildren={Array.isArray(children)}
      onlyIcon={onlyIcon}
      rightIcon={rightIcon}
      size={size}
      type={type}
      onClick={onClick}
      onMouseDown={handleFocusPrevent}
    >
      {children && renderChildren()}
    </ButtonComponent>
  );
};
