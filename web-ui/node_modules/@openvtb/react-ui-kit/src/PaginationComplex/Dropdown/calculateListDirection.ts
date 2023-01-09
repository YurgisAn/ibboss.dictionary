import type { MutableRefObject } from 'react';

import type { Direction } from './List';

const SAFE_SPACE = 16;

export const calculateListDirection = ({
  dropdownRef,
  listRef,
}: {
  dropdownRef: MutableRefObject<HTMLButtonElement | null>;
  listRef: MutableRefObject<HTMLDivElement | null>;
}): Direction => {
  const dropdownRect = dropdownRef.current?.getBoundingClientRect();
  const listRect = listRef.current?.getBoundingClientRect();
  if (!dropdownRect || !listRect) return 'bottom';

  const { bottom: dropdownBottom } = dropdownRect;
  const { height: listHeight } = listRect;
  const viewPortHeight = window.innerHeight;

  return viewPortHeight - dropdownBottom >= listHeight + SAFE_SPACE ? 'bottom' : 'top';
};
