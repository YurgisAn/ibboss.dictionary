import React, { useEffect, useState } from 'react';

import { StyledDropdownScrollColumn } from '../StyledComponents/DropdownMenu';
import { DropdownScrollItem } from '../components/DropdownScrollItem';

const getScrollTopItem = (items, activeItem) => {
  const index = items.indexOf(activeItem);

  if (index === -1) {
    return null;
  }

  return items[Math.max(0, index - 3)];
};

export const DropdownScrollColumn = ({ items, onItemClick, activeItem }) => {
  const [scrollTopItem, setScrollTopItem] = useState(activeItem);
  useEffect(() => {
    if (!items || !activeItem) {
      return;
    }

    const scrollTopItem = getScrollTopItem(items, activeItem);
    scrollTopItem && setScrollTopItem(scrollTopItem);
  }, [activeItem, items]);

  return (
    <StyledDropdownScrollColumn>
      {items.map((item) => (
        <DropdownScrollItem
          key={item}
          value={item}
          onClick={() => onItemClick(item)}
          active={item === activeItem}
          scrollTop={item === scrollTopItem}
        />
      ))}
    </StyledDropdownScrollColumn>
  );
};
