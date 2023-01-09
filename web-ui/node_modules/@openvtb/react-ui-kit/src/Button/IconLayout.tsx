import styled, { css } from 'styled-components';

const ICON_LAYOUT_MARGIN_HORIZONTAL = 6;

interface IIconLayoutProps {
  onlyIcon: boolean;
  rightIcon: boolean;
}

export const IconLayout = styled.div<IIconLayoutProps>`
  display: flex;
  ${({ onlyIcon, rightIcon }) =>
    !onlyIcon
      ? css`
          margin-left: ${rightIcon ? `${ICON_LAYOUT_MARGIN_HORIZONTAL}px` : 0};
          margin-right: ${!rightIcon ? `${ICON_LAYOUT_MARGIN_HORIZONTAL}px` : 0};
        `
      : ''};
`;
