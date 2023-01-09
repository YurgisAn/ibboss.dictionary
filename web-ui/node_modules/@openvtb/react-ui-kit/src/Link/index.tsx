import React, { ReactNode, ElementType, FC } from 'react';

import { LinkComponent } from './LinkComponent';
import { Caption13 } from './Caption13';
import { Caption15 } from './Caption15';
import { IconContainer } from './IconContainer';
import { SIZES } from './constants';
import type { LinkKind, LinkSize, LinkIconPosition, LinkTarget } from './constants';
import type { BasicLinkProps } from './LinkComponent';

export interface ILinkProps extends BasicLinkProps {
  /** Текст ссылки */
  children: ReactNode;
  /** Гиперссылка, представляет URL или якорь (#ID элемента на текущей странице) */
  href: string;
  /** Иконка, отображаемая внутри ссылки слева или справа */
  icon?: ElementType;
  /** Вид ссылки */
  kind?: LinkKind;
  /** Размер ссылки */
  size?: LinkSize;
  /** Размещение иконки слева или справа текста ссылки */
  iconPosition?: LinkIconPosition;
  /* Где отобразить переход URL */
  target?: LinkTarget;
  /** Инвертировать цвет ссылки для отображения на тёмных фонах */
  inverse?: boolean;
  /** Отключение ссылки */
  disabled?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export const Link: FC<ILinkProps> = ({
  children,
  href,
  icon: Icon,
  kind = 'primary',
  size = 'big',
  target,
  iconPosition = Icon ? 'right' : undefined,
  inverse = false,
  disabled = false,
  className,
  dataTestId,
  ...props
}: ILinkProps) => {
  const Caption = size === 'big' ? Caption15 : Caption13;
  const iconSize = SIZES[size];
  return (
    <LinkComponent
      {...props}
      href={href}
      target={target}
      inverse={inverse}
      className={className}
      data-test-id={dataTestId}
      kind={kind}
      size={size}
      iconPosition={Icon ? iconPosition : undefined}
      disabled={disabled}
    >
      {Icon && iconPosition === 'left' && (
        <IconContainer size={size}>{<Icon width={iconSize} height={iconSize} />}</IconContainer>
      )}
      <Caption>{children}</Caption>
      {Icon && iconPosition === 'right' && (
        <IconContainer size={size}>{<Icon width={iconSize} height={iconSize} />}</IconContainer>
      )}
    </LinkComponent>
  );
};
