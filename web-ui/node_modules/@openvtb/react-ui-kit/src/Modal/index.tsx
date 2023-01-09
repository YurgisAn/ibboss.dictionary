import React, { ReactNode, FC, MouseEvent, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ReactComponent as CloseOutline } from '../Icons/service/CloseOutline.svg';
import { KEY_CODES } from '../common';
import { Button } from '../Button';
import type { IButtonProps } from '../Button';

import { ModalSize, SIZES_WIDTH, SIZES_HEIGHT } from './constants';
import { ModalComponent } from './ModalComponent';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';
import { IconClose } from './IconClose';
import { Overlay } from './Overlay';

export interface IModalProps {
  /** Содержимое модального окна */
  children: ReactNode;
  /** Контейнер, в котором происходит размещение модального окна (BODY по умолчанию) */
  container?: Element;
  /** Заголовок */
  header: string;
  /** Размер */
  size?: ModalSize;
  /** Свойство, указывающее, открывается ли модальное окно при создании */
  opened?: boolean;
  /** Свойство, указывающее, закрывается ли модальное окно при нажатии Esc */
  shouldCloseOnEsc?: boolean;
  /** Свойство, указывающее, закрывается ли модальное окно при нажатии на Overlay.
   *  Общий случай клика вне Modal реализуется вне компонента - внутри это сделать
   *  в общем случае невозможно, так как модальное окно может содержать элементы,
   *  находящиеся вне его иерархии (например, выпадающие меню, DatePicker-календарь и т.п.)
   */
  shouldCloseOnOverlayClick?: boolean;
  /** Кнопка основная */
  primaryButton?: IButtonProps;
  /** Кнопка вторичная */
  secondaryButton?: IButtonProps;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Коллбэк закрытия */
  onRequestClose?: () => void;
}

export const Modal: FC<IModalProps> = ({
  children,
  header,
  size = 'big',
  container = document.body,
  opened = false,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick = true,
  primaryButton,
  secondaryButton,
  className,
  dataTestId,
  onRequestClose,
}: IModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: any) => {
    e.stopPropagation();
    onRequestClose && onRequestClose();
  };

  const handleEscKeyDown = (e: KeyboardEvent) => {
    if (opened && shouldCloseOnEsc && e.keyCode === KEY_CODES.ESCAPE) {
      handleClose(e);
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if (opened && shouldCloseOnOverlayClick && e.target === overlayRef.current) {
      handleClose(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);
    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  });

  const buttonCount = (primaryButton ? 1 : 0) + (secondaryButton ? 1 : 0);
  return opened
    ? ReactDOM.createPortal(
        <Overlay ref={overlayRef} opened={opened} onClick={handleOverlayClick}>
          <ModalComponent
            width={SIZES_WIDTH[size]}
            height={SIZES_HEIGHT[size]}
            buttonCount={buttonCount}
            className={className}
            data-test-id={dataTestId}
          >
            <Header>{header}</Header>
            <IconClose markerOffset={6} onClick={handleClose}>
              <CloseOutline width={24} height={24} />
            </IconClose>
            <Content>{children}</Content>
            {buttonCount ? (
              <Footer>
                {secondaryButton && (
                  <Button
                    {...secondaryButton}
                    size={secondaryButton.size || 'small'}
                    kind={secondaryButton.kind || 'secondary'}
                  />
                )}
                {primaryButton && (
                  <Button {...primaryButton} size={primaryButton.size || 'small'} />
                )}
              </Footer>
            ) : (
              ''
            )}
          </ModalComponent>
        </Overlay>,
        container
      )
    : null;
};
