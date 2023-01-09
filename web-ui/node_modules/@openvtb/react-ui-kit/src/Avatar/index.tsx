import React, { FC, ReactNode } from 'react';

import { ReactComponent as PersonOutline } from '../Icons/system/PersonOutline.svg';

import type { Size, Kind } from './Wrapper';
import { Wrapper } from './Wrapper';
import { useLoaded } from './useLoaded';

export type IAvatarProps = {
  /** src атрибут для img элемента. Также в компонент можно передать icon или text элементы в качестве children,
   * children будут отрисованы, если src не установлен или загрузка img завершилась ошибкой */
  src?: string;
  /** srcSet атрибут для img элемента */
  srcSet?: string;
  /** sizes атрибут для img элемента */
  sizes?: string;
  /** alt атрибут для img элемента */
  alt?: string;
  /** Тип компонента */
  kind?: Kind;
  /** Размер компонента */
  size?: Size;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
};

export const Avatar: FC<IAvatarProps> = ({
  className,
  dataTestId,
  kind = 'white',
  size = 56,
  src,
  srcSet,
  sizes,
  alt,
  children,
}) => {
  const hasImg = src || srcSet;
  const loaded = useLoaded({ src, srcSet });
  const hasImgLoaded = hasImg && loaded === 'loaded';

  const getInitials = (alt: string) => {
    const words = alt.split(' ');
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };
  const controlStringLength = (str: string) => {
    return str.length > 2 ? str.substr(0, 2) : str;
  };

  const getContent = () => {
    let content: ReactNode = null;
    if (hasImgLoaded) {
      content = <img alt={alt} src={src} srcSet={srcSet} sizes={sizes} />;
    } else if (children) {
      content = typeof children === 'string' ? controlStringLength(children) : children;
    } else if (hasImg && alt) {
      content = getInitials(alt);
    } else {
      content = <PersonOutline />;
    }
    return content;
  };

  const AvatarWrapper = Wrapper(size);

  return (
    <>
      <AvatarWrapper className={className} data-test-id={dataTestId} size={size} kind={kind}>
        {getContent()}
      </AvatarWrapper>
    </>
  );
};
