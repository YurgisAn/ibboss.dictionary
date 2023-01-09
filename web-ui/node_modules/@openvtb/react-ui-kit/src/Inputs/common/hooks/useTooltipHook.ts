import { useCallback, useEffect, useState, useRef, MutableRefObject, RefObject } from 'react';

/**
 * Хук для тултипа. scrollWidth > offsetWidth
 * @param {MutableRefObject<HTMLInputElement> | MutableRefObject<undefined> | RefObject<HTMLInputElement>;} refInput - Внешний реф
 * @param {boolean} withTooltip - Инпут с  тултипом или без
 * @param {string}  value - Value из инпута
 * @return {boolean, MutableRefObject<HTMLInputElement> | null } - Возвращает флаг tooltip, и реф если внешнего рефа нет, то возвращает внутренний
 */

export const useTooltipHook = (
  refInput:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<null>
    | RefObject<HTMLInputElement>
    | undefined,
  withTooltip: boolean,
  value: string
): {
  tooltip: boolean;
  ref:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<null>
    | RefObject<HTMLInputElement>
    | undefined;
} => {
  const [tooltip, setTooltip] = useState<boolean>(false);

  const _ref: MutableRefObject<HTMLInputElement> | MutableRefObject<null> = useRef(null);
  const ref = refInput ? refInput : _ref;

  const limitedSizeInput = useCallback(() => {
    if (!withTooltip) return;

    if (ref.current) {
      setTooltip(ref.current.scrollWidth > ref.current.offsetWidth);
    }
  }, [ref, setTooltip, withTooltip]);

  useEffect(() => {
    if (withTooltip) limitedSizeInput();

    return () => {
      return;
    };
  }, [value, limitedSizeInput, withTooltip]);

  return { tooltip, ref };
};
