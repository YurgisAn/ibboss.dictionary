import { useState, useCallback, useLayoutEffect, useRef, MutableRefObject, RefObject } from 'react';

import { formatValueWithSeparator, formatValue } from '../utils';
import { FONT_SIZE_BIG, FONT_SIZE_SMALL } from '../../constants';
import type { Size } from '../types';

/**
 * Хук высчитывает длину текста инпута и расчитывает позицию суффикса
 * @param {string} value - Текст из инпута.
 * @param {string} suffix
 * @param {string} size - Размер инпута, влияет на размер текста
 * @return {[number, ref, boolean]}  - Отступ суффикса от текста, ref, overflowed опредеяет помещается текст с суфиксом в поле ввода
 */

export const useSuffixHook = (
  value: string,
  hasSuffix: boolean | undefined,
  size: Size,
  ref: MutableRefObject<HTMLInputElement> | null | RefObject<HTMLInputElement>
): [number, any, boolean] => {
  const [positionSuffix, setPositionSuffix] = useState<number>(0);
  const [overflowed, setOverflow] = useState<boolean>(false);

  const searchSeparator: number | undefined = formatValueWithSeparator(value).match(/ /g)?.length;
  const searchDots: number | undefined = value.match(/\./g)?.length;
  const refNode: MutableRefObject<HTMLInputElement> | MutableRefObject<null> = useRef(null);
  const refInput: any = ref ? ref : refNode;

  const getTextWidth = useCallback(
    (valueInput, searchSeparator, size, searchDots, refInput) => {
      const canvas = document.createElement('canvas');
      const separatorWidth = 4;
      const dotWidth = 3;
      const iconSize = 26;
      const context: any = canvas?.getContext('2d');
      context.font = size === 'micro' ? FONT_SIZE_SMALL : FONT_SIZE_BIG;
      const itemWidth: number = Math.ceil(context.measureText(formatValue(valueInput)).width);
      const paddingSuffix: number = itemWidth + separatorWidth * searchSeparator;
      const paddingSuffixWithDots: number = searchDots ? paddingSuffix + dotWidth : paddingSuffix;
      const nodeInput: number = refInput.current?.scrollWidth;
      setOverflow(
        searchDots
          ? nodeInput < paddingSuffix + dotWidth + iconSize
          : nodeInput < paddingSuffix + iconSize
      );
      return setPositionSuffix(searchSeparator ? paddingSuffixWithDots : itemWidth);
    },
    [setPositionSuffix]
  );

  useLayoutEffect(() => {
    if (hasSuffix && value?.length !== 0) {
      getTextWidth(value, searchSeparator, size, searchDots, refInput);
    }
    return;
  }, [value, hasSuffix, getTextWidth, size, searchSeparator, searchDots, refInput]);

  return [positionSuffix, refInput, overflowed];
};
