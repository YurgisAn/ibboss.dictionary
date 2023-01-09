import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
export const MenuListWrapper = styled.div<{
  load?: boolean;
  withPadding?: boolean;
  menuMaxHeight: string | number;
}>`
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: relative;
  padding-top: ${({ load, withPadding }) => (load || withPadding ? 0 : 8)}px;
  padding-bottom: ${({ load, withPadding }) => (load || withPadding ? 0 : 8)}px;
  overflow: hidden;
  overflow-y: auto;
  max-height: ${({ menuMaxHeight }) =>
    typeof menuMaxHeight === 'string' ? menuMaxHeight : `${menuMaxHeight}px`};
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color.neutral.white};
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.neutral[30]};
    border: 6px solid ${({ theme }) => theme.color.neutral.white};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    border: 5px solid ${({ theme }) => theme.color.neutral.white};
  }
`;

MenuListWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
