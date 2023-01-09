import React, { useEffect, useRef } from 'react';

import { StyledDropdownScrollItem } from '../StyledComponents/DropdownMenu';

export const DropdownScrollItem = ({ value, onClick, scrollTop, active }) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    if (scrollTop && ref.current) {
      ref.current.parentNode.scrollTop = ref.current.offsetTop;
    }
  }, [scrollTop]);

  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    <StyledDropdownScrollItem ref={ref} onMouseDown={handleClick} active={active}>
      {value}
    </StyledDropdownScrollItem>
  );
};
